import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const workspaceRoot = path.resolve(fileURLToPath(new URL('../', import.meta.url)));
const sourceRoot = path.join(workspaceRoot, 'src');
const sourceFile = /\.(?:[cm]?[jt]sx?)$/;
const violations = [];

function visit(directory) {
  for (const entry of readdirSync(directory)) {
    const absolutePath = path.join(directory, entry);
    const relativePath = path.relative(workspaceRoot, absolutePath);
    const stats = statSync(absolutePath);

    if (stats.isDirectory()) {
      visit(absolutePath);
      continue;
    }

    if (!sourceFile.test(entry) || relativePath === 'src/components/ui/close-button.tsx') continue;

    const source = readFileSync(absolutePath, 'utf8');
    const directCloseControl = /<(?:IconButton|button)\b[^>]*\baria-label\s*=\s*(?:["'`][^"'`]*\b(?:close|dismiss)\b[^"'`]*["'`]|\{[^}]*\b(?:close|dismiss)\b[^}]*\})[^>]*>/gi;

    for (const match of source.matchAll(directCloseControl)) {
      violations.push(`${relativePath}: ${match[0].replace(/\s+/g, ' ').trim()}`);
    }

    const vendorCloseButton = /\bcloseButton\s*(?:=|:)\s*\{?\s*true\b/g;
    for (const match of source.matchAll(vendorCloseButton)) {
      violations.push(`${relativePath}: ${match[0]}`);
    }
  }
}

if (existsSync(sourceRoot)) visit(sourceRoot);

if (violations.length > 0) {
  console.error('Close and dismiss controls must use CloseButton.');
  for (const violation of violations) console.error(`- ${violation}`);
  process.exit(1);
}

console.log('CloseButton usage check passed.');
