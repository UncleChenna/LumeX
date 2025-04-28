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
      shortDescription: "Nigerian-born photographer and videographer Favour Iheme has been capturing the vibrant moments of life since moving to Canada to pursue his passion. With a fresh perspective and a creative eye, Favour’s work embodies the spirit of storytelling through powerful visuals, representing the Lumex brand.",
      longDescription: "After relocating to Canada to study photography and videography, Favour Iheme quickly made a name for himself with his dynamic and emotive style. His work reflects a fusion of his Nigerian roots and global influences, creating striking images that connect deeply with viewers. As the creative force behind Lumex, Favour continues to push boundaries, inspiring a new generation of visual storytellers through his art and workshops."
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
    // { id: "street", name: "Street" },
    { id: "portrait", name: "Portraits" },
    // { id: "urban", name: "Urban" },
    { id: "video", name: "Video" },
    { id: "creative-work", name: "Creative work" }
  ],

  // Services offered
  services: [
    {
      title: "Portrait Photography",
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
      image: "/banner/banner.jpg",
      title: "Street Photography",
      subtitle: "Capturing authentic moments in urban environments"
    },
    {
      image: "/banner/banner2.jpg",
      title: "Portrait Sessions",
      subtitle: "Revealing the essence of unique individuals"
    },
    {
      image: "/web_images/image8.jpg",
      title: "Cinematic Stories",
      subtitle: "Visual narratives that evoke emotion"
    }
  ],

  // Gallery items / portfolio work
