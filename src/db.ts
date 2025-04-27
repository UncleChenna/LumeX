export interface Category {
  id: string;
  name: string;
}

export interface Service {
  title: string;
  description: string;
  icon: string;
}

export interface GalleryItem {
  id: number;
  title: string;
  category: string;
  image: string;
  alt: string;
  description: string;
  date: string;
  location: string;
  tags: string[];
}

export interface CarouselSlide {
  image: string;
  title: string;
  subtitle: string;
}

// Database object
const db = {
  // Site information
  siteInfo: {
    name: "LumeX",
    tagline: "Capturing moments, telling stories",
    owner: "LumeX Photography",
    copyright: `© ${new Date().getFullYear()} LumeX Photography. All rights reserved.`,
    about: {
      shortDescription: "British photographer LumeX has documented the rapidly changing streets of New York City for over two decades. With an eye for the unusual and an exceptional ability to capture the energy of urban environments, LumeX's distinctive style has earned him recognition worldwide.",
      longDescription: "His work has been featured in leading publications including The New York Times, The Guardian, and Vogue. When not on assignment, LumeX leads street photography workshops, sharing his passion and technical knowledge with aspiring photographers."
    },
    social: {
      instagram: "https://instagram.com",
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com"
    }
  },

  // Navigation links
  navigation: [
    { id: "home", label: "Home", path: "#home" },
    { id: "about", label: "About", path: "#about" },
    { id: "work", label: "Portfolio", path: "#work" },
    { id: "services", label: "Services", path: "#services" },
    { id: "contact", label: "Contact", path: "#contact" }
  ],

  // Categories for filtering work
  categories: [
    { id: "all", name: "All Works" },
    { id: "street", name: "Street" },
    { id: "portrait", name: "Portraits" },
    { id: "urban", name: "Urban" },
    { id: "video", name: "Video" },
    { id: "abstract", name: "Abstract" }
  ],

  // Services offered
  services: [
    {
      title: "Editorial Photography",
      description: "Compelling visual narratives for publications and media outlets.",
      icon: "📰"
    },
    {
      title: "Commercial Work",
      description: "High-impact visuals for brands and advertising campaigns.",
      icon: "🏢"
    },
    {
      title: "Event Coverage",
      description: "Comprehensive documentation of special events and moments.",
      icon: "🎭"
    },
    {
      title: "Video Production",
      description: "Cinematic storytelling from concept to final cut.",
      icon: "🎥"
    }
  ],

  // Carousel slides for homepage
  carouselSlides: [
    {
      image: "/banner.jpg",
      title: "Street Photography",
      subtitle: "Capturing authentic moments in urban environments"
    },
    {
      image: "/banner2.jpg",
      title: "Portrait Sessions",
      subtitle: "Revealing the essence of unique individuals"
    },
    {
      image: "/banner.jpg",
      title: "Cinematic Stories",
      subtitle: "Visual narratives that evoke emotion"
    }
  ],

  // Gallery items / portfolio work
  galleryItems: [
    {
      id: 1,
      title: "Urban Reflections",
      category: "street",
      image: "/placeholder-image.jpg",
      alt: "Urban scene with reflections in puddles",
      description: "This series explores the interplay of light, water, and urban architecture after rainfall in New York City. The reflections create an alternate reality, doubling the city's complexity and revealing new perspectives.\n\nShot during the early morning golden hour, these images capture a quieter moment in the city's restless rhythm. The reflections in rain puddles transform ordinary scenes into surreal compositions, challenging our perception of the urban landscape.",
      date: "February 2025",
      location: "New York City, NY",
      tags: ["Reflection", "Urban", "Street Photography", "New York"]
    },
    {
      id: 2,
      title: "Neon Nights",
      category: "urban",
      image: "/placeholder-image.jpg",
      alt: "City at night with neon lights",
      description: "A visual journey through Tokyo's electric nightscape, where neon lights transform the city into a cyberpunk wonderland. This series captures the energy and visual chaos of urban Japan after dark.\n\nThe photographs explore how artificial lighting shapes our experience of the modern city, creating a dreamlike atmosphere that blurs the line between reality and science fiction. The intense colors and reflections document a unique aspect of contemporary urban culture.",
      date: "January 2025",
      location: "Tokyo, Japan",
      tags: ["Night Photography", "Neon", "Urban", "Tokyo"]
    },
    {
      id: 3,
      title: "Portrait Series",
      category: "portrait",
      image: "/placeholder-image.jpg",
      alt: "Dramatic portrait of a person",
      description: "An ongoing portrait project examining the diverse faces of New York City. Each subject brings their own story, creating a collective narrative about identity, belonging, and the human experience in an urban environment.\n\nUsing natural light and minimal settings, these portraits aim to capture authentic moments that reveal something essential about each subject. The series continues to grow as new personalities and stories are added.",
      date: "March 2025",
      location: "Studio, Brooklyn",
      tags: ["Portrait", "People", "Studio", "Black and White"]
    },
    {
      id: 4,
      title: "Time-lapse: NYC",
      category: "video",
      image: "/placeholder-image.jpg",
      alt: "New York City time-lapse preview",
      description: "A time-lapse exploration of New York City's dynamic rhythm, showing the pulse of the city from dawn to dusk. This project captures the flow of people, traffic, and light through the urban landscape.\n\nBy compressing time, patterns emerge that are invisible to the naked eye, revealing the city as a living organism with its own circulatory system and metabolism.",
      date: "April 2025",
      location: "New York City, NY",
      tags: ["Time-lapse", "Video", "Urban", "New York"]
    },
    {
      id: 5,
      title: "Abandoned Spaces",
      category: "urban",
      image: "/placeholder-image.jpg",
      alt: "Abandoned building interior",
      description: "Documenting forgotten places where nature reclaims what humans have left behind, revealing beauty in decay. This series explores abandoned buildings, factories, and urban spaces that have been left to deteriorate.\n\nThese photographs capture the haunting beauty of places frozen in time, telling stories of industrial decline, changing economic conditions, and the impermanence of human creations.",
      date: "May 2025",
      location: "Various Locations",
      tags: ["Urban Exploration", "Abandoned", "Decay", "Architecture"]
    },
    {
      id: 6,
      title: "Motion Study",
      category: "abstract",
      image: "/placeholder-image.jpg",
      alt: "Abstract motion blur photography",
      description: "An experimental series using long exposure techniques to transform ordinary movements into abstract visual art. This project explores the intersection of time, light, and movement.\n\nBy manipulating shutter speed and camera movement, these images reveal the hidden choreography of everyday actions and objects, creating ethereal compositions from mundane moments.",
      date: "June 2025",
      location: "Studio Work",
      tags: ["Abstract", "Long Exposure", "Motion", "Experimental"]
    },
    {
      id: 7,
      title: "Street Life",
      category: "street",
      image: "/placeholder-image.jpg",
      alt: "People on city streets",
      description: "Candid photography capturing the essence of daily life in the bustling streets of major cities around the world. This ongoing series documents authentic human moments as they unfold.\n\nFrom chance encounters to daily routines, these images celebrate the diversity, energy, and unpredictability of urban life through an unfiltered lens.",
      date: "July 2025",
      location: "Various Cities",
      tags: ["Street", "Documentary", "People", "Urban Life"]
    },
    {
      id: 8,
      title: "Architectural Forms",
      category: "urban",
      image: "/placeholder-image.jpg",
      alt: "Modern architecture",
      description: "A study of contemporary architectural design, focusing on geometric shapes, patterns, and the interplay of light and shadow. This series examines buildings as artistic expressions.\n\nBy isolating specific elements of architecture, these photographs reveal the careful design decisions that shape our built environment and transform functional structures into works of art.",
      date: "August 2025",
      location: "Various Cities",
      tags: ["Architecture", "Geometry", "Design", "Urban"]
    },
    {
      id: 9,
      title: "Portrait Series II",
      category: "portrait",
      image: "/placeholder-image.jpg",
      alt: "Studio portrait",
      description: "Studio portraits exploring character and personality through controlled lighting and minimal backgrounds. This series focuses on the nuanced expressions and features of diverse subjects.\n\nUsing carefully crafted lighting setups, these portraits aim to reveal the inner world of each subject while creating visually striking images with strong compositional elements.",
      date: "September 2025",
      location: "Studio, Brooklyn",
      tags: ["Portrait", "Studio", "Lighting", "Character Study"]
    },
    {
      id: 10,
      title: "Urban Geometry",
      category: "abstract",
      image: "/placeholder-image.jpg",
      alt: "Geometric patterns in urban environment",
      description: "Finding abstract compositions within the geometry of urban environments and architecture. This series transforms familiar city scenes into graphic patterns and shapes.\n\nBy focusing on lines, angles, and intersections, these photographs extract the underlying geometry that forms the visual foundation of our cities, creating abstract compositions from concrete reality.",
      date: "October 2025",
      location: "Various Cities",
      tags: ["Abstract", "Geometry", "Urban", "Patterns"]
    },
    {
      id: 11,
      title: "Street Musicians",
      category: "street",
      image: "/placeholder-image.jpg",
      alt: "Musicians performing on the street",
      description: "Documenting the passionate performers who bring music to our streets and public spaces. This series captures the energy, dedication, and artistry of musicians who perform for the passing crowds.\n\nThese images explore both the performers and their audiences, revealing the intimate connections that form through music in public spaces.",
      date: "November 2025",
      location: "Various Cities",
      tags: ["Music", "Performance", "Street", "Artists"]
    },
    {
      id: 12,
      title: "Documentary: NYC",
      category: "video",
      image: "/placeholder-image.jpg",
      alt: "Documentary film preview",
      description: "A documentary film exploring the hidden stories and unseen corners of New York City. This project goes beyond the tourist attractions to reveal the authentic heart of the city.\n\nThrough interviews with local residents, exploration of overlooked neighborhoods, and documentation of daily rituals, this film presents a multifaceted portrait of an ever-changing metropolis.",
      date: "December 2025",
      location: "New York City, NY",
      tags: ["Documentary", "Film", "New York", "Urban Stories"]
    },
    {
      id: 13,
      title: "Light Studies",
      category: "abstract",
      image: "/placeholder-image.jpg",
      alt: "Experiments with light",
      description: "Experimental photography focused on the behavior and quality of light in various environments. This series treats light itself as the subject rather than the objects it illuminates.\n\nThrough long exposures, reflections, and optical effects, these images capture the ethereal qualities of light as it moves, refracts, and transforms our visual perception of the world.",
      date: "January 2026",
      location: "Various Locations",
      tags: ["Light", "Experimental", "Abstract", "Long Exposure"]
    },
    {
      id: 14,
      title: "Skyline",
      category: "urban",
      image: "/placeholder-image.jpg",
      alt: "City skyline view",
      description: "Panoramic views of iconic city skylines during different times of day and weather conditions. This series documents how the visual character of a city transforms with changing light.\n\nFrom dawn to dusk and through all seasons, these photographs capture the dynamic nature of urban silhouettes and the distinctive architectural personalities of different cities around the world.",
      date: "February 2026",
      location: "Various Cities",
      tags: ["Cityscape", "Urban", "Architecture", "Skyline"]
    },
    {
      id: 15,
      title: "Portrait Series III",
      category: "portrait",
      image: "/placeholder-image.jpg",
      alt: "Environmental portrait",
      description: "Environmental portraits that capture subjects in their natural settings to tell deeper stories about who they are. This series explores the relationship between people and their personal spaces.\n\nBy photographing subjects in locations that are meaningful to them, these portraits reveal how our environments shape our identities and provide visual context for understanding individual stories.",
      date: "March 2026",
      location: "Various Locations",
      tags: ["Portrait", "Environmental", "Identity", "Storytelling"]
    }
  ],

  // Helper functions
  getCategoryNameById: function(categoryId: string): string {
    const category = this.categories.find(cat => cat.id === categoryId);
    return category ? category.name : categoryId;
  },

  getRelatedWorks: function(excludeId: number, count: number = 3, sameCategory?: string): GalleryItem[] {
    let filteredWorks = this.galleryItems.filter(item => item.id !== excludeId);
    
    // If sameCategory is provided, prioritize works in the same category
    if (sameCategory) {
      const categoryWorks = filteredWorks.filter(item => item.category === sameCategory);
      const otherWorks = filteredWorks.filter(item => item.category !== sameCategory);
      
      // Combine them with category works first
      filteredWorks = [...categoryWorks, ...otherWorks];
    }
    
    // Return requested number of works
    return filteredWorks.slice(0, count);
  }
};

export default db;