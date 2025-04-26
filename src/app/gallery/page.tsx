
import Gallery from '@/components/gallery';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'LumeX Photography - Gallery',
    description: 'Explore LumeX\'s photography portfolio showcasing street photography, portraits, and more',
};

export default function GalleryPage() {
    return <Gallery />;
}