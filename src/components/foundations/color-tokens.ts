export type CssColorVariableName = `--${string}`;

export type DcmPrimitiveGroup =
  | 'Primary blue'
  | 'Secondary deep'
  | 'Secondary light';

export type DcmSemanticGroup =
  | 'Foreground'
  | 'Text'
  | 'Background'
  | 'Border'
  | 'Brand and action'
  | 'Status and presence'
  | 'Data visualization'
  | 'Clinical and domain';

export type DcmThemeAdaptation = 'Kura light theme; dark semantics pending validation';

export type DcmPrimitiveToken = Readonly<{
  name: CssColorVariableName;
  kind: 'primitive';
  group: DcmPrimitiveGroup;
  sourceValue: string;
  lightResolvedValue: string;
  description: string;
  aliases: readonly CssColorVariableName[];
}>;

export type DcmSemanticToken = Readonly<{
  name: CssColorVariableName;
  kind: 'semantic';
  group: DcmSemanticGroup;
  sourceValue: string;
  lightResolvedValue: string;
  description: string;
  aliases: readonly CssColorVariableName[];
  tailwindClass: string;
  themeAdaptation: DcmThemeAdaptation;
  sourceAnnotation?: string;
}>;

export type DcmColorToken = DcmPrimitiveToken | DcmSemanticToken;

export type ColorAlias = Readonly<{
  name: CssColorVariableName;
  target: CssColorVariableName;
  description: string;
  via?: readonly CssColorVariableName[];
}>;

export type KuraColorExtension = Readonly<{
  name: CssColorVariableName;
  group: string;
  value: string;
  description: string;
  swatch: boolean;
}>;

export type DcmSemanticTone =
  | 'neutral'
  | 'info'
  | 'success'
  | 'warning'
  | 'danger'
  | 'ai'
  | 'brand';

export type DcmSemanticToneRule = Readonly<{
  tone: DcmSemanticTone;
  meanings: readonly string[];
  foreground: CssColorVariableName;
  background?: CssColorVariableName;
  requirement: 'Text or icon cue required; never color-only';
  description: string;
}>;

function primitive(
  name: CssColorVariableName,
  group: DcmPrimitiveGroup,
  sourceValue: string,
  description: string,
  aliases: readonly CssColorVariableName[] = [],
): DcmPrimitiveToken {
  return {
    name,
    kind: 'primitive',
    group,
    sourceValue,
    lightResolvedValue: sourceValue,
    description,
    aliases,
  };
}

const resolve = (name: CssColorVariableName) => `var(${name})`;

export const DCM_PRIMITIVE_TOKENS = [
  primitive('--color-brand-25', 'Primary blue', '#eef7ff', 'Lightest Kura primary tint.'),
  primitive('--color-brand-50', 'Primary blue', '#e9f3ff', 'Light Kura primary tint.'),
  primitive('--color-brand-100', 'Primary blue', '#d4e8ff', 'Subtle Kura primary emphasis.'),
  primitive('--color-brand-200', 'Primary blue', '#a3d0ff', 'Kura primary support step.'),
  primitive('--color-brand-300', 'Primary blue', '#7dbaff', 'Kura primary support step.'),
  primitive('--color-brand-400', 'Primary blue', '#52a2ff', 'Kura primary accent step.'),
  primitive('--color-brand-500', 'Primary blue', '#268cff', 'Core Kura primary blue.'),
  primitive('--color-brand-600', 'Primary blue', '#1e70cc', 'Accessible primary action blue.'),
  primitive('--color-brand-700', 'Primary blue', '#175499', 'Accessible primary link blue.'),
  primitive('--color-brand-800', 'Primary blue', '#0f3866', 'Deep Kura primary blue.'),
  primitive('--color-brand-900', 'Primary blue', '#04234d', 'Darkest Kura primary blue.'),

  primitive('--color-secondary-deep-500', 'Secondary deep', '#10069f', 'Core Kura deep secondary blue.'),
  primitive('--color-secondary-deep-600', 'Secondary deep', '#0c0483', 'Strong Kura deep secondary blue.'),
  primitive('--color-secondary-deep-700', 'Secondary deep', '#090364', 'Dark Kura deep secondary blue.'),

  primitive('--color-secondary-light-300', 'Secondary light', '#60cdff', 'Light Kura secondary blue.'),
  primitive('--color-secondary-light-500', 'Secondary light', '#0ab0e5', 'Core Kura light secondary blue.'),
  primitive('--color-secondary-light-700', 'Secondary light', '#0787af', 'Strong Kura light secondary blue.'),
] as const satisfies readonly DcmPrimitiveToken[];

const kuraLight: DcmThemeAdaptation = 'Kura light theme; dark semantics pending validation';

function semantic(
  name: CssColorVariableName,
  group: DcmSemanticGroup,
  sourceValue: string,
  _suggestedTailwindClass: string,
  description: string,
  aliases: readonly CssColorVariableName[] = [],
  sourceAnnotation?: string,
): DcmSemanticToken {
  const textRole =
    group === 'Foreground' ||
    group === 'Text' ||
    (group === 'Brand and action' && (name.endsWith('-fg') || name.endsWith('-strong'))) ||
    (group === 'Status and presence' && (name.endsWith('-fg') || name.endsWith('-on-solid')));
  const utilityPrefix = group === 'Border' ? 'border' : textRole ? 'text' : 'bg';

  return {
    name,
    kind: 'semantic',
    group,
    sourceValue,
    lightResolvedValue: sourceValue,
    description,
    aliases,
    tailwindClass: `${utilityPrefix}-[var(${name})]`,
    themeAdaptation: kuraLight,
    ...(sourceAnnotation ? { sourceAnnotation } : {}),
  };
}

