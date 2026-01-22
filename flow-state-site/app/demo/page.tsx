import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Demo | YardFlow',
  description: 'Request a demo of YardFlow yard orchestration platform.',
};

// Redirect to contact with demo intent
export default function DemoPage() {
  redirect('/contact?intent=demo');
}
