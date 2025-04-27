'use client';

import { useState, useEffect, useRef } from 'react';
import { Menu, X, Instagram, Twitter, Linkedin, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import db from '@/db';

// Define interface for cursor position
interface CursorPosition {
    x: number;
    y: number;
}

const Portfolio: React.FC = () => {
    // State for UI elements
    const [ scrolled, setScrolled ] = useState<boolean>( false );
    const [ isMenuOpen, setIsMenuOpen ] = useState<boolean>( false );
    const [ cursorPosition, setCursorPosition ] = useState<CursorPosition>( { x: 0, y: 0 } );
    const [ cursorHidden, setCursorHidden ] = useState<boolean>( true );

    // State for carousel
    const [ currentSlide, setCurrentSlide ] = useState<number>( 0 );
    const carouselRef = useRef<HTMLDivElement>( null );
    const maxSlides = db.carouselSlides.length;

    // State for flippable cards
    const [ flippedCards, setFlippedCards ] = useState<{ [ key: number ]: boolean }>( {} );
    const [ hoveredCardId, setHoveredCardId ] = useState<number | null>( null );

    // Reference for the auto-flipping interval
    const autoFlipIntervalRef = useRef<NodeJS.Timeout | null>( null );

    // Handle card hover
    const handleCardHover = ( id: number, isHovered: boolean ) => {
        setHoveredCardId( isHovered ? id : null );
    };

    // Setup automatic flipping of selected cards to attract attention
    useEffect( () => {
        // Auto-flip cards with IDs 2 and 4 in sequence
        const autoFlipTargets = [ 2, 4 ];
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

    // Carousel navigation
    const nextSlide = () => {
        setCurrentSlide( ( prev ) => ( prev + 1 ) % maxSlides );
    };

    const prevSlide = () => {
        setCurrentSlide( ( prev ) => ( prev - 1 + maxSlides ) % maxSlides );
    };

    // Auto-rotate carousel
    useEffect( () => {
        const interval = setInterval( () => {
            nextSlide();
        }, 5000 );
        return () => clearInterval( interval );
    }, [] );

    // Handle scroll for navbar transparency effect
    useEffect( () => {
        const handleScroll = () => {
            setScrolled( window.scrollY > 50 );
        };

        window.addEventListener( 'scroll', handleScroll );
        return () => window.removeEventListener( 'scroll', handleScroll );
    }, [] );

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

            {/* Navigation bar */ }
            <header className={ `fixed w-full z-40 transition-all duration-500 ${scrolled ? 'bg-black/80 backdrop-blur-md py-3' : 'bg-transparent py-6'}` }>
                <div className="container mx-auto px-6 flex justify-between items-center">
                    <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-600 text-transparent bg-clip-text">
                        { db.siteInfo.name }
                    </div>

                    {/* Desktop Navigation */ }
                    <nav className="hidden md:flex space-x-8">
                        { db.navigation.map( item => (
                            <a key={ item.id } href={ item.path } className="hover:text-cyan-400 transition-colors">{ item.label }</a>
                        ) ) }
                    </nav>

                    {/* Mobile menu button */ }
                    <button
                        className="md:hidden text-white focus:outline-none"
                        onClick={ () => setIsMenuOpen( !isMenuOpen ) }
                    >
                        { isMenuOpen ? <X size={ 24 } /> : <Menu size={ 24 } /> }
                    </button>
                </div>

                {/* Mobile menu */ }
                <div className={ `md:hidden absolute w-full bg-black/95 backdrop-blur-lg transition-all duration-500 ease-in-out ${isMenuOpen ? 'max-h-96 py-4' : 'max-h-0 overflow-hidden'}` }>
                    <div className="container mx-auto px-6 flex flex-col space-y-4">
                        { db.navigation.map( item => (
                            <a
                                key={ item.id }
                                href={ item.path }
                                className="py-2 hover:text-cyan-400 transition-colors"
                                onClick={ () => setIsMenuOpen( false ) }
                            >
                                { item.label }
                            </a>
                        ) ) }
                    </div>
                </div>
            </header>
            {/* Hero section with carousel */ }
            <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
                {/* Carousel */ }
                <div className="absolute inset-0 z-0" ref={ carouselRef }>
                    { db.carouselSlides.map( ( slide, index ) => (
                        <div
                            key={ index }
                            className={ `absolute inset-0 transition-opacity duration-1000 ${currentSlide === index ? 'opacity-100' : 'opacity-0'
                                }` }
                        >
                            <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/80 z-10"></div>
                            <img
                                src={ slide.image }
                                alt={ slide.title }
                                className="w-full h-full object-cover object-[center_5%]"
                            />
                        </div>
                    ) ) }

                    {/* Carousel Navigation */ }
                    {/* <button
                        onClick={ prevSlide }
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all duration-300"
                        aria-label="Previous slide"
                    >
                        <ChevronLeft size={ 24 } />
                    </button>
                    <button
                        onClick={ nextSlide }
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all duration-300"
                        aria-label="Next slide"
                    >
                        <ChevronRight size={ 24 } />
                    </button> */}

                    {/* Carousel Indicators */ }
                    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
                        { Array.from( { length: maxSlides } ).map( ( _, index ) => (
                            <button
                                key={ index }
                                onClick={ () => setCurrentSlide( index ) }
                                className={ `w-3 h-3 rounded-full transition-all duration-300 ${currentSlide === index
                                    ? 'bg-cyan-400 w-10'
                                    : 'bg-white/50 hover:bg-white/80'
                                    }` }
                                aria-label={ `Go to slide ${index + 1}` }
                            />
                        ) ) }
                    </div>
                </div>

                {/* Hero Content */ }
                <div className="container mx-auto px-6 z-10 text-center relative">
                    <div className="animate-fadeIn opacity-0" style={ { animationDelay: '0.3s', animationFillMode: 'forwards' } }>
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight animate-slideUp">
                            Capturing <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">Moments</span> in Time
                        </h1>
                        <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-10 text-gray-300 animate-slideUp" style={ { animationDelay: '0.5s' } }>
                            { db.carouselSlides[ currentSlide ].subtitle }
                        </p>
                        <div className="flex flex-col md:flex-row gap-4 justify-center animate-fadeIn" style={ { animationDelay: '0.8s' } }>
                            <a
                                href="#work"
                                className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full text-white font-medium hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 shadow-lg shadow-cyan-500/25"
                            >
                                View Portfolio
                            </a>
                            <a
                                href="#contact"
                                className="px-8 py-3 border border-cyan-400 rounded-full text-cyan-400 font-medium hover:bg-cyan-400/10 transition-all duration-300"
                            >
                                Get in Touch
                            </a>
                        </div>
                    </div>
                </div>
                <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
                    <a href="#about" className="text-white/70 hover:text-white">
                        <ChevronDown size={ 32 } />
                    </a>
                </div>
            </section>

            {/* About section with animation */ }
            <section id="about" className="py-20 md:py-32 bg-gradient-to-b from-black to-gray-900 overflow-hidden">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row gap-12 items-center">
                        <div className="md:w-1/2">
                            <div className="relative opacity-0 animate-slideInLeft" style={ { animationDelay: '0.3s', animationFillMode: 'forwards' } }>
                                <div className="w-full h-96 rounded-lg overflow-hidden">
                                    <img src="/placeholder-image.jpg" alt={ db.siteInfo.name } className="w-full h-full object-cover" />
                                </div>
                                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-lg -z-10"></div>
                            </div>
                        </div>
                        <div className="md:w-1/2 opacity-0 animate-slideInRight" style={ { animationDelay: '0.5s', animationFillMode: 'forwards' } }>
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">
                                About <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">{ db.siteInfo.name }</span>
                            </h2>
                            <p className="text-gray-300 mb-6">
                                { db.siteInfo.about.shortDescription }
                            </p>
                            <p className="text-gray-300 mb-8">
                                { db.siteInfo.about.longDescription }
                            </p>
                            <div className="flex space-x-4">
                                <a href={ db.siteInfo.social.instagram } target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                                    <Instagram size={ 24 } />
                                </a>
                                <a href={ db.siteInfo.social.twitter } target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                                    <Twitter size={ 24 } />
                                </a>
                                <a href={ db.siteInfo.social.linkedin } target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                                    <Linkedin size={ 24 } />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Portfolio section with flippable cards */ }
            <section id="work" className="py-20 md:py-32 bg-black">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16 opacity-0 animate-fadeIn" style={ { animationDelay: '0.3s', animationFillMode: 'forwards' } }>
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">Work</span>
                        </h2>
                        <p className="text-gray-300 max-w-2xl mx-auto">
                            A selection of recent projects showcasing street photography, portraits, and cinematic storytelling.
                            <span className="block mt-2 text-cyan-400 text-sm">Hover over any card to reveal details</span>
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        { db.galleryItems.slice( 0, 6 ).map( ( item, index ) => (
                            <div
                                key={ item.id }
                                className={ `opacity-0 animate-fadeIn cursor-pointer group` }
                                style={ {
                                    animationDelay: `${0.3 + ( index * 0.15 )}s`,
                                    animationFillMode: 'forwards',
                                    perspective: '1000px',
                                    height: '320px'
                                } }
                                onMouseEnter={ () => handleCardHover( item.id, true ) }
                                onMouseLeave={ () => handleCardHover( item.id, false ) }
                            >
                                <div
                                    className={ `relative h-full w-full transition-transform duration-700 transform-gpu ${hoveredCardId === item.id || flippedCards[ item.id ] ? 'rotate-y-180' : ''
                                        } ${( item.id === 2 || item.id === 4 ) && !hoveredCardId ? 'animate-pulseGlow' : ''
                                        }` }
                                    style={ { transformStyle: 'preserve-3d' } }
                                >
                                    {/* Front of card - Image with link - Match gallery implementation */ }
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

                                    {/* Back of card - Details */ }
                                    <div
                                        className="absolute w-full h-full backface-hidden bg-gray-900 rounded-lg p-6 flex flex-col justify-between transform rotate-y-180 shadow-lg shadow-cyan-900/20"
                                        style={ {
                                            backfaceVisibility: 'hidden',
                                            zIndex: hoveredCardId === item.id || flippedCards[ item.id ] ? 1 : 0  // Add z-index control
                                        } }
                                    >
                                        <div>
                                            <span className="text-cyan-400 text-sm font-medium">{ db.getCategoryNameById( item.category ) }</span>
                                            <h3 className="text-2xl font-bold text-white mt-2">{ item.title }</h3>
                                            <div className="w-12 h-1 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full my-4"></div>
                                            <p className="text-gray-300 text-sm">{ item.description.split( '\n\n' )[ 0 ] }</p>
                                        </div>
                                        <div className="self-end"> {/* Wrap in a div to improve clickability */ }
                                            <Link
                                                href={ `/work/${item.id}` }
                                                className="text-cyan-400 text-sm hover:text-cyan-300 transition-colors inline-block"
                                                onClick={ ( e ) => e.stopPropagation() } // Prevent event bubbling
                                            >
                                                View Project →
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) ) }
                    </div>

                    <div className="text-center mt-12 opacity-0 animate-fadeIn" style={ { animationDelay: '0.8s', animationFillMode: 'forwards' } }>
                        <Link
                            href="/gallery"
                            className="px-8 py-3 border border-cyan-400 rounded-full text-cyan-400 font-medium hover:bg-cyan-400/10 transition-all duration-300 inline-flex items-center"
                        >
                            View Full Portfolio
                            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                            </svg>
                        </Link>
                    </div>
                </div>
            </section>
            {/* Services section with animations */ }
            <section id="services" className="py-20 md:py-32 bg-gradient-to-b from-gray-900 to-black overflow-hidden">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16 opacity-0 animate-fadeIn" style={ { animationDelay: '0.3s', animationFillMode: 'forwards' } }>
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            Services <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">Offered</span>
                        </h2>
                        <p className="text-gray-300 max-w-2xl mx-auto">
                            Professional photography and videography services tailored to your specific needs.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        { db.services.map( ( service, index ) => (
                            <div
                                key={ index }
                                className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-lg border border-gray-800 hover:border-cyan-500/50 transition-all duration-300 opacity-0 animate-slideUp"
                                style={ { animationDelay: `${0.3 + ( index * 0.15 )}s`, animationFillMode: 'forwards' } }
                            >
                                <div className="text-4xl mb-4">{ service.icon }</div>
                                <h3 className="text-xl font-bold mb-3">{ service.title }</h3>
                                <p className="text-gray-400">{ service.description }</p>
                            </div>
                        ) ) }
                    </div>
                </div>
            </section>

            {/* Contact section */ }
            <section id="contact" className="py-20 md:py-32 bg-black">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-16 opacity-0 animate-fadeIn" style={ { animationDelay: '0.3s', animationFillMode: 'forwards' } }>
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">
                                Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">Touch</span>
                            </h2>
                            <p className="text-gray-300 max-w-2xl mx-auto">
                                Interested in working together? Let's discuss your project or book a photography session.
                            </p>
                        </div>

                        <div className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-lg border border-gray-800 opacity-0 animate-slideUp" style={ { animationDelay: '0.5s', animationFillMode: 'forwards' } }>
                            <form className="space-y-6" onSubmit={ ( e: React.FormEvent ) => e.preventDefault() }>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white"
                                            placeholder="Your name"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                                        <input
                                            type="email"
                                            id="email"
                                            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white"
                                            placeholder="your@email.com"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium text-gray-400 mb-2">Subject</label>
                                    <input
                                        type="text"
                                        id="subject"
                                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white"
                                        placeholder="Project inquiry"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">Message</label>
                                    <textarea
                                        id="message"
                                        rows={ 4 }
                                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white resize-none"
                                        placeholder="Tell me about your project..."
                                    ></textarea>
                                </div>
                                <div>
                                    <button
                                        type="submit"
                                        className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg text-white font-medium hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 shadow-lg shadow-cyan-500/25"
                                    >
                                        Send Message
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */ }
            <footer className="py-12 bg-gray-900">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="mb-6 md:mb-0">
                            <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-600 text-transparent bg-clip-text mb-2">
                                { db.siteInfo.name }
                            </div>
                            <p className="text-gray-400">{ db.siteInfo.tagline }</p>
                        </div>
                        <div className="flex space-x-8">
                            { db.navigation.map( item => (
                                <a
                                    key={ item.id }
                                    href={ item.path }
                                    className="text-gray-400 hover:text-white transition-colors"
                                >
                                    { item.label }
                                </a>
                            ) ) }
                        </div>
                        <div className="flex space-x-4 mt-6 md:mt-0">
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
                    <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm">
                        { db.siteInfo.copyright }
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Portfolio;