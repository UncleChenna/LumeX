
import { Metadata } from 'next';
import WorkDetail from '@/components/work_detail';

type Props = {
    params: { id: string }
}

// Generate metadata for SEO
export async function generateMetadata( { params }: Props ): Promise<Metadata> {
    return {
        title: `LumeX Portfolio - Work #${params.id}`,
        description: 'Detailed view of LumeX\'s photography work',
    };
}

export default function WorkPage( { params }: Props ) {
    return <WorkDetail id={ params.id } />;
}
