'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Calendar, Map, Tag, Share2, Instagram, Twitter, Linkedin } from 'lucide-react';

// Define interfaces for our data
interface WorkItem {
    id: string;
    title: string;
    category: string;
    image: string;
    date: string;
    location: string;
    description: string;
    tags: string[];
}

interface CursorPosition {
    x: number;
    y: number;
}

// In a real application, this data would come from a CMS or API
const works: WorkItem[] = [
    {
        id: '1',
        title: 'Urban Reflections',
        category: 'Street Photography',
        image: '/placeholder-image.jpg',
        date: 'February 2025',
        location: 'New York City, NY',
        description: `This series explores the interplay of light, water, and urban architecture after rainfall in New York City. The reflections create an alternate reality, doubling the city's complexity and revealing new perspectives.
    
    Shot during the early morning golden hour, these images capture a quieter moment in the city's restless rhythm. The reflections in rain puddles transform ordinary scenes into surreal compositions, challenging our perception of the urban landscape.`,
        tags: [ 'Reflection', 'Urban', 'Street Photography', 'New York' ]
    },
    {
        id: '2',
        title: 'Neon Nights',
        category: 'Cityscape',
        image: '/placeholder-image.jpg',
        date: 'January 2025',
        location: 'Tokyo, Japan',
        description: `A visual journey through Tokyo's electric nightscape, where neon lights transform the city into a cyberpunk wonderland. This series captures the energy and visual chaos of urban Japan after dark.
    
    The photographs explore how artificial lighting shapes our experience of the modern city, creating a dreamlike atmosphere that blurs the line between reality and science fiction. The intense colors and reflections document a unique aspect of contemporary urban culture.`,
        tags: [ 'Night Photography', 'Neon', 'Urban', 'Tokyo' ]
    },
    {
        id: '3',
        title: 'Portrait Series',
        category: 'Portrait',
        image: '/placeholder-image.jpg',
        date: 'March 2025',
        location: 'Studio, Brooklyn',
        description: `An ongoing portrait project examining the diverse faces of New York City. Each subject brings their own story, creating a collective narrative about identity, belonging, and the human experience in an urban environment.
    
    Using natural light and minimal settings, these portraits aim to capture authentic moments that reveal something essential about each subject. The series continues to grow as new personalities and stories are added.`,
        tags: [ 'Portrait', 'People', 'Studio', 'Black and White' ]
    },
    {
        id: '4',
        title: 'Time-lapse: NYC',
        category: 'Video',
        image: '/placeholder-image.jpg',
        date: 'April 2025',
        location: 'New York City, NY',
        description: `A time-lapse exploration of New York City's dynamic rhythm, showing the pulse of the city from dawn to dusk. This project captures the flow of people, traffic, and light through the urban landscape.
    
    By compressing time, patterns emerge that are invisible to the naked eye, revealing the city as a living organism with its own circulatory system and metabolism.`,
        tags: [ 'Time-lapse', 'Video', 'Urban', 'New York' ]
    },
    {
        id: '5',
        title: 'Abandoned Spaces',
        category: 'Urban Exploration',
        image: '/placeholder-image.jpg',
        date: 'May 2025',
        location: 'Various Locations',
        description: `Documenting forgotten places where nature reclaims what humans have left behind, revealing beauty in decay. This series explores abandoned buildings, factories, and urban spaces that have been left to deteriorate.
    
    These photographs capture the haunting beauty of places frozen in time, telling stories of industrial decline, changing economic conditions, and the impermanence of human creations.`,
        tags: [ 'Urban Exploration', 'Abandoned', 'Decay', 'Architecture' ]
    },
    {
        id: '6',
        title: 'Motion Study',
        category: 'Abstract',
        image: '/placeholder-image.jpg',
        date: 'June 2025',
        location: 'Studio Work',
        description: `An experimental series using long exposure techniques to transform ordinary movements into abstract visual art. This project explores the intersection of time, light, and movement.
    
    By manipulating shutter speed and camera movement, these images reveal the hidden choreography of everyday actions and objects, creating ethereal compositions from mundane moments.`,
        tags: [ 'Abstract', 'Long Exposure', 'Motion', 'Experimental' ]
    },
    {
        id: '7',
        title: 'Street Life',
        category: 'Street',
        image: '/placeholder-image.jpg',
        date: 'July 2025',
        location: 'Various Cities',
        description: `Candid photography capturing the essence of daily life in the bustling streets of major cities around the world. This ongoing series documents authentic human moments as they unfold.
    
    From chance encounters to daily routines, these images celebrate the diversity, energy, and unpredictability of urban life through an unfiltered lens.`,
        tags: [ 'Street', 'Documentary', 'People', 'Urban Life' ]
    },
    {
        id: '8',
        title: 'Architectural Forms',
        category: 'Urban',
        image: '/placeholder-image.jpg',
        date: 'August 2025',
        location: 'Various Cities',
        description: `A study of contemporary architectural design, focusing on geometric shapes, patterns, and the interplay of light and shadow. This series examines buildings as artistic expressions.
    
    By isolating specific elements of architecture, these photographs reveal the careful design decisions that shape our built environment and transform functional structures into works of art.`,
        tags: [ 'Architecture', 'Geometry', 'Design', 'Urban' ]
    },
    {
        id: '9',
        title: 'Portrait Series II',
        category: 'Portrait',
        image: '/placeholder-image.jpg',
        date: 'September 2025',
        location: 'Studio, Brooklyn',
        description: `Studio portraits exploring character and personality through controlled lighting and minimal backgrounds. This series focuses on the nuanced expressions and features of diverse subjects.
    
    Using carefully crafted lighting setups, these portraits aim to reveal the inner world of each subject while creating visually striking images with strong compositional elements.`,
        tags: [ 'Portrait', 'Studio', 'Lighting', 'Character Study' ]
    },
    {
        id: '10',
        title: 'Urban Geometry',
        category: 'Abstract',
        image: '/placeholder-image.jpg',
        date: 'October 2025',
        location: 'Various Cities',
        description: `Finding abstract compositions within the geometry of urban environments and architecture. This series transforms familiar city scenes into graphic patterns and shapes.
    
    By focusing on lines, angles, and intersections, these photographs extract the underlying geometry that forms the visual foundation of our cities, creating abstract compositions from concrete reality.`,
        tags: [ 'Abstract', 'Geometry', 'Urban', 'Patterns' ]
    },
    {
        id: '11',
        title: 'Street Musicians',
        category: 'Street',
        image: '/placeholder-image.jpg',
        date: 'November 2025',
        location: 'Various Cities',
        description: `Documenting the passionate performers who bring music to our streets and public spaces. This series captures the energy, dedication, and artistry of musicians who perform for the passing crowds.
    
    These images explore both the performers and their audiences, revealing the intimate connections that form through music in public spaces.`,
        tags: [ 'Music', 'Performance', 'Street', 'Artists' ]
    },
    {
        id: '12',
        title: 'Documentary: NYC',
        category: 'Video',
        image: '/placeholder-image.jpg',
        date: 'December 2025',
        location: 'New York City, NY',
        description: `A documentary film exploring the hidden stories and unseen corners of New York City. This project goes beyond the tourist attractions to reveal the authentic heart of the city.
    
    Through interviews with local residents, exploration of overlooked neighborhoods, and documentation of daily rituals, this film presents a multifaceted portrait of an ever-changing metropolis.`,
        tags: [ 'Documentary', 'Film', 'New York', 'Urban Stories' ]
    },
    {
        id: '13',
        title: 'Light Studies',
        category: 'Abstract',
        image: '/placeholder-image.jpg',
        date: 'January 2026',
        location: 'Various Locations',
        description: `Experimental photography focused on the behavior and quality of light in various environments. This series treats light itself as the subject rather than the objects it illuminates.
    
    Through long exposures, reflections, and optical effects, these images capture the ethereal qualities of light as it moves, refracts, and transforms our visual perception of the world.`,
        tags: [ 'Light', 'Experimental', 'Abstract', 'Long Exposure' ]
    },
    {
        id: '14',
        title: 'Skyline',
        category: 'Urban',
        image: '/placeholder-image.jpg',
        date: 'February 2026',
        location: 'Various Cities',
        description: `Panoramic views of iconic city skylines during different times of day and weather conditions. This series documents how the visual character of a city transforms with changing light.
    
    From dawn to dusk and through all seasons, these photographs capture the dynamic nature of urban silhouettes and the distinctive architectural personalities of different cities around the world.`,
        tags: [ 'Cityscape', 'Urban', 'Architecture', 'Skyline' ]
    },
    {
        id: '15',
        title: 'Portrait Series III',
        category: 'Portrait',
        image: '/placeholder-image.jpg',
        date: 'March 2026',
        location: 'Various Locations',
        description: `Environmental portraits that capture subjects in their natural settings to tell deeper stories about who they are. This series explores the relationship between people and their personal spaces.
    
    By photographing subjects in locations that are meaningful to them, these portraits reveal how our environments shape our identities and provide visual context for understanding individual stories.`,
        tags: [ 'Portrait', 'Environmental', 'Identity', 'Storytelling' ]
    }
];

