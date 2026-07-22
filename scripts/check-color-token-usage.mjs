import { readFileSync, readdirSync } from 'node:fs';
import { extname, join, relative } from 'node:path';
import process from 'node:process';

const projectRoot = process.cwd();
const sourceRoot = join(projectRoot, 'src');
const sourceExtensions = new Set(['.css', '.js', '.jsx', '.ts', '.tsx']);
const tokenOwner = 'src/styles/tokens.css';
const inventoryOwner = 'src/components/foundations/color-tokens.ts';
const allowedPrimitiveConsumers = new Set([
  tokenOwner,
  inventoryOwner,
  'src/app/globals.css',
  'src/components/foundations/colors-reference.tsx',
]);

const primitiveVariablePattern = /var\((--(?:(?:color-(?:blue|red|green|yellow|orange|amber|cyan|teal|lime|pink|rose|sky|purple|emerald|neutral|slate|gray|zinc|stone|white|black|brand|secondary-deep|secondary-light|ink|success|warn|danger|info))|brand|secondary-deep|secondary-light|ink|success|warn|danger|info|purple)-\d+)/g;
const rawPaletteUtilityPattern = /(?:^|[\s'"`])((?:bg|text|border|ring|fill|stroke|from|via|to)-(?:(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-\d+|white|black)(?:\/\d+)?)(?=$|[\s'"`])/g;
const cssHexPattern = /#[\da-fA-F]{3,8}\b/g;
const cssFunctionalColorPattern = /\b(?:rgb|rgba|hsl|hsla)\(/g;
const colorVariableUsePattern = /var\((--color-[a-zA-Z0-9_-]+)/g;
const tailwindPrimitivePattern = /^--color-(?:blue|red|green|yellow|orange|amber|cyan|teal|lime|pink|rose|sky|purple|emerald|neutral|slate|gray|zinc|stone|white|black)(?:-\d+)?$/;

function walk(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? walk(path) : sourceExtensions.has(extname(entry.name)) ? [path] : [];
  });
}

function matchesWithLines(content, pattern) {
  const matches = [];
  for (const match of content.matchAll(pattern)) {
    matches.push({
      value: match[1] ?? match[0],
      line: content.slice(0, match.index).split('\n').length,
      sourceLine: content.split('\n')[content.slice(0, match.index).split('\n').length - 1]?.trim() ?? '',
    });
  }
  return matches;
}

const files = walk(sourceRoot);
const tokenCss = readFileSync(join(projectRoot, tokenOwner), 'utf8');
const inventorySource = readFileSync(join(projectRoot, inventoryOwner), 'utf8');
const definedColorVariables = new Set(
  [...tokenCss.matchAll(/^\s*(--color-[a-zA-Z0-9_-]+)\s*:/gm)].map((match) => match[1]),
);
const definedVariables = new Set(
  [...tokenCss.matchAll(/^\s*(--[a-zA-Z0-9_-]+)\s*:/gm)].map((match) => match[1]),
);
const inventoryVariables = new Set(
  [...inventorySource.matchAll(/semantic\('(\-\-color-[a-zA-Z0-9_-]+)'/g)].map((match) => match[1]),
);
const primitiveVariables = new Set(
  [...inventorySource.matchAll(/primitive\('(\-\-color-[a-zA-Z0-9_-]+)'/g)].map((match) => match[1]),
);
const extensionSource = inventorySource
  .split('export const KURA_COLOR_EXTENSIONS = [')[1]
  ?.split('export const DCM_SEMANTIC_TONE_RULES = [')[0] ?? '';
const extensionVariables = new Set(
  [...extensionSource.matchAll(/name:\s*'(\-\-[a-zA-Z0-9_-]+)'/g)].map((match) => match[1]),
);
const aliasSource = inventorySource
  .split('export const DCM_COLOR_MIGRATION_ALIASES = [')[1]
  ?.split('export const KURA_COLOR_EXTENSIONS = [')[0] ?? '';
const aliasMappings = [...aliasSource.matchAll(/name:\s*'(\-\-[a-zA-Z0-9_-]+)',\s*target:\s*'(\-\-[a-zA-Z0-9_-]+)'/g)]
  .map((match) => ({ name: match[1], target: match[2] }));
const violations = [];
let semanticReferenceCount = 0;

for (const absolutePath of files) {
  const path = relative(projectRoot, absolutePath);
  const content = readFileSync(absolutePath, 'utf8');

  if (!allowedPrimitiveConsumers.has(path)) {
    for (const match of matchesWithLines(content, primitiveVariablePattern)) {
      violations.push({ path, ...match, rule: 'primitive-variable' });
    }
  }

  for (const match of matchesWithLines(content, rawPaletteUtilityPattern)) {
    violations.push({ path, ...match, rule: 'raw-palette-utility' });
  }

  if (extname(path) === '.css' && path !== tokenOwner) {
    for (const match of matchesWithLines(content, cssHexPattern)) {
      violations.push({ path, ...match, rule: 'raw-css-color' });
    }
    for (const match of matchesWithLines(content, cssFunctionalColorPattern)) {
      const usesSemanticChannel = /(?:rgb|rgba)\(var\(--color-[a-zA-Z0-9_-]+-rgb\)/.test(match.sourceLine);
      if (!usesSemanticChannel) violations.push({ path, ...match, rule: 'raw-css-color' });
    }
  }

  if (extname(path) !== '.css' && path !== inventoryOwner) {
    for (const match of matchesWithLines(content, cssHexPattern)) {
      const nonUiFixture =
        match.sourceLine.includes('orderId:') ||
        match.sourceLine.includes('e-Prescription #') ||
        (path === 'src/features/settings/demo-data.ts' && match.sourceLine.includes('DOCTOR_QR_SVG'));
      if (!nonUiFixture) violations.push({ path, ...match, rule: 'raw-script-color' });
    }
    for (const match of matchesWithLines(content, cssFunctionalColorPattern)) {
      const assertionOnly = match.sourceLine.includes('getComputedStyle') && match.sourceLine.includes('toBe(');
      const usesSemanticChannel = /(?:rgb|rgba)\(var\(--color-[a-zA-Z0-9_-]+-rgb\)/.test(match.sourceLine);
      if (!assertionOnly && !usesSemanticChannel) violations.push({ path, ...match, rule: 'raw-script-color' });
    }
  }

  if (path !== tokenOwner && path !== inventoryOwner && /board[ -]?ui/i.test(content)) {
    for (const match of matchesWithLines(content, /board[ -]?ui/gi)) {
      violations.push({ path, ...match, rule: 'external-system-language' });
    }
  }

  for (const match of matchesWithLines(content, colorVariableUsePattern)) {
    semanticReferenceCount += 1;
    if (!definedColorVariables.has(match.value) && !tailwindPrimitivePattern.test(match.value)) {
      violations.push({ path, ...match, rule: 'undefined-color-variable' });
    }
  }
}

for (const variable of inventoryVariables) {
  if (!definedColorVariables.has(variable)) {
    violations.push({
      path: inventoryOwner,
      line: 1,
      value: variable,
      sourceLine: 'Canonical semantic inventory',
      rule: 'inventory-token-not-defined',
    });
  }
}

for (const variable of definedColorVariables) {
  const isRegistered =
    inventoryVariables.has(variable) ||
    primitiveVariables.has(variable) ||
    extensionVariables.has(variable) ||
    tailwindPrimitivePattern.test(variable);
  if (!isRegistered) {
    violations.push({
      path: tokenOwner,
      line: 1,
      value: variable,
      sourceLine: 'Runtime color definition',
      rule: 'color-token-not-in-inventory',
    });
  }
}

for (const { name, target } of aliasMappings) {
  if (!definedVariables.has(name)) {
    violations.push({ path: inventoryOwner, line: 1, value: name, sourceLine: 'Compatibility inventory', rule: 'alias-not-defined' });
  }
  if (!definedVariables.has(target) && !tailwindPrimitivePattern.test(target)) {
    violations.push({ path: inventoryOwner, line: 1, value: target, sourceLine: `Target of ${name}`, rule: 'alias-target-not-defined' });
  }
}

for (const variable of extensionVariables) {
  if (!definedVariables.has(variable)) {
    violations.push({ path: inventoryOwner, line: 1, value: variable, sourceLine: 'Component role inventory', rule: 'component-role-not-defined' });
  }
}

if (violations.length > 0) {
  console.error(`Color token audit failed with ${violations.length} violation(s):`);
  for (const violation of violations) {
    console.error(
      `${violation.path}:${violation.line} [${violation.rule}] ${violation.value}\n  ${violation.sourceLine}`,
    );
  }
  process.exit(1);
}

console.log(
  `Color token audit passed: ${files.length} source files, ${inventoryVariables.size} canonical semantic tokens, ${semanticReferenceCount} semantic references, 0 primitive or raw-color consumer violations.`,
);
