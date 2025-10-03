

export interface BlogPost {
  slug: string;
  title: string;
  summary: string;
  imageUrl: string;
  category: string;
  publishDate: string;
  content: string; // Markdown or HTML content
}

export interface Project {
  name: string;
  description: string;
  link: string;
  icon: string; // Font Awesome class name
}

export interface SpeakingTopic {
  title:string;
  description: string;
}

export interface SpeakingPageData {
  pageTitle: string;
  pageDescription: string;
  featuredVideoId?: string;
}

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  icon: string; // Font Awesome class name
}

export interface NavLink {
    name: string;
    path: string;
}

export interface SocialLinks {
    linkedin: string;
    instagram: string;
    spotify: string;
    youtube: string;
}

export interface Book {
  slug: string;
  title: string;
  summary: string;
  coverImageUrl: string;
  youtubeVideoId?: string;
}

export interface BookLandingPageData {
  slug: string;
  pageTitle: string;
  pageDescription: string;
  amazonLink: string;
  
  // Section 1: Hero
  heroHeadline: string;
  heroSubheadline: string;
  heroCtaText: string;
  coverImageUrl: string;
  youtubeVideoId?: string; 

  // Section 2: Storytelling
  problemStatement: string;
  empathyStatement: string;

  // Section 3: Author
  authorImageUrl: string;
  authorName: string;
  authorBio: string[];
  authorQuote: string;
  
  // Section 4: Benefits
  benefitsTitle: string;
  benefits: { icon: string; title: string; description: string }[];

  // Section 5: Testimonials
  testimonialsTitle: string;
  testimonials: { quote: string; author: string; role: string }[];

  // Section 6: Offer + Bonus
  offerPrice: string;
  offerCtaText: string;
  bonus: {
      title: string;
      description: string;
  };
  
  // Section 7: Final CTA
  finalCtaTitle: string;
  finalCtaButtonText: string;
  guaranteeText: string;
}