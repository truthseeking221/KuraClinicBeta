'use client';

/**
 * App wiring for the canonical DemoControlPanel: session state in, router
 * navigation out. All visible UI lives in the Storybook-owned panel.
 */

import { useRouter } from 'next/navigation';

import { DemoControlPanel } from '../../features/clinic-prototype';
import { useDemoSession } from './demo-session';

export function DemoControls() {
  const router = useRouter();
  const { reset } = useDemoSession();

  return (
    <DemoControlPanel
      onRestart={() => {
        reset();
        router.push('/');
      }}
    />
  );
}
