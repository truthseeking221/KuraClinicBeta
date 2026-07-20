'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { useDemoSession } from './_demo/demo-session';

/** Entry: route to the door or straight into the clinic based on the session. */
export default function Entry() {
  const router = useRouter();
  const { session, hydrated } = useDemoSession();

  useEffect(() => {
    if (!hydrated) return;
    router.replace(session.signedIn ? '/home' : '/door');
  }, [hydrated, session.signedIn, router]);

  return null;
}