export const DCM_SEMANTIC_TOKENS = [
  semantic('--color-foreground-full', 'Foreground', resolve('--color-white'), 'text-foreground-full', 'Inverse and on-color foreground.', [], 'white'),
  semantic('--color-foreground-icon-primary', 'Foreground', resolve('--color-neutral-950'), 'text-foreground-icon-primary', 'Primary icon foreground.', [], 'neutral-950'),
  semantic('--color-foreground-icon-secondary', 'Foreground', resolve('--color-neutral-500'), 'text-foreground-icon-secondary', 'Secondary icon foreground.', [], 'neutral-500'),
  semantic('--color-foreground-icon-tertiary', 'Foreground', resolve('--color-neutral-400'), 'text-foreground-icon-tertiary', 'Tertiary icon foreground.', [], 'neutral-400'),
  semantic('--color-foreground-icon-quaternary', 'Foreground', resolve('--color-neutral-300'), 'text-foreground-icon-quaternary', 'Quaternary icon foreground.', [], 'neutral-300'),
  semantic('--color-foreground-icon-error', 'Foreground', resolve('--color-red-600'), 'text-foreground-icon-error', 'Error icon foreground.', [], 'red-600'),
  semantic('--color-foreground-icon-disabled', 'Foreground', resolve('--color-neutral-300'), 'text-foreground-icon-disabled', 'Disabled icon foreground.', [], 'neutral-300'),
  semantic('--color-foreground-disabled', 'Foreground', resolve('--color-neutral-400'), 'text-foreground-disabled', 'Disabled foreground.', [], 'neutral-400'),
  semantic('--color-foreground-disabled-danger', 'Foreground', resolve('--color-red-300'), 'text-foreground-disabled-danger', 'Disabled danger foreground.', [], 'red-300'),

  semantic('--color-text-primary', 'Text', resolve('--color-neutral-950'), 'text-text-primary', 'Headings and key values.', ['--text-primary'], 'neutral-950'),
  semantic('--color-text-secondary', 'Text', resolve('--color-neutral-500'), 'text-text-secondary', 'Supporting copy.', ['--text-secondary'], 'neutral-500'),
  semantic('--color-text-tertiary', 'Text', resolve('--color-neutral-400'), 'text-text-tertiary', 'Hints and tertiary text.', ['--text-tertiary', '--color-text-muted'], 'neutral-400'),
  semantic('--color-text-disabled', 'Text', resolve('--color-neutral-300'), 'text-text-disabled', 'Disabled text.', ['--text-disabled'], 'neutral-300'),
  semantic('--color-text-disabled-danger', 'Text', resolve('--color-red-300'), 'text-text-disabled-danger', 'Disabled danger text.', [], 'red-300'),
  semantic('--color-text-error-primary', 'Text', resolve('--color-red-500'), 'text-text-error-primary', 'Primary error text.', [], 'red-500'),
  semantic('--color-text-error-placeholder', 'Text', resolve('--color-red-400'), 'text-text-error-placeholder', 'Error placeholder text.', [], 'red-400'),
  semantic('--color-text-inverse', 'Text', resolve('--color-foreground-full'), 'text-text-inverse', 'Text on dark neutral surfaces.', [], 'foreground-full'),
  semantic('--color-text-on-brand', 'Text', resolve('--color-foreground-full'), 'text-text-on-brand', 'Text on brand and action fills.', ['--primary-foreground'], 'foreground-full'),
  semantic('--color-text-brand', 'Text', resolve('--color-brand-700'), 'text-text-brand', 'Brand-emphasis text.', [], 'brand-700'),
  semantic('--color-text-link', 'Text', resolve('--color-brand-700'), 'text-text-link', 'Default actionable link text.', ['--text-link'], 'brand-700'),
  semantic('--color-text-link-hover', 'Text', resolve('--color-brand-800'), 'text-text-link-hover', 'Hovered actionable link text.', [], 'brand-800'),
  semantic('--color-text-placeholder', 'Text', resolve('--color-text-tertiary'), 'text-text-placeholder', 'Input placeholder text.', [], 'text-tertiary'),

  semantic('--color-background-primary-default', 'Background', resolve('--color-white'), 'bg-background-primary-default', 'Primary surface.', [], 'white'),
  semantic('--color-background-primary-hover', 'Background', resolve('--color-neutral-100'), 'bg-background-primary-hover', 'Primary surface hover.', [], 'neutral-100'),
  semantic('--color-background-primary-active', 'Background', resolve('--color-neutral-200'), 'bg-background-primary-active', 'Primary surface active.', [], 'neutral-200'),
  semantic('--color-background-primary-disabled', 'Background', resolve('--color-neutral-100'), 'bg-background-primary-disabled', 'Primary surface disabled.', [], 'neutral-100'),
  semantic('--color-background-secondary-default', 'Background', resolve('--color-neutral-100'), 'bg-background-secondary-default', 'Secondary recessed surface.', [], 'neutral-100'),
  semantic('--color-background-secondary-hover', 'Background', resolve('--color-neutral-200'), 'bg-background-secondary-hover', 'Secondary surface hover.', [], 'neutral-200'),
  semantic('--color-background-secondary-active', 'Background', resolve('--color-neutral-300'), 'bg-background-secondary-active', 'Secondary surface active.', [], 'neutral-300'),
  semantic('--color-background-tertiary-default', 'Background', resolve('--color-neutral-200'), 'bg-background-tertiary-default', 'Strongest neutral surface.', [], 'neutral-200'),
  semantic('--color-background-tertiary-hover', 'Background', resolve('--color-neutral-300'), 'bg-background-tertiary-hover', 'Tertiary surface hover.', [], 'neutral-300'),
  semantic('--color-background-tertiary-error', 'Background', resolve('--color-red-100'), 'bg-background-tertiary-error', 'Error surface.', [], 'red-100'),
  semantic('--color-background-quaternary-default', 'Background', resolve('--color-neutral-300'), 'bg-background-quaternary-default', 'Quaternary neutral surface.', [], 'neutral-300'),
  semantic('--color-tab-count-bg', 'Background', 'color-mix(in srgb, var(--color-text-primary) 10%, transparent)', 'bg-tab-count', 'Quiet count background inside tabs.', [], 'text-primary / 10%'),
  semantic('--color-surface-bg', 'Background', resolve('--color-background-primary-default'), 'bg-surface-bg', 'Application canvas (white page).', ['--background', '--bg'], 'background-primary-default'),
  semantic('--color-surface', 'Background', resolve('--color-background-primary-default'), 'bg-surface', 'White content surface: overlays, tiles, controls.', ['--surface'], 'background-primary-default'),
  semantic('--color-surface-2', 'Background', resolve('--color-background-secondary-default'), 'bg-surface-2', 'Gray tray surface: cards on the white page.', ['--card', '--muted', '--surface-2'], 'background-secondary-default'),
  semantic('--color-surface-sunken', 'Background', resolve('--color-background-tertiary-default'), 'bg-surface-sunken', 'Sunken or inset surface.', ['--surface-sunken'], 'background-tertiary-default'),
  semantic('--color-field-bg', 'Background', '#f7f7f7', 'bg-[var(--color-field-bg)]', 'Filled field rest state — neutral surface-2 for clear separation on white.', [], 'surface-2'),
  semantic('--color-background-canvas-subtle', 'Background', resolve('--color-neutral-50'), 'bg-[var(--color-background-canvas-subtle)]', 'Subtle canvas used by floating navigation.', [], 'neutral-50'),
  semantic('--color-overlay-scrim', 'Background', 'color-mix(in srgb, var(--color-text-primary) 48%, transparent)', 'bg-overlay-scrim', 'Modal and sheet scrim.', [], 'text-primary / 48%'),

  semantic('--color-border-button-default', 'Border', resolve('--color-neutral-200'), 'border-border-button-default', 'Default button border.', [], 'neutral-200'),
  semantic('--color-border-button-hover', 'Border', resolve('--color-neutral-300'), 'border-border-button-hover', 'Button border hover.', [], 'neutral-300'),
  semantic('--color-border-button-active', 'Border', resolve('--color-neutral-400'), 'border-border-button-active', 'Button border active.', [], 'neutral-400'),
  semantic('--color-border-button-white', 'Border', resolve('--color-white'), 'border-border-button-white', 'White button border.', [], 'white'),
  semantic('--color-border-checkbox-default', 'Border', resolve('--color-neutral-300'), 'border-border-checkbox-default', 'Default checkbox border.', [], 'neutral-300'),
  semantic('--color-border-focus-ring', 'Border', resolve('--color-brand-500'), 'ring-border-focus-ring', 'Focus ring for keyboard and selected controls.', ['--ring'], 'brand-500'),
  semantic('--color-border', 'Border', resolve('--color-border-button-default'), 'border-border', 'Default structural border.', ['--border', '--border-color'], 'border-button-default'),
  semantic('--color-border-strong', 'Border', resolve('--color-border-button-hover'), 'border-border-strong', 'Stronger structural border.', ['--border-strong'], 'border-button-hover'),
  semantic('--color-border-emphasis', 'Border', resolve('--color-border-button-active'), 'border-border-emphasis', 'High-emphasis structural border.', ['--border-emphasis'], 'border-button-active'),
  semantic('--color-border-focus', 'Border', resolve('--color-border-focus-ring'), 'border-border-focus', 'Focused field border.', ['--border-focus'], 'border-focus-ring'),
  semantic('--color-focus-ring', 'Border', 'color-mix(in srgb, var(--color-brand-primary) 32%, transparent)', 'ring-[var(--color-focus-ring)]', 'Translucent focus halo.', [], 'brand-primary / 32%'),

  semantic('--color-brand-primary', 'Brand and action', resolve('--color-brand-500'), 'bg-brand-primary', 'Core Kura brand identity.', [], 'brand-500'),
  semantic('--color-brand-primary-strong', 'Brand and action', resolve('--color-brand-700'), 'text-brand-primary-strong', 'Accessible strong brand emphasis.', [], 'brand-700'),
  semantic('--color-brand-secondary-deep', 'Brand and action', resolve('--color-secondary-deep-500'), 'bg-brand-secondary-deep', 'Deep secondary brand identity.', [], 'secondary-deep-500'),
  semantic('--color-brand-secondary-light', 'Brand and action', resolve('--color-secondary-light-500'), 'bg-brand-secondary-light', 'Light secondary brand identity.', [], 'secondary-light-500'),
  semantic('--color-action-primary-bg', 'Brand and action', resolve('--color-brand-600'), 'bg-action-primary', 'Primary action background.', ['--primary'], 'brand-600'),
  semantic('--color-action-primary-bg-hover', 'Brand and action', resolve('--color-brand-700'), 'bg-action-primary-hover', 'Primary action hover background.', ['--primary-hover'], 'brand-700'),
  semantic('--color-action-primary-bg-active', 'Brand and action', resolve('--color-brand-800'), 'bg-action-primary-active', 'Primary action active background.', [], 'brand-800'),
  semantic('--color-action-primary-bg-disabled', 'Brand and action', resolve('--color-neutral-300'), 'bg-action-primary-disabled', 'Primary action disabled background.', [], 'neutral-300'),
  semantic('--color-action-primary-fg', 'Brand and action', resolve('--color-text-on-brand'), 'text-action-primary', 'Primary action label and icon.', ['--primary-foreground'], 'text-on-brand'),
  semantic('--color-action-primary-accent', 'Brand and action', resolve('--color-brand-500'), 'bg-action-primary-accent', 'Non-text action accents and progress.', ['--primary-accent'], 'brand-500'),
  semantic('--color-action-primary-subtle', 'Brand and action', resolve('--color-brand-50'), 'bg-action-primary-subtle', 'Quiet brand selection surface.', [], 'brand-50'),
  semantic('--color-action-primary-subtle-hover', 'Brand and action', resolve('--color-brand-100'), 'bg-action-primary-subtle-hover', 'Quiet brand selection hover.', [], 'brand-100'),
  semantic('--color-button-primary-bg', 'Brand and action', resolve('--color-brand-500'), 'bg-button-primary', 'Canonical Button primary solid fill.', [], 'brand-500'),
  semantic('--color-button-primary-fg', 'Brand and action', resolve('--color-text-on-brand'), 'text-button-primary', 'White label and icon on the Brand 500 primary Button.', [], 'text-on-brand'),
  semantic('--color-button-primary-border-hover', 'Brand and action', resolve('--color-brand-600'), 'border-button-primary-hover', 'Primary Button hover border while the fill remains Brand 500.', [], 'brand-600'),
  semantic('--color-button-primary-border-active', 'Brand and action', resolve('--color-brand-700'), 'border-button-primary-active', 'Primary Button active border while the fill remains Brand 500.', [], 'brand-700'),
  semantic('--color-button-primary-bg-disabled', 'Brand and action', resolve('--color-neutral-300'), 'bg-button-primary-disabled', 'Primary Button disabled fill.', [], 'neutral-300'),
  semantic('--color-button-primary-fg-disabled', 'Brand and action', resolve('--color-neutral-600'), 'text-button-primary-disabled', 'Primary Button disabled label and icon remains readable against the disabled fill.', [], 'neutral-600'),
  semantic('--color-action-secondary-bg', 'Brand and action', resolve('--color-neutral-200'), 'bg-[var(--color-action-secondary-bg)]', 'Secondary action background.', ['--secondary'], 'neutral-200'),
  semantic('--color-action-secondary-bg-hover', 'Brand and action', resolve('--color-neutral-300'), 'bg-[var(--color-action-secondary-bg-hover)]', 'Secondary action hover background.', [], 'neutral-300'),
  semantic('--color-action-secondary-fg', 'Brand and action', resolve('--color-neutral-700'), 'text-[var(--color-action-secondary-fg)]', 'Secondary action foreground.', ['--secondary-foreground'], 'neutral-700'),
  semantic('--color-selection-bg', 'Brand and action', resolve('--color-action-primary-subtle'), 'bg-selection', 'Selected row and control background.', ['--accent'], 'action-primary-subtle'),
  semantic('--color-selection-bg-strong', 'Brand and action', resolve('--color-action-primary-subtle-hover'), 'bg-selection-strong', 'Stronger selected-state background.', [], 'action-primary-subtle-hover'),
  semantic('--color-selection-fg', 'Brand and action', resolve('--color-brand-primary-strong'), 'text-selection', 'Selected-state text and icon.', [], 'brand-primary-strong'),

  semantic('--color-status-neutral-fg', 'Status and presence', resolve('--color-neutral-600'), 'text-status-neutral', 'Neutral status foreground.', [], 'neutral-600'),
  semantic('--color-status-neutral-bg', 'Status and presence', resolve('--color-neutral-200'), 'bg-status-neutral', 'Neutral status background.', [], 'neutral-200'),
  semantic('--color-status-neutral-solid', 'Status and presence', resolve('--color-neutral-600'), 'bg-status-neutral-solid', 'Solid neutral status.', [], 'neutral-600'),
  semantic('--color-status-success-fg', 'Status and presence', resolve('--color-green-800'), 'text-status-success', 'Success status foreground.', [], 'green-800'),
  semantic('--color-status-success-bg', 'Status and presence', resolve('--color-green-100'), 'bg-status-success', 'Success status background.', [], 'green-100'),
  semantic('--color-status-success-solid', 'Status and presence', resolve('--color-green-600'), 'bg-status-success-solid', 'Solid success status.', [], 'green-600'),
  semantic('--color-status-warning-fg', 'Status and presence', resolve('--color-yellow-800'), 'text-status-warning', 'Warning status foreground.', [], 'yellow-800'),
  semantic('--color-status-warning-bg', 'Status and presence', resolve('--color-yellow-200'), 'bg-status-warning', 'Warning status background.', [], 'yellow-200'),
  semantic('--color-status-warning-solid', 'Status and presence', resolve('--color-yellow-500'), 'bg-status-warning-solid', 'Solid warning status.', [], 'yellow-500'),
  semantic('--color-status-low-fg', 'Status and presence', resolve('--color-orange-600'), 'text-status-low', 'Low-severity clinical foreground.', [], 'orange-600'),
  semantic('--color-status-danger-fg', 'Status and presence', resolve('--color-red-800'), 'text-status-danger', 'Danger status foreground.', [], 'red-800'),
  semantic('--color-status-danger-bg', 'Status and presence', resolve('--color-red-100'), 'bg-status-danger', 'Danger status background.', [], 'red-100'),
  semantic('--color-status-danger-solid', 'Status and presence', resolve('--color-red-600'), 'bg-status-danger-solid', 'Solid danger status.', ['--destructive'], 'red-600'),
  semantic('--color-status-danger-solid-hover', 'Status and presence', resolve('--color-red-500'), 'bg-status-danger-solid-hover', 'Solid danger hover.', ['--destructive-hover'], 'red-500'),
  semantic('--color-status-critical-fg', 'Status and presence', resolve('--color-red-800'), 'text-status-critical', 'Critical clinical status foreground.', [], 'red-800'),
  semantic('--color-status-critical-bg', 'Status and presence', resolve('--color-red-100'), 'bg-status-critical', 'Critical clinical status background.', [], 'red-100'),
  semantic('--color-status-info-fg', 'Status and presence', resolve('--color-cyan-800'), 'text-status-info', 'Information status foreground.', [], 'cyan-800'),
  semantic('--color-status-info-bg', 'Status and presence', resolve('--color-cyan-200'), 'bg-status-info', 'Information status background.', [], 'cyan-200'),
  semantic('--color-status-info-solid', 'Status and presence', resolve('--color-cyan-600'), 'bg-status-info-solid', 'Solid information status.', [], 'cyan-600'),
  semantic('--color-status-ai-fg', 'Status and presence', resolve('--color-purple-600'), 'text-status-ai', 'AI-assisted status foreground.', [], 'purple-600'),
  semantic('--color-status-ai-bg', 'Status and presence', resolve('--color-purple-100'), 'bg-status-ai', 'AI-assisted status background.', [], 'purple-100'),
  semantic('--color-status-ai-solid', 'Status and presence', resolve('--color-purple-500'), 'bg-status-ai-solid', 'Solid AI-assisted status.', [], 'purple-500'),
  semantic('--color-status-on-solid', 'Status and presence', resolve('--color-foreground-full'), 'text-status-on-solid', 'Text and icon on solid status fills.', ['--destructive-foreground'], 'foreground-full'),
  semantic('--color-presence-online', 'Status and presence', resolve('--color-status-success-solid'), 'bg-presence-online', 'Online presence indicator.', [], 'status-success-solid'),
  semantic('--color-presence-busy', 'Status and presence', resolve('--color-status-danger-solid'), 'bg-presence-busy', 'Busy presence indicator.', [], 'status-danger-solid'),
  semantic('--color-presence-offline', 'Status and presence', resolve('--color-neutral-400'), 'bg-presence-offline', 'Offline presence indicator.', [], 'neutral-400'),

  semantic('--color-chart-track', 'Data visualization', resolve('--color-neutral-200'), 'bg-chart-track', 'Chart track.', [], 'neutral-200'),
  semantic('--color-chart-cursor', 'Data visualization', resolve('--color-neutral-300'), 'bg-chart-cursor', 'Chart cursor.', [], 'neutral-300'),
  semantic('--color-chart-neutral', 'Data visualization', resolve('--color-neutral-300'), 'bg-chart-neutral', 'Neutral chart series.', [], 'neutral-300'),
  semantic('--color-chart-1', 'Data visualization', resolve('--color-teal-400'), 'bg-chart-1', 'Chart series 1.', [], 'teal-400'),
  semantic('--color-chart-1-active', 'Data visualization', resolve('--color-teal-500'), 'bg-chart-1-active', 'Chart series 1 active.', [], 'teal-500'),
  semantic('--color-chart-2', 'Data visualization', resolve('--color-lime-400'), 'bg-chart-2', 'Chart series 2.', [], 'lime-400'),
  semantic('--color-chart-2-active', 'Data visualization', resolve('--color-lime-500'), 'bg-chart-2-active', 'Chart series 2 active.', [], 'lime-500'),
  semantic('--color-chart-3', 'Data visualization', resolve('--color-pink-400'), 'bg-chart-3', 'Chart series 3.', [], 'pink-400'),
  semantic('--color-chart-3-active', 'Data visualization', resolve('--color-pink-500'), 'bg-chart-3-active', 'Chart series 3 active.', [], 'pink-500'),
  semantic('--color-chart-4', 'Data visualization', resolve('--color-sky-400'), 'bg-chart-4', 'Chart series 4.', [], 'sky-400'),
  semantic('--color-chart-4-active', 'Data visualization', resolve('--color-sky-500'), 'bg-chart-4-active', 'Chart series 4 active.', [], 'sky-500'),
  semantic('--color-chart-5', 'Data visualization', resolve('--color-purple-400'), 'bg-chart-5', 'Chart series 5.', [], 'purple-400'),
  semantic('--color-chart-5-active', 'Data visualization', resolve('--color-purple-500'), 'bg-chart-5-active', 'Chart series 5 active.', [], 'purple-500'),
  semantic('--color-chart-6', 'Data visualization', resolve('--color-brand-400'), 'bg-chart-6', 'Chart series 6 with Kura blue.', [], 'brand-400'),
  semantic('--color-chart-6-active', 'Data visualization', resolve('--color-brand-500'), 'bg-chart-6-active', 'Chart series 6 active with Kura blue.', [], 'brand-500'),
  semantic('--color-chart-7', 'Data visualization', resolve('--color-emerald-400'), 'bg-chart-7', 'Chart series 7.', [], 'emerald-400'),
  semantic('--color-chart-7-active', 'Data visualization', resolve('--color-emerald-500'), 'bg-chart-7-active', 'Chart series 7 active.', [], 'emerald-500'),
  semantic('--color-chart-8', 'Data visualization', resolve('--color-yellow-400'), 'bg-chart-8', 'Chart series 8.', [], 'yellow-400'),
  semantic('--color-chart-8-active', 'Data visualization', resolve('--color-yellow-500'), 'bg-chart-8-active', 'Chart series 8 active.', [], 'yellow-500'),

  semantic('--color-specimen-yellow-sps', 'Clinical and domain', resolve('--color-yellow-200'), 'bg-specimen-yellow-sps', 'Yellow SPS tube stopper fill.', [], 'yellow-200'),
  semantic('--color-specimen-yellow-sps-stripe', 'Clinical and domain', resolve('--color-yellow-800'), 'bg-specimen-yellow-sps-stripe', 'Yellow SPS tube stripe.', [], 'yellow-800'),
  semantic('--color-specimen-light-blue', 'Clinical and domain', resolve('--color-cyan-100'), 'bg-specimen-light-blue', 'Light-blue citrate tube stopper fill.', [], 'cyan-100'),
  semantic('--color-specimen-light-blue-stripe', 'Clinical and domain', resolve('--color-cyan-800'), 'bg-specimen-light-blue-stripe', 'Light-blue citrate tube stripe.', [], 'cyan-800'),
  semantic('--color-specimen-red', 'Clinical and domain', resolve('--color-red-100'), 'bg-specimen-red', 'Red serum tube stopper fill.', [], 'red-100'),
  semantic('--color-specimen-red-stripe', 'Clinical and domain', resolve('--color-red-600'), 'bg-specimen-red-stripe', 'Red serum tube stripe.', [], 'red-600'),
  semantic('--color-specimen-gold', 'Clinical and domain', resolve('--color-yellow-100'), 'bg-specimen-gold', 'Gold SST tube stopper fill.', [], 'yellow-100'),
  semantic('--color-specimen-gold-stripe', 'Clinical and domain', resolve('--color-yellow-500'), 'bg-specimen-gold-stripe', 'Gold SST tube stripe.', [], 'yellow-500'),
  semantic('--color-specimen-green', 'Clinical and domain', resolve('--color-green-100'), 'bg-specimen-green', 'Green heparin tube stopper fill.', [], 'green-100'),
  semantic('--color-specimen-green-stripe', 'Clinical and domain', resolve('--color-green-800'), 'bg-specimen-green-stripe', 'Green heparin tube stripe.', [], 'green-800'),
  semantic('--color-specimen-gray-green', 'Clinical and domain', resolve('--color-green-50'), 'bg-specimen-gray-green', 'Gray-green trace-element tube stopper fill.', [], 'green-50'),
  semantic('--color-specimen-gray-green-stripe', 'Clinical and domain', resolve('--color-green-800'), 'bg-specimen-gray-green-stripe', 'Gray-green trace-element tube stripe.', [], 'green-800'),
  semantic('--color-specimen-lavender', 'Clinical and domain', resolve('--color-purple-50'), 'bg-specimen-lavender', 'Lavender EDTA tube stopper fill.', [], 'purple-50'),
  semantic('--color-specimen-lavender-stripe', 'Clinical and domain', resolve('--color-purple-500'), 'bg-specimen-lavender-stripe', 'Lavender EDTA tube stripe.', [], 'purple-500'),
  semantic('--color-specimen-pink', 'Clinical and domain', resolve('--color-red-50'), 'bg-specimen-pink', 'Pink blood-bank tube stopper fill.', [], 'red-50'),
  semantic('--color-specimen-pink-stripe', 'Clinical and domain', resolve('--color-red-400'), 'bg-specimen-pink-stripe', 'Pink blood-bank tube stripe.', [], 'red-400'),
  semantic('--color-specimen-white', 'Clinical and domain', resolve('--color-neutral-100'), 'bg-specimen-white', 'White pearl tube stopper fill.', [], 'neutral-100'),
  semantic('--color-specimen-white-stripe', 'Clinical and domain', resolve('--color-neutral-400'), 'bg-specimen-white-stripe', 'White pearl tube stripe.', [], 'neutral-400'),
  semantic('--color-specimen-dark-gray', 'Clinical and domain', resolve('--color-slate-200'), 'bg-specimen-dark-gray', 'Dark-gray fluoride tube stopper fill.', [], 'slate-200'),
  semantic('--color-specimen-dark-gray-stripe', 'Clinical and domain', resolve('--color-neutral-600'), 'bg-specimen-dark-gray-stripe', 'Dark-gray fluoride tube stripe.', [], 'neutral-600'),
] as const satisfies readonly DcmSemanticToken[];

