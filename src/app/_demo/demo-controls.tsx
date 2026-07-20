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
  const { session, update, reset } = useDemoSession();

  return (
    <DemoControlPanel
      licence={session.licence}
      onJumpHomeScenario={(scenario) =>
        router.push(scenario === 'default' ? '/home' : `/home?scenario=${scenario}`)
      }
      onJumpResultsEpisode={(episode) => router.push(`/results?episode=${episode}`)}
      onLicenceChange={(licence) => update({ licence })}
      onReset={() => {
        reset();
        router.push('/door');
      }}
    />
  );
}