export default function WorkDetail( { id }: { id: string } ) {
    const [ work, setWork ] = useState<WorkItem | null>( null );
    const [ loading, setLoading ] = useState<boolean>( true );
    const [ cursorPosition, setCursorPosition ] = useState<CursorPosition>( { x: 0, y: 0 } );
    const [ cursorHidden, setCursorHidden ] = useState<boolean>( true );

    useEffect( () => {
        if ( id ) {
            // In a real app, this would be an API call
            const foundWork = works.find( w => w.id === id );
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
                            LumeX
                        </div>
                        <div className="flex space-x-4">
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                                <Instagram size={ 20 } />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                                <Twitter size={ 20 } />
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
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
                            <div className="text-cyan-400 mb-8">{ work.category }</div>

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
                                        <a href="#" className="hover:text-cyan-400 transition-colors">
                                            <Instagram size={ 18 } />
                                        </a>
                                        <a href="#" className="hover:text-cyan-400 transition-colors">
                                            <Twitter size={ 18 } />
                                        </a>
                                        <a href="#" className="hover:text-cyan-400 transition-colors">
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

            {/* Related works - would normally be dynamically generated */ }
            <section className="py-12 bg-gray-900">
                <div className="container mx-auto px-6">
                    <h2 className="text-2xl font-bold mb-8">More Works</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        { works
                            .filter( w => w.id !== id )
                            .slice( 0, 3 ) // Limit to 3 items
                            .map( work => (
                                <Link
                                    href={ `/work/${work.id}` }
                                    key={ work.id }
                                    className="group relative overflow-hidden rounded-lg bg-gray-800 hover:transform hover:scale-[1.02] transition-all duration-500"
                                >
                                    <div className="h-60 overflow-hidden">
                                        <img
                                            src={ work.image }
                                            alt={ work.title }
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6">
                                        <span className="text-cyan-400 text-sm font-medium mb-2">{ work.category }</span>
                                        <h3 className="text-xl font-bold text-white mb-2">{ work.title }</h3>
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
                        LumeX
                    </div>
                    <p className="text-gray-400 mb-6">Capturing moments, telling stories</p>
                    <div className="border-t border-gray-800 pt-6 text-gray-500 text-sm">
                        © { new Date().getFullYear() } LumeX Photography. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
}