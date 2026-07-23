import { redirect } from 'next/navigation';

/** Kept so existing `/earnings` links survive the rename to Balance. */
export default function Page() {
  redirect('/balance');
}
