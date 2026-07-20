import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const workspaceRoot = path.resolve(
  fileURLToPath(new URL('../', import.meta.url)),
);
const roots = ['src', '.storybook']
  .map((relativePath) => path.join(workspaceRoot, relativePath))
  .filter(existsSync);
const violations = [];
const sourceFile = /\.(?:[cm]?[jt]sx?|mdx|css)$/;

function visit(directory) {
  for (const entry of readdirSync(directory)) {
    const absolutePath = path.join(directory, entry);
    const relativePath = path.relative(workspaceRoot, absolutePath);
    const stats = statSync(absolutePath);

    if (stats.isDirectory()) {
      if (entry.toLowerCase() === 'reui') {
        violations.push(
          `${relativePath}: permanent ReUI directories are not allowed`,
        );
        continue;
      }

      visit(absolutePath);
      continue;
    }

    if (!sourceFile.test(entry)) continue;

    const content = readFileSync(absolutePath, 'utf8');
    if (/\btitle\s*:\s*['"`]ReUI\//.test(content)) {
      violations.push(
        `${relativePath}: Storybook titles must not begin with ReUI/`,
      );
    }

    const exportMatches = content.matchAll(
      /\bexport\s+(?:const|function|class|type|interface)\s+(ReUI[A-Z]\w*)/g,
    );
    for (const match of exportMatches) {
      violations.push(
        `${relativePath}: public export ${match[1]} retains a ReUI namespace`,
      );
    }
  }
}

for (const root of roots) visit(root);

if (violations.length > 0) {
  console.error('Permanent ReUI namespaces are not allowed.');
  for (const violation of violations) console.error(`- ${violation}`);
  process.exit(1);
}

console.log('ReUI ownership check passed.');
