import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, within } from 'storybook/test';
import { useState } from 'react';
import type { ReactNode } from 'react';
import { hotkeysCoreFeature, syncDataLoaderFeature } from '@headless-tree/core';
import { useTree } from '@headless-tree/react';

import {
  Avatar,
  AvatarFallback,
  Checkbox,
  FileIcon,
  FolderIcon,
  Tree,
  TreeItem,
  TreeItemLabel,
  UserGroupIcon,
} from './index';
import styles from './tree.stories.module.css';

type TreeNode = {
  name: string;
  children?: string[];
  role?: string;
  kind?: 'folder' | 'file';
};

const VISIT_ITEMS: Record<string, TreeNode> = {
  visit: { name: 'Current visit', children: ['orders', 'results', 'documents'] },
  orders: { name: 'Orders', children: ['collection', 'imaging'] },
  collection: { name: 'Collection · 3 tubes' },
  imaging: { name: 'Imaging · 1 request' },
  results: { name: 'Results', children: ['blood-results', 'microbiology'] },
  'blood-results': { name: 'Blood results · 4 available' },
  microbiology: { name: 'Microbiology · pending' },
  documents: { name: 'Documents', children: ['consent', 'referral'] },
  consent: { name: 'Consent form' },
  referral: { name: 'Referral letter' },
};

const FILE_ITEMS: Record<string, TreeNode> = {
  workspace: { name: 'DCM workspace', children: ['src', 'public', 'package', 'readme'] },
  src: { name: 'src', children: ['components', 'features', 'styles'], kind: 'folder' },
  components: { name: 'components', children: ['ui', 'shared'], kind: 'folder' },
  ui: { name: 'ui', children: ['tree', 'button'], kind: 'folder' },
  tree: { name: 'tree.tsx', kind: 'file' },
  button: { name: 'button.tsx', kind: 'file' },
  shared: { name: 'shared.tsx', kind: 'file' },
  features: { name: 'features', children: ['results', 'front-desk'], kind: 'folder' },
  results: { name: 'results', children: ['review'], kind: 'folder' },
  review: { name: 'review.tsx', kind: 'file' },
  'front-desk': { name: 'front-desk.tsx', kind: 'file' },
  styles: { name: 'styles', children: ['tokens', 'fonts'], kind: 'folder' },
  tokens: { name: 'tokens.css', kind: 'file' },
  fonts: { name: 'fonts.css', kind: 'file' },
  public: { name: 'public', children: ['brand'], kind: 'folder' },
  brand: { name: 'brand', children: ['logo'], kind: 'folder' },
  logo: { name: 'kura-logo.svg', kind: 'file' },
  package: { name: 'package.json', kind: 'file' },
  readme: { name: 'README.md', kind: 'file' },
};

const ORG_ITEMS: Record<string, TreeNode> = {
  company: { name: 'Kura Diagnostics', children: ['medical', 'operations'], role: 'Organisation' },
  medical: { name: 'Medical services', children: ['doctor', 'lab'], role: 'Clinical leadership' },
  doctor: { name: 'Dr. Minh Nguyen', role: 'Medical director' },
  lab: { name: 'Dr. Linh Tran', role: 'Laboratory director' },
  operations: { name: 'Clinic operations', children: ['reception', 'collection'], role: 'Operations leadership' },
  reception: { name: 'Mai Pham', role: 'Reception lead' },
  collection: { name: 'Thanh Le', role: 'Collection lead' },
};

const PERMISSION_ITEMS: Record<string, TreeNode> = {
  permissions: { name: 'Workspace permissions', children: ['patients', 'results', 'billing'] },
  patients: { name: 'Patient records', children: ['patient-view', 'patient-edit', 'patient-export'] },
  'patient-view': { name: 'View patient records' },
  'patient-edit': { name: 'Edit patient records' },
  'patient-export': { name: 'Export patient records' },
  results: { name: 'Result review', children: ['result-view', 'result-acknowledge', 'result-share'] },
  'result-view': { name: 'View laboratory results' },
  'result-acknowledge': { name: 'Acknowledge critical results' },
  'result-share': { name: 'Share results externally' },
  billing: { name: 'Billing', children: ['billing-view', 'billing-edit'] },
  'billing-view': { name: 'View invoices' },
  'billing-edit': { name: 'Edit invoices' },
};

function createTree<T extends TreeNode>(
  items: Record<string, T>,
  rootItemId: string,
  expandedItems: string[],
  indent: number,
) {
  return useTree<T>({
    initialState: { expandedItems },
    indent,
    rootItemId,
    getItemName: (item) => item.getItemData().name,
    isItemFolder: (item) => (item.getItemData().children?.length ?? 0) > 0,
    dataLoader: {
      getItem: (itemId) => items[itemId],
      getChildren: (itemId) => items[itemId].children ?? [],
    },
    features: [syncDataLoaderFeature, hotkeysCoreFeature],
  });
}