export const DCM_COLOR_TOKENS = [
  ...DCM_PRIMITIVE_TOKENS,
  ...DCM_SEMANTIC_TOKENS,
] as const satisfies readonly DcmColorToken[];

export const DCM_COLOR_MIGRATION_ALIASES = [
  { name: '--background', target: '--color-surface-bg', description: 'Application background adapter.' },
  { name: '--foreground', target: '--color-text-primary', description: 'Default foreground adapter.' },
  { name: '--card', target: '--color-surface-2', description: 'Card tray surface adapter (gray on the white page).' },
  { name: '--card-foreground', target: '--color-text-primary', description: 'Card foreground adapter.' },
  { name: '--primary', target: '--color-action-primary-bg', description: 'Primary action adapter.' },
  { name: '--primary-hover', target: '--color-action-primary-bg-hover', description: 'Primary action hover adapter.' },
  { name: '--primary-foreground', target: '--color-action-primary-fg', description: 'Primary action foreground adapter.' },
  { name: '--primary-accent', target: '--color-action-primary-accent', description: 'Primary non-text accent adapter.' },
  { name: '--secondary', target: '--color-action-secondary-bg', description: 'Secondary control adapter.' },
  { name: '--secondary-foreground', target: '--color-action-secondary-fg', description: 'Secondary control foreground adapter.' },
  { name: '--destructive', target: '--color-status-danger-solid', description: 'Destructive action adapter.' },
  { name: '--destructive-hover', target: '--color-status-danger-solid-hover', description: 'Destructive action hover adapter.' },
  { name: '--destructive-foreground', target: '--color-status-on-solid', description: 'Destructive action foreground adapter.' },
  { name: '--muted', target: '--color-surface-2', description: 'Muted surface adapter.' },
  { name: '--muted-foreground', target: '--color-text-tertiary', description: 'Muted foreground adapter.' },
  { name: '--ring', target: '--color-border-focus-ring', description: 'Focus ring adapter.' },
  { name: '--border', target: '--color-border', description: 'Default border adapter.' },
  { name: '--surface', target: '--color-surface', description: 'Surface alias.' },
  { name: '--surface-sunken', target: '--color-surface-sunken', description: 'Surface alias.' },
  { name: '--border-strong', target: '--color-border-strong', description: 'Border alias.' },
  { name: '--border-focus', target: '--color-border-focus', description: 'Focus-border alias.' },
  { name: '--text-secondary', target: '--color-text-secondary', description: 'Text alias.' },
  { name: '--text-link', target: '--color-text-link', description: 'Link text alias.' },
  { name: '--text-disabled', target: '--color-text-disabled', description: 'Disabled text alias.' },
  { name: '--accent', target: '--color-selection-bg', description: 'Selected-control background alias.' },
] as const satisfies readonly ColorAlias[];

