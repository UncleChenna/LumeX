import Portfolio from '@/components/portfolio';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Lumex Photography',
  description: 'Lumex is led by Favour Iheme, a Nigerian-born photographer and videographer based in Canada, specializing in storytelling through photography and film.',
};


export default function Home() {
  return <Portfolio />;
}