galleryItems: [
  {
    id: 1,
    title: "Expressive Gaze",
    category: "portrait",
    image: "/web_images/image1.jpg",
    alt: "Close-up portrait capturing intense emotion",
    description:
      "Lumex Photography – Capturing Light, Emotion, and Timeless Moments\n\nAt Lumex Photography, we don’t just take pictures—we craft visual stories with light, passion, and precision. Every photograph is a heartbeat, a fleeting moment suspended in time, waiting to be remembered.",
    date: "February 2025",
    location: "saskatoon saskatchewan canada",
    tags: ["Reflection", "Urban", "Street Photography", "New York"]
  },
  {
    id: 2,
    title: "Neon Expression",
    category: "portrait",
    image: "/web_images/image2.jpg",
    alt: "Portrait with vibrant lighting effects",
    description:
      "Lumex Photography – Capturing Light, Emotion, and Timeless Moments\n\nAt Lumex Photography, we don’t just take pictures—we craft visual stories with light, passion, and precision. Every photograph is a heartbeat, a fleeting moment suspended in time, waiting to be remembered.",
    date: "January 2025",
    location: "saskatoon saskatchewan canada",
    tags: ["Night Photography", "Neon", "Urban", "Tokyo"]
  },
  {
    id: 3,
    title: "Silent Reflection",
    category: "portrait",
    image: "/web_images/image3.jpg",
    alt: "Intimate portrait showing subtle emotions",
    description:
      "Lumex Photography – Capturing Light, Emotion, and Timeless Moments\n\nAt Lumex Photography, we don’t just take pictures—we craft visual stories with light, passion, and precision. Every photograph is a heartbeat, a fleeting moment suspended in time, waiting to be remembered.",
    date: "March 2025",
    location: "saskatoon saskatchewan canada",
    tags: ["Portrait", "People", "Studio", "Black and White"]
  },
  {
    id: 4,
    title: "Timeless Expression",
    category: "portrait",
    image: "/web_images/image4.jpg",
    alt: "A timeless portrait capturing emotion in soft light",
    description:
      "Lumex Photography – Capturing Light, Emotion, and Timeless Moments\n\nAt Lumex Photography, we don’t just take pictures—we craft visual stories with light, passion, and precision. Every photograph is a heartbeat, a fleeting moment suspended in time, waiting to be remembered.",
    date: "April 2025",
    location: "saskatoon saskatchewan canada",
    tags: ["Time-lapse", "Video", "Urban", "New York"]
  },
  {
    id: 5,
    title: "Abandoned Emotion",
    category: "portrait",
    image: "/web_images/image5.jpg",
    alt: "Portrait of a person with a thoughtful, solitary expression",
    description:
      "Lumex Photography – Capturing Light, Emotion, and Timeless Moments\n\nAt Lumex Photography, we don’t just take pictures—we craft visual stories with light, passion, and precision. Every photograph is a heartbeat, a fleeting moment suspended in time, waiting to be remembered.",
    date: "May 2025",
    location: "saskatoon saskatchewan canada",
    tags: ["Urban Exploration", "Abandoned", "Decay", "Architecture"]
  },
  {
    id: 6,
    title: "Motion in Stillness",
    category: "portrait",
    image: "/web_images/image6.jpg",
    alt: "Dynamic portrait capturing movement and stillness",
    description:
      "Lumex Photography – Capturing Light, Emotion, and Timeless Moments\n\nAt Lumex Photography, we don’t just take pictures—we craft visual stories with light, passion, and precision. Every photograph is a heartbeat, a fleeting moment suspended in time, waiting to be remembered.",
    date: "June 2025",
    location: "saskatoon saskatchewan canada",
    tags: ["Creative work", "Long Exposure", "Motion", "Experimental"]
  },
  {
    id: 7,
    title: "Street Persona",
    category: "portrait",
    image: "/web_images/image7.jpg",
    alt: "Casual portrait capturing urban life expression",
    description:
      "Lumex Photography – Capturing Light, Emotion, and Timeless Moments\n\nAt Lumex Photography, we don’t just take pictures—we craft visual stories with light, passion, and precision. Every photograph is a heartbeat, a fleeting moment suspended in time, waiting to be remembered.",
    date: "July 2025",
    location: "saskatoon saskatchewan canada",
    tags: ["Street", "Documentary", "People", "Urban Life"]
  },
  {
    id: 8,
    title: "Architect of Life",
    category: "portrait",
    image: "/web_images/image8.jpg",
    alt: "Artistic portrait with strong character and detail",
    description:
      "Lumex Photography – Capturing Light, Emotion, and Timeless Moments\n\nAt Lumex Photography, we don’t just take pictures—we craft visual stories with light, passion, and precision. Every photograph is a heartbeat, a fleeting moment suspended in time, waiting to be remembered.",
    date: "August 2025",
    location: "saskatoon saskatchewan canada",
    tags: ["Architecture", "Geometry", "Design", "Urban"]
  },
  {
    id: 9,
    title: "Intimate Study",
    category: "portrait",
    image: "/web_images/image9.jpg",
    alt: "Studio portrait displaying raw emotion",
    description:
      "Lumex Photography – Capturing Light, Emotion, and Timeless Moments\n\nAt Lumex Photography, we don’t just take pictures—we craft visual stories with light, passion, and precision. Every photograph is a heartbeat, a fleeting moment suspended in time, waiting to be remembered.",
    date: "September 2025",
    location: "saskatoon saskatchewan canada",
    tags: ["Portrait", "Studio", "Lighting", "Character Study"]
  },
  {
    id: 10,
    title: "Urban Beat",
    category: "portrait",
    image: "/web_images/image10.jpg",
    alt: "Portrait capturing the pulse of urban life in a candid moment",
    description:
      "Lumex Photography – Capturing Light, Emotion, and Timeless Moments\n\nAt Lumex Photography, we don’t just take pictures—we craft visual stories with light, passion, and precision. Every photograph is a heartbeat, a fleeting moment suspended in time, waiting to be remembered.",
    date: "October 2025",
    location: "saskatoon saskatchewan canada",
    tags: ["Creative work", "Geometry", "Urban", "Patterns"]
  },
  {
    id: 11,
    title: "Musical Soul",
    category: "portrait",
    image: "/web_images/image11.jpg",
    alt: "Portrait capturing the passion of a music enthusiast",
    description:
      "Lumex Photography – Capturing Light, Emotion, and Timeless Moments\n\nAt Lumex Photography, we don’t just take pictures—we craft visual stories with light, passion, and precision. Every photograph is a heartbeat, a fleeting moment suspended in time, waiting to be remembered.",
    date: "November 2025",
    location: "saskatoon saskatchewan canada",
    tags: ["Music", "Performance", "Street", "Artists"]
  },
  {
    id: 12,
    title: "Documented Emotion",
    category: "portrait",
    image: "/web_images/image12.jpg",
    alt: "Expressive portrait of a person in dramatic lighting",
    description:
      "Lumex Photography – Capturing Light, Emotion, and Timeless Moments\n\nAt Lumex Photography, we don’t just take pictures—we craft visual stories with light, passion, and precision. Every photograph is a heartbeat, a fleeting moment suspended in time, waiting to be remembered.",
    date: "December 2025",
    location: "saskatoon saskatchewan canada",
    tags: ["Documentary", "Film", "New York", "Urban Stories"]
  },
  {
    id: 13,
    title: "Illuminated Features",
    category: "portrait",
    image: "/web_images/image13.jpg",
    alt: "Portrait highlighting the interplay of light and shadow on a face",
    description:
      "Lumex Photography – Capturing Light, Emotion, and Timeless Moments\n\nAt Lumex Photography, we don’t just take pictures—we craft visual stories with light, passion, and precision. Every photograph is a heartbeat, a fleeting moment suspended in time, waiting to be remembered.",
    date: "January 2026",
    location: "saskatoon saskatchewan canada",
    tags: ["Light", "Experimental", "Creative work", "Long Exposure"]
  },
  {
    id: 14,
    title: "Skyline of Emotions",
    category: "portrait",
    image: "/web_images/image14.jpg",
    alt: "Panoramic portrait capturing expansive human emotion",
    description:
      "Lumex Photography – Capturing Light, Emotion, and Timeless Moments\n\nAt Lumex Photography, we don’t just take pictures—we craft visual stories with light, passion, and precision. Every photograph is a heartbeat, a fleeting moment suspended in time, waiting to be remembered.",
    date: "February 2026",
    location: "saskatoon saskatchewan canada",
    tags: ["Cityscape", "Urban", "Architecture", "Skyline"]
  }
  // Additional items can be added here following the same pattern.
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