export const KURA_COLOR_COMPATIBILITY_ALIASES = [
  { name: '--status-neutral-bg', target: '--color-status-neutral-bg', description: 'Status alias.' },
  { name: '--status-neutral-fg', target: '--color-status-neutral-fg', description: 'Status alias.' },
  { name: '--status-success-bg', target: '--color-status-success-bg', description: 'Status alias.' },
  { name: '--status-success-fg', target: '--color-status-success-fg', description: 'Status alias.' },
  { name: '--status-warning-bg', target: '--color-status-warning-bg', description: 'Status alias.' },
  { name: '--status-warning-fg', target: '--color-status-warning-fg', description: 'Status alias.' },
  { name: '--status-danger-bg', target: '--color-status-danger-bg', description: 'Status alias.' },
  { name: '--status-danger-fg', target: '--color-status-danger-fg', description: 'Status alias.' },
  { name: '--status-info-bg', target: '--color-status-info-bg', description: 'Status alias.' },
  { name: '--status-info-fg', target: '--color-status-info-fg', description: 'Status alias.' },
  { name: '--status-ai-bg', target: '--color-status-ai-bg', description: 'AI-status alias.' },
  { name: '--status-ai-fg', target: '--color-status-ai-fg', description: 'AI-status alias.' },
] as const satisfies readonly ColorAlias[];

