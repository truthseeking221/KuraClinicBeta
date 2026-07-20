import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, within } from "storybook/test";

import {
  CheckIcon,
  HUGEICONS_PRO_STYLES,
  InformationIcon,
  KURA_CHEVRON_ICON_STYLE,
  type HugeiconsProStyle,
} from "./kura-icons";
import { GoogleProviderMark, TelegramProviderMark } from "./provider-marks";
import {
  KURA_CHEVRON_ICON_ENTRIES,
  KURA_ICON_CATEGORIES,
  KURA_ICON_COUNT,
  KURA_STYLE_VARIANT_COUNT,
} from "./kura-icon-catalog";
import styles from "./icons.stories.module.css";

const STYLE_META: Record<
  HugeiconsProStyle,
  { family: string; label: string; shape: string }
> = {
  "bulk-rounded": { family: "Depth", label: "Bulk", shape: "Rounded" },
  "duotone-rounded": {
    family: "Two colour",
    label: "Duotone",
    shape: "Rounded",
  },
  "duotone-standard": {
    family: "Two colour",
    label: "Duotone",
    shape: "Standard",
  },
  "solid-rounded": { family: "Solid", label: "Solid", shape: "Rounded" },
  "solid-sharp": { family: "Solid", label: "Solid", shape: "Sharp" },
  "solid-standard": { family: "Solid", label: "Solid", shape: "Standard" },
  "stroke-rounded": { family: "Stroke", label: "Stroke", shape: "Rounded" },
  "stroke-sharp": { family: "Stroke", label: "Stroke", shape: "Sharp" },
  "stroke-standard": {
    family: "Stroke",
    label: "Stroke",
    shape: "Standard",
  },
  "twotone-rounded": {
    family: "Two colour",
    label: "Twotone",
    shape: "Rounded",
  },
};

const meta = {
  title: "Design System/Foundations/Icons",
  component: CheckIcon,
  args: {
    iconStyle: "stroke-rounded",
  },
  parameters: {
    layout: "fullscreen",
    chromatic: { viewports: [320, 390, 768, 1440] },
    kura: {
      owner: "src/components/ui/icons",
      layer: "Foundation",
      decision: "EXTEND",
      primaryTask:
        "Help Kura designers and engineers choose a semantically correct icon and verify it in every licensed style.",
      journeys: [
        "ACC",
        "WQ",
        "PAT",
        "ENC",
        "ORD",
        "REC",
        "PHL",
        "LOG",
        "RES",
        "FIN",
        "CARE",
        "COM",
        "INV",
        "ADM",
        "MOB",
      ],
      source: {
        vendor: "Hugeicons Pro and Simple Icons",
        packages: [
          "@hugeicons/react",
          "@hugeicons-pro/core-bulk-rounded",
          "@hugeicons-pro/core-duotone-rounded",
          "@hugeicons-pro/core-duotone-standard",
          "@hugeicons-pro/core-solid-rounded",
          "@hugeicons-pro/core-solid-sharp",
          "@hugeicons-pro/core-solid-standard",
          "@hugeicons-pro/core-stroke-rounded",
          "@hugeicons-pro/core-stroke-sharp",
          "@hugeicons-pro/core-stroke-standard",
          "@hugeicons-pro/core-twotone-rounded",
          "@icons-pack/react-simple-icons@12.9.0",
        ],
      },
      binding: {
        colors: "kura-semantic-currentColor",
        typography: "kura",
        spacing: "kura",
        radius: "kura",
        elevation: "none",
        icons:
          "Kura-canonical semantic icons; approved provider marks retain only their geometry and inherit currentColor from the containing Kura control.",
        density: "inherited from the containing Kura component",
        responsive:
          "Catalog reflows; the exhaustive comparison matrix uses labelled, intentional horizontal scrolling at narrow widths.",
      },
      verification: {
        themes: ["light", "dark"],
        densities: ["compact", "cozy", "comfortable"],
        widths: [320, 360, 390, 412, 480, 768, 1024, "desktop"],
      },
    },
    docs: {
      description: {
        component:
          "Kura-owned semantic icons backed by licensed Hugeicons Pro packages. Approved identity-provider marks are narrow Kura wrappers backed by Simple Icons, rendered with Kura semantic currentColor. Runtime modules use named imports for tree-shaking; this Storybook catalogue intentionally renders the complete curated set.",
      },
    },
  },
  argTypes: {
    iconStyle: { control: "select", options: HUGEICONS_PRO_STYLES },
    size: { control: "text" },
    strokeWidth: { control: "number" },
  },
} satisfies Meta<typeof CheckIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

