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
        description: "Lumex showcases the photography and cinematic videography of Favour Iheme, a talented Nigerian-born artist now based in Canada. Specializing in storytelling, portraiture, and urban landscapes, Favour captures powerful moments with creativity and passion."

    };
}

export default async function WorkPage( {
    params
}: WorkPageProps ) {
    const { id } = await params;
    return <WorkDetail id={ id } />;
}
