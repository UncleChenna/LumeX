import Portfolio from '@/components/portfolio';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'LumeX Photography',
  description: 'LumeX is a New York-based photographer specializing in street photography and cinematic storytelling',
};

export default function Home() {
  return <Portfolio />;
}
