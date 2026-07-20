import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';

import { ArrowLeftIcon, Input, Kbd, KbdGroup, MicrophoneIcon } from './index';
import styles from './kbd.stories.module.css';

const shortcutReference = [
  { label: 'Open command search', keys: ['⌘', 'K'] },
  { label: 'Create lab order', keys: ['⌘', 'N'] },
  { label: 'Save draft', keys: ['⌘', 'S'] },
  { label: 'Close current panel', keys: ['Esc'] },
  { label: 'Move to next field', keys: ['Tab'] },
];

const meta = {
  title: 'Design System/Primitives/Kbd',
  component: Kbd,
  args: { children: 'K' },
  tags: ['autodocs', 'source-reui', 'adapted-kura'],
  parameters: {
    layout: 'centered',
    kura: {
      intake: {
        decision: 'EXTEND',
        owner: 'src/components/ui',
        hierarchy: 'Primitive',
        evidence:
          'Kura already owns semantic Kbd and uses it in AppShell, Filters, Command, and collection scanning. ReUI adds a useful KbdGroup composition and six usage examples; extending the canonical owner avoids a duplicate primitive.',
        exclusions: [
          'The ReUI Tooltip example is not promoted because Kura has no canonical Tooltip owner yet. A Kbd can be composed inside that owner after Tooltip is separately approved.',
          'ReUI demo cards, product copy, foreign icons, and utility-class styling are replaced by Kura stories, canonical icons, and semantic tokens.',
          'Loading, error, selected, and disabled variants are excluded because Kbd is static semantic output rather than an interactive or asynchronous control.',
        ],
      },
      source: {
        vendor: 'ReUI',
        registryItems: ['c-kbd-1', 'c-kbd-2', 'c-kbd-3', 'c-kbd-4', 'c-kbd-5', 'c-kbd-6'],
        sourceUrl: 'https://reui.io/components/kbd',
      },
      binding: {
        colors: 'kura-semantic',
        typography: 'kura-mono',
        spacing: 'kura',
        radius: 'kura',
        elevation: 'none',
        icons: 'kura-canonical',
        motion: 'none',
        density: 'inherited-inline',
        responsive: 'inline wrapping is owned by the surrounding composition',
      },
      useCase: {
        role: 'Any keyboard user learning or recalling an available shortcut',
        primaryTask: 'Recognise one key or a key combination associated with a visible action.',
        primaryAction: 'Use the visible control or its optional keyboard accelerator.',
        dataModel: 'Static key labels supplied by the owning feature; Kbd does not register or execute shortcuts.',
        safety: 'A shortcut hint is informative only and must never be the sole path to an action.',
      },
      mobile: {
        primaryTask: 'Read shortcut guidance without creating horizontal page overflow.',
        minimumUsableWidth: '320px',
        strategy: ['WRAPPING'],
        behavior:
          'Individual key groups stay together; reference rows wrap labels while preserving key order. Touch targets do not apply because Kbd is non-interactive.',
      },
    },
    docs: {
      description: {
        component:
          'Semantic keyboard shortcut hint. Compose KbdGroup for multi-key shortcuts. Informative only—every shortcut must also be reachable by a visible, labelled control.',
      },
    },
  },
} satisfies Meta<typeof Kbd>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Single keys and compact combined labels from the ReUI basic family. */
export const Default: Story = {
  render: () => (
    <div className={styles.inlineExamples}>
      <Kbd>Ctrl</Kbd>
      <Kbd>⌘K</Kbd>
      <Kbd>Ctrl + B</Kbd>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const keys = canvasElement.querySelectorAll('kbd');
    await expect(keys).toHaveLength(3);
    await expect(canvas.getByText('Ctrl + B')).toBeVisible();
  },
};

/** Separate semantic keys grouped into one shortcut. */
export const GroupedKeys: Story = {
  render: () => (
    <KbdGroup aria-label="Control Shift P">
      <Kbd>Ctrl</Kbd>
      <Kbd>Shift</Kbd>
      <Kbd>P</Kbd>
    </KbdGroup>
  ),
};

/** Canonical Kura icons may appear inside a key when the key represents a direction or device action. */
export const KeysWithIcons: Story = {
  render: () => (
    <KbdGroup>
      <Kbd>
        <ArrowLeftIcon aria-hidden="true" />
        Left
      </Kbd>
      <Kbd>
        <MicrophoneIcon aria-hidden="true" />
        Voice
      </Kbd>
    </KbdGroup>
  ),
};

/** Input suffix composition for a discoverable keyboard accelerator. */
export const WithinInput: Story = {
  render: () => (
    <div className={styles.inputExample}>
      <Input
        aria-label="Search patients and orders"
        placeholder="Search patients and orders"
        suffix={<Kbd>⌘K</Kbd>}
      />
    </div>
  ),
};

/** Shortcut reference list for help or settings surfaces. */
export const ReferenceList: Story = {
  render: () => (
    <section aria-labelledby="shortcut-reference-title" className={styles.reference}>
      <h2 className={styles.referenceTitle} id="shortcut-reference-title">
        Keyboard shortcuts
      </h2>
      <div className={styles.referenceList}>
        {shortcutReference.map((shortcut) => (
          <div className={styles.referenceRow} key={shortcut.label}>
            <span className={styles.referenceLabel}>{shortcut.label}</span>
            <KbdGroup aria-label={`${shortcut.label}: ${shortcut.keys.join(' ')}`}>
              {shortcut.keys.map((key) => (
                <Kbd key={key}>{key}</Kbd>
              ))}
            </KbdGroup>
          </div>
        ))}
      </div>
    </section>
  ),
};

/** Narrow layout verifies that long labels wrap while key combinations remain legible. */
export const MobileWidth320: Story = {
  parameters: { viewport: { defaultViewport: 'mobile1' } },
  render: () => (
    <div className={styles.mobileExample}>
      <span>Open the patient and booking search</span>
      <KbdGroup aria-label="Command K">
        <Kbd>⌘</Kbd>
        <Kbd>K</Kbd>
      </KbdGroup>
    </div>
  ),
};
