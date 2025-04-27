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
        title: `LumeX Portfolio - Work #${id}`,
        description: 'Detailed view of LumeX\'s photography work',
    };
}

export default async function WorkPage( {
    params
}: WorkPageProps ) {
    const { id } = await params;
    return <WorkDetail id={ id } />;
}