function StandardTree({
  items,
  rootItemId,
  expandedItems,
  indent = 20,
  toggleIconType = 'chevron',
  className,
  label,
}: {
  items: Record<string, TreeNode>;
  rootItemId: string;
  expandedItems: string[];
  indent?: number;
  toggleIconType?: 'chevron' | 'plus-minus';
  className?: string;
  label: string;
}) {
  const tree = createTree(items, rootItemId, expandedItems, indent);

  return (
    <Tree className={className} indent={indent} tree={tree} toggleIconType={toggleIconType} aria-label={label}>
      {tree.getItems().map((item) => (
        <TreeItem key={item.getId()} item={item}>
          <TreeItemLabel />
        </TreeItem>
      ))}
    </Tree>
  );
}

function FileExplorerTree() {
  const tree = createTree(FILE_ITEMS, 'workspace', ['workspace', 'src', 'components', 'features'], 20);

  return (
    <Tree tree={tree} indent={20} aria-label="DCM workspace files">
      {tree.getItems().map((item) => (
        <TreeItem key={item.getId()} item={item}>
          <TreeItemLabel>
            <span className={styles.nodeContent}>
              <span aria-hidden="true" className={styles.nodeIcon}>
                {item.isFolder() ? <FolderIcon size={16} /> : <FileIcon size={16} />}
              </span>
              {item.getItemName()}
            </span>
          </TreeItemLabel>
        </TreeItem>
      ))}
    </Tree>
  );
}

function OrganizationTree() {
  const tree = createTree(ORG_ITEMS, 'company', ['company', 'medical', 'operations'], 24);

  return (
    <Tree tree={tree} indent={24} aria-label="Kura organisation chart">
      {tree.getItems().map((item) => {
        const data = item.getItemData();
        const initials = data.name
          .split(' ')
          .map((part) => part[0])
          .join('');

        return (
          <TreeItem key={item.getId()} item={item}>
            <TreeItemLabel className={styles.orgLabel}>
              <Avatar size="sm" fallbackTone={item.isFolder() ? 'brand' : 'neutral'}>
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
              <span className={styles.orgCopy}>
                <span className={styles.orgName}>{data.name}</span>
                {data.role ? <span className={styles.orgRole}>{data.role}</span> : null}
              </span>
            </TreeItemLabel>
          </TreeItem>
        );
      })}
    </Tree>
  );
}

function PermissionsTree() {
  const [checked, setChecked] = useState<Set<string>>(
    () => new Set(['patient-view', 'result-view', 'result-acknowledge', 'billing-view']),
  );
  const tree = createTree(PERMISSION_ITEMS, 'permissions', ['permissions', 'patients', 'results', 'billing'], 24);

  function togglePermission(id: string) {
    setChecked((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <Tree tree={tree} indent={24} toggleIconType="plus-minus" aria-label="Workspace permissions">
      {tree.getItems().map((item) => {
        const id = item.getId();
        const isLeaf = !item.isFolder();
        const itemName = item.getItemName();

        return (
          <TreeItem key={id} item={item} render={(props) => <div {...props} />}>
            <TreeItemLabel className={styles.permissionLabel}>
              {isLeaf ? (
                <Checkbox
                  aria-label={`Grant ${itemName}`}
                  checked={checked.has(id)}
                  className={styles.permissionCheckbox}
                  disabled={id === 'billing-edit'}
                  onCheckedChange={() => togglePermission(id)}
                  onClick={(event) => event.stopPropagation()}
                />
              ) : null}
              {itemName}
            </TreeItemLabel>
          </TreeItem>
        );
      })}
    </Tree>
  );
}

function TreeSurface({ children, wide = false }: { children: ReactNode; wide?: boolean }) {
  return <div className={`${wide ? styles.wideFrame : styles.frame} ${styles.treeSurface}`}>{children}</div>;
}

const meta = {
  title: 'Design System/Components/Tree',
  component: Tree,
  args: { tree: undefined as never },
  tags: ['autodocs', 'source-reui', 'adapted-kura'],
  parameters: {
    layout: 'padded',
    kura: {
      source: {
        vendor: 'ReUI',
        registryItem: '@reui/tree',
        sourceUrl: 'https://reui.io/components/tree',
      },
      intake: {
        decision: 'CREATE-from-ReUI-architecture',
        owner: 'src/components/ui',
        evidence:
          'No canonical Tree existed. ReUI headless-tree architecture and the complete free example family were inspected, then the API was adapted to Kura tokens, CSS Modules, and canonical Kura icons.',
        exclusions: [
          'Fine-grained file-type icons are represented with the canonical generic FileIcon because the Kura icon catalog has no approved code/JSON/CSS-specific icons.',
        ],
      },
      binding: {
        colors: 'kura-semantic',
        typography: 'kura',
        spacing: 'kura',
        radius: 'kura',
        elevation: 'kura-flat-focus-only',
        icons: 'kura-canonical',
        motion: 'kura-motion-tokens-reduced-motion-safe',
        density: 'inherits-root-density-and-touch-targets',
        responsive: 'fluid-width-with-320px-reflow',
      },
    },
    docs: {
      description: {
        component:
          'Accessible hierarchical navigation built on Headless Tree. Use it for nested clinic context, workspace files, organisation structure, or permission scopes when arrow-key navigation and explicit hierarchy matter.',
      },
    },
  },
  argTypes: {
    indent: { control: { type: 'number', min: 16, max: 32, step: 4 } },
    toggleIconType: { control: 'radio', options: ['chevron', 'plus-minus'] },
  },
} satisfies Meta<typeof Tree>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <TreeSurface>
      <StandardTree
        expandedItems={['visit', 'orders', 'documents']}
        items={VISIT_ITEMS}
        label="Current visit hierarchy"
        rootItemId="visit"
      />
    </TreeSurface>
  ),
};

