import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Security | YardFlow',
  description: 'Security and compliance information for YardFlow platform.',
};

export default function SecurityRedirect() {
  redirect('/resources/procurement');
}
