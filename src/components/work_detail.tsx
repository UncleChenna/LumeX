'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Calendar, Map, Tag, Share2, Instagram, Twitter, Linkedin } from 'lucide-react';
import db from '@/db';

// Interface for cursor position
interface CursorPosition {
    x: number;
    y: number;
}

export default function WorkDetail( { id }: { id: string } ) {
    const [ work, setWork ] = useState<typeof db.galleryItems[ 0 ] | null>( null );
    const [ loading, setLoading ] = useState<boolean>( true );
    const [ cursorPosition, setCursorPosition ] = useState<CursorPosition>( { x: 0, y: 0 } );
    const [ cursorHidden, setCursorHidden ] = useState<boolean>( true );

    useEffect( () => {
        if ( id ) {
            // Get work from the database
            const numericId = parseInt( id );
            const foundWork = db.galleryItems.find( w => w.id === numericId );
            if ( foundWork ) {
                setWork( foundWork );
            }
            setLoading( false );
        }
    }, [ id ] );

    // Custom cursor effect
    useEffect( () => {
        const handleMouseMove = ( e: MouseEvent ) => {
            setCursorPosition( { x: e.clientX, y: e.clientY } );
            setCursorHidden( false );
        };

        const handleMouseLeave = () => {
            setCursorHidden( true );
        };

        document.addEventListener( 'mousemove', handleMouseMove );
        document.addEventListener( 'mouseleave', handleMouseLeave );

        return () => {
            document.removeEventListener( 'mousemove', handleMouseMove );
            document.removeEventListener( 'mouseleave', handleMouseLeave );
        };
    }, [] );

    // Handle 404 for works not found
    if ( !loading && !work ) {
        return (
            <div className="bg-black text-white min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Work Not Found</h1>
                    <p className="text-gray-400 mb-8">The work you're looking for doesn't exist or has been moved.</p>
                    <Link href="/gallery" className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full text-white">
                        Back to Gallery
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-black text-white min-h-screen font-sans relative">
            {/* Custom cursor */ }
            <div
                className={ `fixed w-8 h-8 rounded-full border-2 border-cyan-400 pointer-events-none z-50 mix-blend-difference transition-opacity duration-300 ${cursorHidden ? 'opacity-0' : 'opacity-100'}` }
                style={ {
                    left: `${cursorPosition.x}px`,
                    top: `${cursorPosition.y}px`,
                    transform: 'translate(-50%, -50%)'
                } }
            >
                <div className="w-2 h-2 bg-cyan-400 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
            </div>

            {/* Header */ }
            <header className="py-6 bg-black/90 backdrop-blur-md">
                <div className="container mx-auto px-6">
                    <div className="flex justify-between items-center">
                        <Link href="/gallery" className="flex items-center text-white hover:text-cyan-400 transition-colors">
                            <ArrowLeft size={ 20 } className="mr-2" />
                            <span>Back to Gallery</span>
                        </Link>
                        <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-600 text-transparent bg-clip-text">
                            { db.siteInfo.name }
                        </div>
                        <div className="flex space-x-4">
                            <a href={ db.siteInfo.social.instagram } target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                                <Instagram size={ 20 } />
                            </a>
                            <a href={ db.siteInfo.social.twitter } target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                                <Twitter size={ 20 } />
                            </a>
                            <a href={ db.siteInfo.social.linkedin } target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                                <Linkedin size={ 20 } />
                            </a>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main content */ }
            <main className="py-12">
                { loading ? (
                    <div className="container mx-auto px-6 flex justify-center">
                        <div className="animate-pulse flex flex-col w-full max-w-4xl">
                            <div className="h-10 bg-gray-700 rounded w-3/4 mb-6"></div>
                            <div className="h-4 bg-gray-700 rounded w-1/4 mb-10"></div>
                            <div className="h-96 bg-gray-800 rounded-lg mb-8"></div>
                            <div className="h-4 bg-gray-700 rounded w-full mb-3"></div>
                            <div className="h-4 bg-gray-700 rounded w-full mb-3"></div>
                            <div className="h-4 bg-gray-700 rounded w-2/3"></div>
                        </div>
                    </div>
                ) : work && (
                    <div className="container mx-auto px-6">
                        <div className="max-w-4xl mx-auto">
                            <h1 className="text-4xl md:text-5xl font-bold mb-3">{ work.title }</h1>
                            <div className="text-cyan-400 mb-8">{ db.getCategoryNameById( work.category ) }</div>

                            {/* Main image */ }
                            <div className="relative rounded-lg overflow-hidden mb-10">
                                <img
                                    src={ work.image }
                                    alt={ work.title }
                                    className="w-full h-auto"
                                />
                                {/* Futuristic overlay effect */ }
                                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black/20 pointer-events-none"></div>
                                <div className="absolute top-4 right-4 w-20 h-20 border border-cyan-400/30 rounded-full mix-blend-overlay pointer-events-none"></div>
                            </div>

                            {/* Metadata */ }
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                                <div className="flex items-center">
                                    <Calendar size={ 20 } className="text-cyan-400 mr-3" />
                                    <div>
                                        <div className="text-sm text-gray-400">Date</div>
                                        <div>{ work.date }</div>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <Map size={ 20 } className="text-cyan-400 mr-3" />
                                    <div>
                                        <div className="text-sm text-gray-400">Location</div>
                                        <div>{ work.location }</div>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <Share2 size={ 20 } className="text-cyan-400 mr-3" />
                                    <div className="flex space-x-3">
                                        <a href={ db.siteInfo.social.instagram } className="hover:text-cyan-400 transition-colors">
                                            <Instagram size={ 18 } />
                                        </a>
                                        <a href={ db.siteInfo.social.twitter } className="hover:text-cyan-400 transition-colors">
                                            <Twitter size={ 18 } />
                                        </a>
                                        <a href={ db.siteInfo.social.linkedin } className="hover:text-cyan-400 transition-colors">
                                            <Linkedin size={ 18 } />
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Description */ }
                            <div className="mb-10">
                                <h2 className="text-2xl font-bold mb-4">About This Work</h2>
                                <div className="text-gray-300 space-y-4">
                                    { work.description.split( '\n\n' ).map( ( paragraph: string, idx: number ) => (
                                        <p key={ idx }>{ paragraph }</p>
                                    ) ) }
                                </div>
                            </div>

                            {/* Tags */ }
                            <div>
                                <div className="flex items-center mb-4">
                                    <Tag size={ 18 } className="text-cyan-400 mr-2" />
                                    <h2 className="text-lg font-bold">Tags</h2>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    { work.tags.map( ( tag: string, idx: number ) => (
                                        <span key={ idx } className="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300">
                                            { tag }
                                        </span>
                                    ) ) }
                                </div>
                            </div>
                        </div>
                    </div>
                ) }
            </main>

            {/* Related works */ }
            <section className="py-12 bg-gray-900">
                <div className="container mx-auto px-6">
                    <h2 className="text-2xl font-bold mb-8">More Works</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        { work && db.getRelatedWorks( work.id, 3, work.category )
                            .map( relatedWork => (
                                <Link
                                    href={ `/work/${relatedWork.id}` }
                                    key={ relatedWork.id }
                                    className="group relative overflow-hidden rounded-lg bg-gray-800 hover:transform hover:scale-[1.02] transition-all duration-500"
                                >
                                    <div className="h-60 overflow-hidden">
                                        <img
                                            src={ relatedWork.image }
                                            alt={ relatedWork.title }
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6">
                                        <span className="text-cyan-400 text-sm font-medium mb-2">{ db.getCategoryNameById( relatedWork.category ) }</span>
                                        <h3 className="text-xl font-bold text-white mb-2">{ relatedWork.title }</h3>
                                    </div>
                                </Link>
                            ) ) }
                    </div>
                </div>
            </section>

            {/* Footer */ }
            <footer className="py-10 bg-black">
                <div className="container mx-auto px-6 text-center">
                    <div className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-600 text-transparent bg-clip-text mb-3">
                        { db.siteInfo.name }
                    </div>
                    <p className="text-gray-400 mb-6">{ db.siteInfo.tagline }</p>
                    <div className="border-t border-gray-800 pt-6 text-gray-500 text-sm">
                        { db.siteInfo.copyright }
                    </div>
                </div>
            </footer>
        </div>
    );
}