export const KURA_COLOR_EXTENSIONS = [
  {
    name: '--color-auth-ambient-primary-rgb',
    group: 'Auth ambient',
    value: '38, 140, 255',
    description: 'Primary brand channel for translucent auth artwork.',
    swatch: false,
  },
  {
    name: '--color-auth-ambient-deep-rgb',
    group: 'Auth ambient',
    value: '16, 6, 159',
    description: 'Deep secondary channel for translucent auth artwork.',
    swatch: false,
  },
  {
    name: '--color-auth-ambient-light-rgb',
    group: 'Auth ambient',
    value: '10, 176, 229',
    description: 'Light secondary channel for translucent auth artwork.',
    swatch: false,
  },
  {
    name: '--color-auth-surface-rgb',
    group: 'Auth ambient',
    value: '255, 255, 255',
    description: 'Surface channel for translucent auth artwork.',
    swatch: false,
  },
  { name: '--sidebar-bg', group: 'App shell', value: 'var(--color-background-canvas-subtle)', description: 'Sidebar canvas.', swatch: true },
  { name: '--sidebar-fg', group: 'App shell', value: 'var(--color-text-secondary)', description: 'Sidebar foreground.', swatch: true },
  { name: '--sidebar-fg-muted', group: 'App shell', value: 'var(--color-text-tertiary)', description: 'Sidebar muted foreground.', swatch: true },
  { name: '--sidebar-hover-bg', group: 'App shell', value: 'var(--color-action-secondary-bg)', description: 'Sidebar hover surface.', swatch: true },
  { name: '--sidebar-active-bg', group: 'App shell', value: 'var(--color-selection-bg)', description: 'Sidebar active surface.', swatch: true },
  { name: '--sidebar-active-fg', group: 'App shell', value: 'var(--color-selection-fg)', description: 'Sidebar active foreground.', swatch: true },
  { name: '--sidebar-border', group: 'App shell', value: 'var(--color-border)', description: 'Sidebar boundary.', swatch: true },
  { name: '--sidebar-ring', group: 'App shell', value: 'var(--color-border-focus-ring)', description: 'Sidebar focus ring.', swatch: true },
  { name: '--lab-range-optimal', group: 'Lab range', value: 'success / 22%', description: 'Active in-range band.', swatch: true },
  { name: '--lab-range-caution', group: 'Lab range', value: 'var(--color-status-warning-bg)', description: 'Active caution band.', swatch: true },
  { name: '--lab-range-out', group: 'Lab range', value: 'danger / 22%', description: 'Active out-of-range band.', swatch: true },
  { name: '--lab-range-optimal-muted', group: 'Lab range', value: 'var(--color-status-success-bg)', description: 'Inactive in-range band.', swatch: true },
  { name: '--lab-range-caution-muted', group: 'Lab range', value: 'warning / 60%', description: 'Inactive caution band.', swatch: true },
  { name: '--lab-range-out-muted', group: 'Lab range', value: 'var(--color-status-danger-bg)', description: 'Inactive out-of-range band.', swatch: true },
  { name: '--lab-dot-optimal', group: 'Lab range', value: 'var(--color-status-success-fg)', description: 'In-range value marker.', swatch: true },
  { name: '--lab-dot-caution', group: 'Lab range', value: 'var(--color-status-low-fg)', description: 'Caution value marker.', swatch: true },
  { name: '--lab-dot-out', group: 'Lab range', value: 'var(--color-status-danger-fg)', description: 'Out-of-range value marker.', swatch: true },
  { name: '--lab-dot-ring', group: 'Lab range', value: 'var(--color-surface)', description: 'Value-marker contrast ring.', swatch: true },
  { name: '--stepper-done-bg', group: 'Stepper', value: 'var(--color-selection-bg)', description: 'Completed-step surface.', swatch: true },
  { name: '--stepper-done-fg', group: 'Stepper', value: 'var(--color-action-primary-bg)', description: 'Completed-step foreground.', swatch: true },
  { name: '--stepper-active-ring', group: 'Stepper', value: 'var(--color-selection-bg-strong)', description: 'Active-step halo.', swatch: true },
  { name: '--stepper-rail-done', group: 'Stepper', value: 'var(--color-brand-200)', description: 'Completed rail segment.', swatch: true },
] as const satisfies readonly KuraColorExtension[];

