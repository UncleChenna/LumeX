'use client';

import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Instagram, Twitter, Linkedin } from 'lucide-react';
import Link from 'next/link';
import db from '@/db';

// Interface for cursor position
interface CursorPosition {
    x: number;
    y: number;
}

export default function Gallery() {
    const [ activeCategory, setActiveCategory ] = useState<string>( 'all' );
    const [ cursorPosition, setCursorPosition ] = useState<CursorPosition>( { x: 0, y: 0 } );
    const [ cursorHidden, setCursorHidden ] = useState<boolean>( true );

    // State for flippable cards
    const [ hoveredCardId, setHoveredCardId ] = useState<number | null>( null );
    const [ flippedCards, setFlippedCards ] = useState<{ [ key: number ]: boolean }>( {} );

    // Reference for the auto-flipping interval
    const autoFlipIntervalRef = useRef<NodeJS.Timeout | null>( null );

    // Handle card hover
    const handleCardHover = ( id: number, isHovered: boolean ) => {
        setHoveredCardId( isHovered ? id : null );
    };

    // Setup automatic flipping of selected cards to attract attention
    useEffect( () => {
        // Auto-flip cards with IDs 2, 8, and 12 in sequence
        const autoFlipTargets = [ 2, 8, 12 ];
        let currentIndex = 0;

        // Only auto-flip if no card is being hovered
        const startAutoFlip = () => {
            if ( hoveredCardId === null ) {
                // Reset all flips
                const resetFlips = { ...flippedCards };
                autoFlipTargets.forEach( id => {
                    resetFlips[ id ] = false;
                } );

                // Flip the current target
                const targetId = autoFlipTargets[ currentIndex ];
                setFlippedCards( prev => ( {
                    ...resetFlips,
                    [ targetId ]: !prev[ targetId ]
                } ) );

                // Move to next target
                currentIndex = ( currentIndex + 1 ) % autoFlipTargets.length;
            }
        };

        // Set up interval for auto-flipping
        autoFlipIntervalRef.current = setInterval( startAutoFlip, 3000 );

        // Initial flip of first card after a delay
        setTimeout( () => {
            if ( hoveredCardId === null ) {
                setFlippedCards( prev => ( {
                    ...prev,
                    [ autoFlipTargets[ 0 ] ]: true
                } ) );
            }
        }, 1500 );

        return () => {
            if ( autoFlipIntervalRef.current ) {
                clearInterval( autoFlipIntervalRef.current );
            }
        };
    }, [ hoveredCardId, flippedCards ] );

    // Filter gallery items based on active category
    const filteredItems = activeCategory === 'all'
        ? db.galleryItems
        : db.galleryItems.filter( item => item.category === activeCategory );

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
                        <Link href="/" className="flex items-center text-white hover:text-cyan-400 transition-colors">
                            <ArrowLeft size={ 20 } className="mr-2" />
                            <span>Back to Home</span>
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

            {/* Gallery section */ }
            <main>
                <section className="py-12 md:py-20">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-12">
                            <h1 className="text-4xl md:text-5xl font-bold mb-6">
                                Portfolio <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">Gallery</span>
                            </h1>
                            <p className="text-gray-300 max-w-2xl mx-auto">
                                Browse through a collection of my photography and video work.
                                <span className="block mt-2 text-cyan-400 text-sm">Hover over any card to see details</span>
                            </p>
                        </div>

                        {/* Category filters */ }
                        <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-10">
                            { db.categories.map( ( category ) => (
                                <button
                                    key={ category.id }
                                    onClick={ () => setActiveCategory( category.id ) }
                                    className={ `px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === category.id
                                        ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/25'
                                        : 'bg-gray-900 text-gray-400 hover:text-white'
                                        }` }
                                >
                                    { category.name }
                                </button>
                            ) ) }
                        </div>

                        {/* Gallery grid with flippable cards */ }
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            { filteredItems.map( ( item ) => (
                                <div
                                    key={ item.id }
                                    className="opacity-0 animate-fadeIn cursor-pointer group"
                                    style={ {
                                        animationDelay: `${0.1 + ( item.id * 0.05 )}s`,
                                        animationFillMode: 'forwards',
                                        perspective: '1000px',
                                        height: '320px'
                                    } }
                                    onMouseEnter={ () => handleCardHover( item.id, true ) }
                                    onMouseLeave={ () => handleCardHover( item.id, false ) }
                                >
                                    <div
                                        className={ `relative h-full w-full transition-transform duration-700 transform-gpu ${hoveredCardId === item.id || flippedCards[ item.id ] ? 'rotate-y-180' : ''
                                            } ${( item.id === 2 || item.id === 8 || item.id === 12 ) && !hoveredCardId
                                                ? 'animate-pulseGlow'
                                                : ''
                                            }` }
                                        style={ { transformStyle: 'preserve-3d' } }
                                    >
                                        {/* Front of card - Image with link */ }
                                        <Link
                                            href={ `/work/${item.id}` }
                                            className="absolute w-full h-full backface-hidden rounded-lg overflow-hidden shadow-lg shadow-cyan-900/20"
                                            style={ { backfaceVisibility: 'hidden' } }
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-end p-6">
                                                <p className="text-white text-sm font-medium">Hover to see details</p>
                                            </div>
                                            <img
                                                src={ item.image }
                                                alt={ item.alt }
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 flex flex-col justify-end">
                                                <span className="text-cyan-400 text-sm font-medium mb-1">{ db.getCategoryNameById( item.category ) }</span>
                                                <h3 className="text-xl font-bold text-white">{ item.title }</h3>
                                            </div>
                                        </Link>

                                        {/* Back of card - Details with link */ }
                                        <div
                                            className="absolute w-full h-full backface-hidden bg-gray-900 rounded-lg p-6 flex flex-col justify-between transform rotate-y-180 shadow-lg shadow-cyan-900/20"
                                            style={ { backfaceVisibility: 'hidden' } }
                                        >
                                            <div>
                                                <span className="text-cyan-400 text-sm font-medium">{ db.getCategoryNameById( item.category ) }</span>
                                                <h3 className="text-2xl font-bold text-white mt-2">{ item.title }</h3>
                                                <div className="w-12 h-1 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full my-4"></div>
                                                <p className="text-gray-300 text-sm">{ item.description.split( '\n\n' )[ 0 ] }</p>
                                            </div>
                                            <Link
                                                href={ `/work/${item.id}` }
                                                className="text-cyan-400 text-sm hover:text-cyan-300 transition-colors mt-4 self-end"
                                            >
                                                View Project →
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ) ) }
                        </div>

                        {/* Empty state */ }
                        { filteredItems.length === 0 && (
                            <div className="text-center py-20">
                                <p className="text-gray-400 text-xl">No items found in this category.</p>
                                <button
                                    onClick={ () => setActiveCategory( 'all' ) }
                                    className="mt-4 px-6 py-2 bg-gray-900 text-cyan-400 rounded-full hover:bg-gray-800 transition-colors"
                                >
                                    View all works
                                </button>
                            </div>
                        ) }
                    </div>
                </section>
            </main>

            {/* Footer */ }
            <footer className="py-10 bg-gray-900">
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