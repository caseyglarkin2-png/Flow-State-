import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Start Your Map | YardFlow',
  description: 'Begin mapping your yard network with YardFlow.',
};

// Redirect to yardbuilder for now - this is the "Start Your Map" flow
export default function StartYourMapPage() {
  redirect('/yardbuilder');
}
