// types.ts
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
  imageUrl?: string;
}

export interface SpeakingTopic {
  title:string;
  description: string;
}

export interface SpeakingPageData {
  pageTitle: string;
  pageDescription: string;
  featuredVideoId?: string;
  featuredImageUrl?: string;
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

export interface DnsRecord {
  entry: string;
  type: 'A' | 'CNAME' | 'NS' | 'SOA' | 'TXT';
  content: string | string[];
}

// New Types from Media Kit
export interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

export interface CredentialItem {
    title: string;
    items: string[];
}

export interface MentorshipInfo {
    title: string;
    description: string;
    topics: string[];
    result: string;
}

// New type for Authentication
export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'customer';
  whatsapp?: string;
  googleId?: string;
  picture?: string;
  token?: string; // Auth token from backend
  questionnaireResults?: Record<string, number>; // e.g. { 'porta-1-infra': 25 }
}

// New types for Questionnaire
export interface QuestionnaireResult {
  minScore: number;
  maxScore: number;
  title: string;
  description: string;
  icon: string;
}

export interface QuestionnaireSection {
  title: string;
  questions: string[];
}

export interface Questionnaire {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  sections: QuestionnaireSection[];
  results: QuestionnaireResult[];
}

// New types for exclusive area
export interface ExclusiveVideo {
    id: number;
    title: string;
    description: string;
    youtubeVideoId: string;
    thumbnailUrl: string; // From featured image
}

export interface CommunityQuestion {
    id: number;
    question: string;
    author: string;
    date: string;
    status: 'answered' | 'pending';
    answer?: {
        text: string;
        youtubeVideoId?: string;
    }
}