function FoundationHeader({
  description,
  matrix = false,
  title,
}: {
  description: string;
  matrix?: boolean;
  title: string;
}) {
  return (
    <header className={styles.header}>
      <div className={styles.headerCopy}>
        <p className={styles.eyebrow}>Foundation · Icons</p>
        <h1 className={styles.pageTitle}>{title}</h1>
        <p className={styles.intro}>{description}</p>
      </div>
      <dl className={styles.stats} aria-label="Icon foundation coverage">
        <div>
          <dt>Semantic icons</dt>
          <dd>{KURA_ICON_COUNT}</dd>
        </div>
        <div>
          <dt>Pro styles</dt>
          <dd>{HUGEICONS_PRO_STYLES.length}</dd>
        </div>
        <div>
          <dt>{matrix ? "Verified cells" : "Style variants"}</dt>
          <dd>{KURA_STYLE_VARIANT_COUNT.toLocaleString("en-US")}</dd>
        </div>
      </dl>
    </header>
  );
}

function UsageRules() {
  return (
    <section className={styles.rules} aria-labelledby="icon-usage-rules">
      <div>
        <p className={styles.sectionKicker}>Usage contract</p>
        <h2 id="icon-usage-rules" className={styles.sectionTitle}>
          Meaning first, shape second
        </h2>
      </div>
      <div className={styles.ruleGrid}>
        <div>
          <strong>Default</strong>
          <span>
            Use Stroke Rounded generally. Chevron exports always default to
            Stroke Standard for crisp disclosure and navigation geometry.
          </span>
        </div>
        <div>
          <strong>Critical meaning</strong>
          <span>
            Pair clinical, payment, identity, and warning icons with explicit
            text.
          </span>
        </div>
        <div>
          <strong>Imports</strong>
          <span>
            Application code imports semantic icon names from the Kura UI Kit
            only.
          </span>
        </div>
      </div>
    </section>
  );
}

