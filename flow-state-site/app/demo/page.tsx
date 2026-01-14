import { redirect } from 'next/navigation';

// Redirect to contact with demo intent
export default function DemoPage() {
  redirect('/contact?intent=demo');
}
