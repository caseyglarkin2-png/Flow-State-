import { redirect } from 'next/navigation';

// Redirect to yardbuilder for now - this is the "Start Your Map" flow
export default function StartYourMapPage() {
  redirect('/yardbuilder');
}