export const KeyboardNavigation: Story = {
  render: () => (
    <TreeSurface>
      <StandardTree
        expandedItems={['visit', 'orders', 'documents']}
        items={VISIT_ITEMS}
        label="Current visit hierarchy"
        rootItemId="visit"
      />
    </TreeSurface>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const orders = canvas.getByRole('treeitem', { name: /^Orders$/ });

    orders.focus();
    await userEvent.keyboard('{ArrowDown}');
    await userEvent.keyboard('{ArrowDown}');
    await userEvent.keyboard('{ArrowDown}');
    const results = canvas.getByRole('treeitem', { name: /^Results$/ });
    await expect(results).toHaveAttribute('tabindex', '0');
    await userEvent.keyboard('{ArrowRight}');
    await expect(results).toHaveAttribute('aria-expanded', 'true');
    await userEvent.keyboard('{ArrowDown}');
    await expect(canvas.getByRole('treeitem', { name: /Blood results/ })).toHaveAttribute('tabindex', '0');
  },
};

export const IndentedGuides: Story = {
  render: () => (
    <TreeSurface>
      <StandardTree
        className={styles.withGuides}
        expandedItems={['visit', 'orders', 'results', 'documents']}
        items={VISIT_ITEMS}
        label="Current visit hierarchy with indent guides"
        rootItemId="visit"
      />
    </TreeSurface>
  ),
};

export const CustomIndent: Story = {
  render: () => (
    <TreeSurface>
      <StandardTree
        className={styles.withGuides}
        expandedItems={['visit', 'orders', 'results', 'documents']}
        indent={28}
        items={VISIT_ITEMS}
        label="Current visit hierarchy with wide indentation"
        rootItemId="visit"
      />
    </TreeSurface>
  ),
};

export const FileExplorer: Story = {
  render: () => (
    <TreeSurface wide>
      <FileExplorerTree />
    </TreeSurface>
  ),
};

export const OrganizationChart: Story = {
  render: () => (
    <TreeSurface wide>
      <OrganizationTree />
    </TreeSurface>
  ),
};

export const Permissions: Story = {
  render: () => (
    <div className={styles.storyStack}>
      <TreeSurface wide>
        <PermissionsTree />
      </TreeSurface>
      <p className={styles.storyNote}>
        Billing edit is unavailable to this role; the disabled checkbox keeps that permission visible with its consequence.
      </p>
    </div>
  ),
};

export const LongContent: Story = {
  render: () => (
    <TreeSurface wide>
      <StandardTree
        expandedItems={['visit', 'orders', 'results', 'documents']}
        items={{
          visit: { name: 'Current visit · Nguyen Thi Minh Anh · verified patient context', children: ['results', 'documents'] },
          results: { name: 'Results · one critical value requires acknowledgement', children: ['blood-results'] },
          'blood-results': { name: 'Complete blood count · specimen collected 18 Jul 2026 at 08:45 · verified by laboratory' },
          documents: { name: 'Supporting documents and clinician notes for this consultation', children: ['referral'] },
          referral: { name: 'Referral letter · endocrinology follow-up recommended after review' },
        }}
        label="Long clinical context hierarchy"
        rootItemId="visit"
      />
    </TreeSurface>
  ),
};

export const EmptyState: Story = {
  render: () => (
    <div className={styles.frame}>
      <div className={styles.emptyState} role="status">
        No hierarchy is available for this workspace yet.
      </div>
    </div>
  ),
};

export const Mobile320: Story = {
  parameters: { viewport: { defaultViewport: 'mobile1' } },
  render: () => (
    <div className={styles.mobileFrame}>
      <TreeSurface>
        <StandardTree
          expandedItems={['visit', 'orders', 'results']}
          items={VISIT_ITEMS}
          label="Current visit hierarchy on mobile"
          rootItemId="visit"
        />
      </TreeSurface>
    </div>
  ),
};

export const PermissionLimited: Story = {
  render: () => (
    <div className={styles.storyStack}>
      <TreeSurface wide>
        <PermissionsTree />
      </TreeSurface>
      <p className={styles.storyNote} role="note">
        This role can review patient records and results but cannot edit billing permissions.
      </p>
    </div>
  ),
};

export const IconContext: Story = {
  render: () => (
    <TreeSurface>
      <StandardTree
        expandedItems={['visit', 'orders']}
        items={VISIT_ITEMS}
        label="Current visit hierarchy with operational context"
        rootItemId="visit"
      />
      <p className={styles.storyNote}>
        <UserGroupIcon aria-hidden="true" size={16} />
        Use the tree for structure; keep workflow actions and status outside the hierarchy.
      </p>
    </TreeSurface>
  ),
};
