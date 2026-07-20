import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';

import { describe, expect, it } from 'vitest';

import { READINESS, READINESS_LEVELS } from './readiness-data';

/**
 * Governance with teeth: the Release Readiness board is enforceable, not
 * aspirational. This spec fails the build when a feature story ships without
 * a readiness declaration, or when readiness-data.ts drifts from the repo.
 */

const REPO_ROOT = resolve(__dirname, '../../..');
const FEATURES_ROOT = resolve(REPO_ROOT, 'src/features');

function featureFiles(suffix: string): string[] {
  return (readdirSync(FEATURES_ROOT, { recursive: true }) as string[])
    .filter((path) => path.endsWith(suffix))
    .map((path) => resolve(FEATURES_ROOT, path));
}

const STORY_FILES = featureFiles('.stories.tsx');

const entries = Object.values(READINESS);

describe('readiness data integrity', () => {
  it('has at least the core clinic domains on the board', () => {
    expect(entries.length).toBeGreaterThanOrEqual(9);
  });

  it('uses only defined levels', () => {
    const levels = Object.keys(READINESS_LEVELS);
    for (const entry of entries) {
      expect(levels).toContain(entry.level);
    }
  });

  it('gives every domain a unique area and a substantive note', () => {
    const areas = entries.map((entry) => entry.area);
    expect(new Set(areas).size).toBe(areas.length);
    for (const entry of entries) {
      // A note must name what is real vs scaffolded — one word cannot.
      expect(entry.note.length).toBeGreaterThan(40);
    }
  });

  it('points every owner at a real feature folder', () => {
    for (const entry of entries) {
      if (entry.owner.includes('*')) continue;
      expect(existsSync(resolve(REPO_ROOT, entry.owner)), entry.owner).toBe(true);
    }
  });

  it('matches every area to at least one story title', () => {
    const titles = STORY_FILES.flatMap((file) => {
      const match = readFileSync(file, 'utf8').match(/title:\s*'([^']+)'/);
      return match ? [match[1]] : [];
    });
    for (const entry of entries) {
      const hit = titles.some((title) => title === entry.area || title.startsWith(`${entry.area}/`));
      expect(hit, `no story title under "${entry.area}"`).toBe(true);
    }
  });
});

describe('readiness declarations in feature stories', () => {
  it('finds feature story files to govern', () => {
    expect(STORY_FILES.length).toBeGreaterThan(10);
  });

  it.each(STORY_FILES.map((file) => file.slice(REPO_ROOT.length + 1)))(
    '%s declares readiness',
    (relative: string) => {
      const src = readFileSync(resolve(REPO_ROOT, relative), 'utf8');
      const declaresDirectly = /readiness:\s*READINESS\./.test(src);
      // Shared kura metadata constants carry the declaration for their domain.
      const usesSharedConstant = /_STORYBOOK_KURA\b/.test(src);
      expect(
        declaresDirectly || usesSharedConstant,
        `${relative} has no kura.readiness declaration (direct or via *_STORYBOOK_KURA)`,
      ).toBe(true);
    },
  );

  it('keeps every shared kura constant on the board', () => {
    const metadataFiles = featureFiles('storybook-metadata.ts');
    for (const file of metadataFiles) {
      const src = readFileSync(file, 'utf8');
      expect(
        /readiness:\s*READINESS\./.test(src),
        `${file.slice(REPO_ROOT.length + 1)} lacks a readiness entry`,
      ).toBe(true);
    }
  });
});
