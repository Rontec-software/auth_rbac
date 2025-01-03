import { redirect } from 'next/navigation';

export default function AuthDefaultPage() {
  redirect('/auth/dashboard');
}
