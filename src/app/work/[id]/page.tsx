import { Metadata } from 'next';
import WorkDetail from '@/components/work_detail';

type Params = Promise<{ id: string }>;

interface WorkPageProps {
    params: Params;
}

// Generate metadata for SEO
export async function generateMetadata( {
    params
}: WorkPageProps ): Promise<Metadata> {
    const { id } = await params;
    return {
        title: `Lumex Portfolio - Work #${id}`,
        description: "Explore the storytelling photography and videography of Favour Iheme, founder of Lumex.",
    };
}

export default async function WorkPage( {
    params
}: WorkPageProps ) {
    const { id } = await params;
    return <WorkDetail id={ id } />;
}
