
import Gallery from '@/components/gallery';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Lumex Photography - Gallery',
    description: 'Lumex is led by Favour Iheme, a Nigerian-born photographer and videographer based in Canada, specializing in storytelling through photography and film.',
};


export default function GalleryPage() {
    return <Gallery />;
}