function StyleIndex({ activeStyle }: { activeStyle: HugeiconsProStyle }) {
  return (
    <section
      className={styles.styleIndex}
      aria-labelledby="installed-pro-styles"
    >
      <div className={styles.sectionHeading}>
        <div>
          <p className={styles.sectionKicker}>Licensed set</p>
          <h2 id="installed-pro-styles" className={styles.sectionTitle}>
            Ten installed Pro styles
          </h2>
        </div>
        <p className={styles.sectionDescription}>
          Storybook controls change the catalogue preview without changing the
          canonical component API.
        </p>
      </div>
      <div className={styles.styleGrid}>
        {HUGEICONS_PRO_STYLES.map((iconStyle) => {
          const style = STYLE_META[iconStyle];
          const isActive = iconStyle === activeStyle;
          return (
            <div
              className={isActive ? styles.activeStyleCard : styles.styleCard}
              key={iconStyle}
              aria-current={isActive ? "true" : undefined}
            >
              <CheckIcon
                iconStyle={iconStyle}
                size="1.25rem"
                aria-hidden="true"
              />
              <span>
                <strong>{style.label}</strong>
                <small>{style.shape}</small>
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function CategoryIndex() {
  return (
    <nav className={styles.categoryIndex} aria-label="Icon categories">
      {KURA_ICON_CATEGORIES.map((category) => (
        <a key={category.id} href={`#icon-category-${category.id}`}>
          <span>{category.title}</span>
          <small>{category.icons.length}</small>
        </a>
      ))}
    </nav>
  );
}

function IconCatalog({ iconStyle }: { iconStyle: HugeiconsProStyle }) {
  return (
    <main className={styles.page} data-testid="icon-catalog">
      <FoundationHeader
        title="Kura icon catalogue"
        description="A journey-grounded semantic inventory for clinical, operational, and administrative product work. Choose the meaning here; choose the visual style through the component contract."
      />
      <UsageRules />
      <StyleIndex activeStyle={iconStyle} />
      <CategoryIndex />
      <div className={styles.categoryStack}>
        {KURA_ICON_CATEGORIES.map((category) => (
          <section
            id={`icon-category-${category.id}`}
            key={category.id}
            data-testid="icon-category"
            className={styles.category}
            aria-labelledby={`icon-category-title-${category.id}`}
          >
            <div className={styles.categoryHeading}>
              <div>
                <p className={styles.categoryCount}>
                  {category.icons.length} semantic icons
                </p>
                <h2 id={`icon-category-title-${category.id}`}>
                  {category.title}
                </h2>
                <p>{category.description}</p>
              </div>
              <div
                className={styles.journeys}
                aria-label="Related Kura journeys"
              >
                {category.journeyIds.map((journeyId) => (
                  <span key={journeyId}>{journeyId}</span>
                ))}
              </div>
            </div>
            <div className={styles.iconGrid}>
              {category.icons.map(
                ({ Icon, defaultStyle, exportName, label }) => (
                  <article
                    key={exportName}
                    className={styles.iconCard}
                    data-testid="icon-catalog-entry"
                    data-default-style={defaultStyle}
                  >
                    <div className={styles.iconPreview} aria-hidden="true">
                      <Icon
                        iconStyle={defaultStyle ?? iconStyle}
                        size="1.5rem"
                      />
                    </div>
                    <div className={styles.iconCopy}>
                      <strong>{label}</strong>
                      <code>{exportName}</code>
                      {defaultStyle ? (
                        <span className={styles.stylePolicy}>
                          {STYLE_META[defaultStyle].label} ·{" "}
                          {STYLE_META[defaultStyle].shape}
                        </span>
                      ) : null}
                    </div>
                  </article>
                ),
              )}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}

function ChevronStandardReference() {
  return (
    <main className={styles.page} data-testid="chevron-standard-reference">
      <FoundationHeader
        title="Chevron · Stroke Standard"
        description="The canonical Chevron family for disclosure, pagination, directional navigation, resizing, and compact list controls. These wrappers render Stroke Standard by default in Kura product UI."
      />
      <section
        className={styles.category}
        aria-labelledby="chevron-standard-title"
      >
        <div className={styles.categoryHeading}>
          <div>
            <p className={styles.categoryCount}>
              {KURA_CHEVRON_ICON_ENTRIES.length} canonical chevrons
            </p>
            <h2 id="chevron-standard-title">Production default</h2>
            <p>
              The exhaustive matrix still shows every licensed style for visual
              QA; product consumers inherit Stroke Standard without a local
              override.
            </p>
          </div>
        </div>
        <div className={styles.iconGrid}>
          {KURA_CHEVRON_ICON_ENTRIES.map(({ Icon, exportName, label }) => (
            <article
              key={exportName}
              className={styles.iconCard}
              data-testid="chevron-standard-entry"
            >
              <div className={styles.iconPreview} aria-hidden="true">
                <Icon size="1.5rem" />
              </div>
              <div className={styles.iconCopy}>
                <strong>{label}</strong>
                <code>{exportName}</code>
                <span className={styles.stylePolicy}>Stroke · Standard</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

function ProviderMarkReference() {
  const marks = [
    {
      Mark: GoogleProviderMark,
      brand: "Google",
      exportName: "GoogleProviderMark",
      providerId: "google",
    },
    {
      Mark: TelegramProviderMark,
      brand: "Telegram",
      exportName: "TelegramProviderMark",
      providerId: "telegram",
    },
  ] as const;

  return (
    <main className={styles.page} data-testid="provider-mark-reference">
      <FoundationHeader
        title="Identity-provider marks"
        description="A deliberately narrow set of canonical Kura wrappers for an identity provider that the auth owner has already configured. Each mark preserves its approved brand treatment and never replaces the visible provider name."
      />
      <section className={styles.category} aria-labelledby="provider-mark-title">
        <div className={styles.categoryHeading}>
          <div>
            <p className={styles.categoryCount}>{marks.length} approved marks</p>
            <h2 id="provider-mark-title">Provider identity</h2>
            <p>
              Use only through <code>IdentityProviderButton</code> with its explicit
              <code> providerBrand</code> contract. Do not infer an enabled provider from a
              display name or use these as general-purpose social icons.
            </p>
          </div>
        </div>
        <div className={styles.iconGrid}>
          {marks.map(({ Mark, brand, exportName, providerId }) => (
            <article
              key={providerId}
              className={styles.iconCard}
              data-testid="provider-mark-entry"
            >
              <div className={styles.iconPreview}>
                <Mark aria-label={brand} data-testid={`${providerId}-provider-mark`} size="1.5rem" />
              </div>
              <div className={styles.iconCopy}>
                <strong>{brand}</strong>
                <code>{exportName}</code>
                <span className={styles.stylePolicy}>
                  {providerId === "google" ? "Official standard colour" : "Kura semantic currentColor"}
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

function FullMatrix() {
  return (
    <main className={styles.page} data-testid="full-style-matrix">
      <FoundationHeader
        matrix
        title="Full style matrix"
        description="Exhaustive visual verification of every curated Kura semantic icon across every installed Hugeicons Pro style. Each row is one canonical export; each column is one licensed package."
      />
      <div className={styles.matrixNotice}>
        <InformationIcon aria-hidden="true" />
        <p>
          On narrow screens, scroll each matrix horizontally. The icon name
          remains pinned so comparison context is preserved.
        </p>
      </div>
      <div className={styles.matrixStack}>
        {KURA_ICON_CATEGORIES.map((category) => (
          <section
            key={category.id}
            className={styles.matrixSection}
            aria-labelledby={`matrix-category-${category.id}`}
          >
            <div className={styles.matrixCategoryHeading}>
              <div>
                <p className={styles.categoryCount}>
                  {category.icons.length * HUGEICONS_PRO_STYLES.length} verified
                  cells
                </p>
                <h2 id={`matrix-category-${category.id}`}>{category.title}</h2>
              </div>
              <span>{category.icons.length} × 10</span>
            </div>
            <div className={styles.matrixScroller} tabIndex={0}>
              <table className={styles.matrixTable}>
                <caption className={styles.srOnly}>
                  {category.title}: every icon shown in every installed
                  Hugeicons Pro style
                </caption>
                <thead>
                  <tr>
                    <th scope="col">Semantic export</th>
                    {HUGEICONS_PRO_STYLES.map((iconStyle) => {
                      const style = STYLE_META[iconStyle];
                      return (
                        <th scope="col" key={iconStyle}>
                          <strong>{style.label}</strong>
                          <span>{style.shape}</span>
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {category.icons.map(({ Icon, exportName, label }) => (
                    <tr key={exportName}>
                      <th scope="row">
                        <strong>{label}</strong>
                        <code>{exportName}</code>
                      </th>
                      {HUGEICONS_PRO_STYLES.map((iconStyle) => (
                        <td key={iconStyle} data-testid="icon-style-cell">
                          <Icon
                            iconStyle={iconStyle}
                            size="1.375rem"
                            aria-hidden="true"
                          />
                          <span className={styles.srOnly}>{iconStyle}</span>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}

export const Catalog: Story = {
  render: ({ iconStyle = "stroke-rounded" }) => (
    <IconCatalog iconStyle={iconStyle} />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getAllByTestId("icon-catalog-entry")).toHaveLength(
      KURA_ICON_COUNT,
    );
    await expect(canvas.getAllByTestId("icon-category")).toHaveLength(
      KURA_ICON_CATEGORIES.length,
    );
    for (const icon of canvasElement.querySelectorAll(
      '[data-default-style="stroke-standard"] svg',
    )) {
      await expect(icon).toHaveAttribute(
        "data-kura-icon-style",
        KURA_CHEVRON_ICON_STYLE,
      );
    }
  },
};

export const CatalogDark: Story = {
  render: ({ iconStyle = "stroke-rounded" }) => (
    <IconCatalog iconStyle={iconStyle} />
  ),
  globals: { theme: "dark" },
  parameters: { chromatic: { viewports: [390, 1440] } },
};

export const CatalogNarrow: Story = {
  render: ({ iconStyle = "stroke-rounded" }) => (
    <IconCatalog iconStyle={iconStyle} />
  ),
  parameters: { chromatic: { viewports: [320, 360, 390] } },
};

export const FullStyleMatrix: Story = {
  render: () => <FullMatrix />,
  parameters: {
    chromatic: { viewports: [390, 1440] },
    docs: {
      description: {
        story:
          "Every semantic icon multiplied by all ten installed Pro styles. This is the exhaustive coverage story, not a representative sample.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getAllByTestId("icon-style-cell")).toHaveLength(
      KURA_STYLE_VARIANT_COUNT,
    );
  },
};

export const ChevronStrokeStandard: Story = {
  render: () => <ChevronStandardReference />,
  parameters: {
    chromatic: { viewports: [320, 390, 768, 1440] },
    docs: {
      description: {
        story:
          "Canonical Chevron wrappers rendered with their production default: Hugeicons Pro Stroke Standard.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const entries = canvas.getAllByTestId("chevron-standard-entry");
    await expect(entries).toHaveLength(KURA_CHEVRON_ICON_ENTRIES.length);
    for (const icon of canvasElement.querySelectorAll(
      '[data-testid="chevron-standard-entry"] svg',
    )) {
      await expect(icon).toHaveAttribute(
        "data-kura-icon-style",
        KURA_CHEVRON_ICON_STYLE,
      );
    }
  },
};

export const ProviderMarks: Story = {
  render: () => <ProviderMarkReference />,
  parameters: {
    chromatic: { viewports: [320, 390, 768, 1440] },
    docs: {
      description: {
        story:
          "Canonical provider-mark wrappers for use only when the auth configuration supplies the matching supported brand identifier. The marks are decorative inside the labelled identity-provider control and have an explicit accessible name when presented standalone here.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getAllByTestId("provider-mark-entry")).toHaveLength(2);
    await expect(canvas.getByTestId("google-provider-mark")).toHaveAttribute(
      "data-kura-provider-mark",
      "google",
    );
    await expect(
      canvas
        .getByTestId("google-provider-mark")
        .querySelector('[data-provider-mark-treatment="official-standard-color"]'),
    ).toBeInTheDocument();
    await expect(canvas.getByTestId("google-provider-mark").querySelector("svg")).toBeNull();
    await expect(canvas.getByTestId("telegram-provider-mark")).toHaveAttribute(
      "data-kura-provider-mark",
      "telegram",
    );
  },
};

export const AccessibilityContract: Story = {
  render: () => (
    <main className={styles.accessibilityPage}>
      <div>
        <p className={styles.eyebrow}>Accessibility contract</p>
        <h1 className={styles.pageTitle}>
          Decorative by default, labelled by intent
        </h1>
      </div>
      <div className={styles.accessibilityExamples}>
        <div>
          <CheckIcon aria-hidden="true" data-testid="decorative-icon" />
          <span>Visible text already communicates confirmation</span>
        </div>
        <div>
          <CheckIcon
            aria-label="Booking confirmed"
            data-testid="labelled-icon"
          />
          <span>Standalone meaningful icon has an accessible name</span>
        </div>
      </div>
    </main>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByLabelText("Booking confirmed")).toBeVisible();
    await expect(canvas.getByTestId("decorative-icon")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
  },
};