export const DCM_SEMANTIC_TONE_RULES = [
  {
    tone: 'neutral',
    meanings: ['normal', 'inactive', 'unknown', 'no-reference'],
    foreground: '--color-status-neutral-fg',
    background: '--color-status-neutral-bg',
    requirement: 'Text or icon cue required; never color-only',
    description: 'Use neutral for ordinary, missing, inactive, or metadata states.',
  },
  {
    tone: 'info',
    meanings: ['informational'],
    foreground: '--color-status-info-fg',
    background: '--color-status-info-bg',
    requirement: 'Text or icon cue required; never color-only',
    description: 'Use info for context that does not require correction.',
  },
  {
    tone: 'success',
    meanings: ['completed', 'verified', 'in-range', 'stable'],
    foreground: '--color-status-success-fg',
    background: '--color-status-success-bg',
    requirement: 'Text or icon cue required; never color-only',
    description: 'Use success for confirmed, completed, verified, or stable outcomes.',
  },
  {
    tone: 'warning',
    meanings: ['pending', 'review', 'out-of-reference', 'recoverable'],
    foreground: '--color-status-warning-fg',
    background: '--color-status-warning-bg',
    requirement: 'Text or icon cue required; never color-only',
    description: 'Use warning for review, pending work, reference exceptions, or recoverable issues.',
  },
  {
    tone: 'danger',
    meanings: ['critical', 'destructive', 'blocked', 'privacy', 'safety', 'payment failure'],
    foreground: '--color-status-danger-fg',
    background: '--color-status-danger-bg',
    requirement: 'Text or icon cue required; never color-only',
    description: 'Use danger for critical, destructive, privacy, safety, or payment failures.',
  },
  {
    tone: 'ai',
    meanings: ['AI-assisted', 'generated insight'],
    foreground: '--color-status-ai-fg',
    background: '--color-status-ai-bg',
    requirement: 'Text or icon cue required; never color-only',
    description: 'Reserve purple for AI-assisted suggestions and generated insight.',
  },
  {
    tone: 'brand',
    meanings: ['primary action', 'selected navigation', 'active focus'],
    foreground: '--color-selection-fg',
    background: '--color-selection-bg',
    requirement: 'Text or icon cue required; never color-only',
    description: 'Use Kura blue for primary action, selected navigation, links, and focus.',
  },
] as const satisfies readonly DcmSemanticToneRule[];
