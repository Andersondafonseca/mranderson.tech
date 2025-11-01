
import { useCallback } from 'react';
import { BlogPost, Project, SpeakingTopic, TimelineEvent, Book, BookLandingPageData, NavLink, SocialLinks, SpeakingPageData, Testimonial, ExclusiveVideo, CommunityQuestion } from '../types';
import { 
    mockNavLinks, 
    mockSocialLinks, 
    mockBlogPosts, 
    mockProjects, 
    mockSpeakingPageData, 
    mockSpeakingTopics, 
    mockTimelineEvents, 
    mockBooks, 
    mockBookLandingPages,
    mockTestimonials
} from '../data/mockData';
import { WP_API_URL } from '../config';

if (!WP_API_URL) {
  console.error("FATAL: WP_API_URL is not set in config.ts.");
}

const API_BASE_URL_CUSTOM = `${WP_API_URL}/wp-json/mranderson-api/v1`;
const API_BASE_URL_WP = `${WP_API_URL}/wp-json/wp/v2`;


// Create a simple in-memory cache to store fetched data
const cache = new Map<string, any>();

/**
 * Fetches data with a caching layer.
 * Returns null on complete failure and logs errors to the console for diagnostics.
 */
async function fetchData<T>(endpoint: string, baseUrl: string): Promise<T | null> {
    if (!WP_API_URL) return null; // Don't attempt to fetch if the URL isn't configured.
    
    const fullUrl = `${baseUrl}${endpoint}`;
    // 1. Check cache first
    if (cache.has(fullUrl)) {
        return Promise.resolve(cache.get(fullUrl) as T);
    }
    
    // 2. Try to fetch the data.
    try {
        const response = await fetch(fullUrl, { cache: 'no-store' });
        if (response.ok) {
            const data = await response.json();
            cache.set(fullUrl, data); // Store in cache on success
            return data;
        }
        console.error(`CMS Fetch Error: Failed to fetch from ${fullUrl}. Status: ${response.status} ${response.statusText}`);
    } catch (error) {
        console.error(`CMS Network Error: An error occurred while fetching ${fullUrl}.`, error);
    }

    // 3. If the fetch fails, return null. The calling function will handle the fallback to mock data.
    return null;
}

// --- Data Mapper Functions ---
// These functions translate the raw data from the WP REST API (with ACF fields)
// into the specific TypeScript types our application components expect.

const mapWpPostToBlogPost = (post: any): BlogPost => ({
    slug: post.slug || '',
    title: post.title?.rendered || 'Post sem título',
    summary: post.excerpt?.rendered.replace(/<p>|<\/p>|\[&hellip;\]/g, '').trim() || '',
    imageUrl: post.fimg_url || `https://picsum.photos/seed/${post.id}/800/600`,
    category: post.categories_names?.[0] || 'Sem categoria',
    publishDate: post.date || new Date().toISOString(),
    content: post.content?.rendered || '',
});

const mapWpProjectToProject = (project: any): Project => ({
    name: project.acf?.name || project.title?.rendered || 'Projeto sem nome',
    description: project.acf?.description || '',
    link: project.acf?.link || '#',
    icon: project.acf?.icon || 'fas fa-rocket',
    imageUrl: project.acf?.imageurl || `https://picsum.photos/seed/${project.id}/800/600`,
});

const mapWpSpeakingTopic = (topic: any): SpeakingTopic => ({
    title: topic.acf?.title || topic.title?.rendered || 'Tópico sem título',
    description: topic.acf?.description || '',
});

const mapWpTimelineEvent = (event: any): TimelineEvent => ({
    year: event.acf?.year || '',
    title: event.acf?.title || event.title?.rendered || 'Evento sem título',
    description: event.acf?.description || '',
    icon: event.acf?.icon || 'fas fa-calendar-alt',
});

const mapWpBookToBook = (book: any): Book => ({
    slug: book.slug || '',
    title: book.acf?.title || book.title?.rendered || 'Livro sem título',
    summary: book.acf?.summary || '',
    coverImageUrl: book.acf?.cover_image_url || `https://picsum.photos/seed/${book.id}/400/600`,
});

const mapWpTestimonialToTestimonial = (testimonial: any): Testimonial => ({
    quote: testimonial.acf?.quote || testimonial.content?.rendered.replace(/<p>|<\/p>/g, '').trim() || '',
    author: testimonial.acf?.author || testimonial.title?.rendered || 'Autor anônimo',
    role: testimonial.acf?.role || '',
});

const mapWpBookToBookLandingPage = (book: any): BookLandingPageData => {
    // --- PARSERS FOR ACF FREE TEXTAREA REPEATER WORKAROUND ---

    // For author_bio (one item per line)
    const authorBioString = book.acf?.author_bio || '';
    const authorBio = authorBioString ? authorBioString.split('\n').map((item: string) => item.trim()).filter(Boolean) : [];

    // For benefits (icon;title;description per line)
    const benefitsString = book.acf?.benefits || '';
    const benefits = benefitsString ? benefitsString.split('\n').map((line: string) => {
        const parts = line.split(';').map(p => p.trim());
        if (parts.length === 3) {
            return { icon: parts[0], title: parts[1], description: parts[2] };
        }
        return null;
    }).filter((item: any): item is { icon: string; title: string; description: string } => item !== null) : [];
    
    // For testimonials (quote;author;role per line)
    const testimonialsString = book.acf?.testimonials || '';
    const testimonials = testimonialsString ? testimonialsString.split('\n').map((line: string) => {
        const parts = line.split(';').map(p => p.trim());
        if (parts.length === 3) {
            return { quote: parts[0], author: parts[1], role: parts[2] };
        }
        return null;
    }).filter((item: any): item is { quote: string; author: string; role: string } => item !== null) : [];


    return {
        slug: book.slug || '',
        pageTitle: book.acf?.page_title || `Livro: ${book.title?.rendered}`,
        pageDescription: book.acf?.page_description || '',
        amazonLink: book.acf?.amazon_link || '#',
        heroHeadline: book.acf?.hero_headline || '',
        heroSubheadline: book.acf?.hero_subheadline || '',
        heroCtaText: book.acf?.hero_cta_text || 'Comprar agora',
        coverImageUrl: book.acf?.cover_image_url || '',
        youtubeVideoId: book.acf?.youtube_video_id || undefined,
        problemStatement: book.acf?.problem_statement || '',
        empathyStatement: book.acf?.empathy_statement || '',
        authorImageUrl: book.acf?.author_image_url || '',
        authorName: book.acf?.author_name || 'Mr. Anderson',
        authorBio: authorBio,
        authorQuote: book.acf?.author_quote || '',
        benefitsTitle: book.acf?.benefits_title || 'O que você vai encontrar',
        benefits: benefits,
        testimonialsTitle: book.acf?.testimonials_title || 'O que estão dizendo',
        testimonials: testimonials,
        offerPrice: book.acf?.offer_price || '',
        offerCtaText: book.acf?.offer_cta_text || 'Garantir meu exemplar',
        bonus: book.acf?.bonus || { title: '', description: '' },
        finalCtaTitle: book.acf?.final_cta_title || 'Pronto para começar?',
        finalCtaButtonText: book.acf?.final_cta_button_text || 'Quero meu livro',
        guaranteeText: book.acf?.guarantee_text || '',
    };
};

const mapWpToExclusiveVideo = (video: any): ExclusiveVideo => ({
    id: video.id,
    title: video.title?.rendered || 'Vídeo sem título',
    description: video.content?.rendered.replace(/<p>|<\/p>/g, '').trim() || '',
    youtubeVideoId: video.acf?.youtube_video_id || '',
    thumbnailUrl: video.fimg_url || `https://picsum.photos/seed/video${video.id}/800/450`,
});

const mapWpToCommunityQuestion = (question: any): CommunityQuestion => ({
    id: question.id,
    question: question.title?.rendered || 'Pergunta sem título',
    author: question.acf?.author_name || 'Membro da Comunidade',
    date: new Date(question.date).toLocaleDateString('pt-BR'),
    status: question.acf?.status || 'pending',
    answer: question.acf?.status === 'answered' ? {
        text: question.acf?.answer_text || '',
        youtubeVideoId: question.acf?.answer_youtube_video_id || undefined,
    } : undefined,
});


export const useCmsData = () => {
    // Fetches from standard WP REST API for posts
    const getBlogPosts = useCallback(async (): Promise<BlogPost[]> => {
        const data = await fetchData<any[]>('/posts', API_BASE_URL_WP);
        if (data) return data.map(mapWpPostToBlogPost);
        console.warn("CMS: Falha ao buscar posts do blog. Usando dados de fallback.");
        return mockBlogPosts;
    }, []);

    const getPostBySlug = useCallback(async (slug: string): Promise<BlogPost | undefined> => {
        const data = await fetchData<any[]>(`/posts?slug=${slug}`, API_BASE_URL_WP);
        if (data && data.length > 0) return mapWpPostToBlogPost(data[0]);
        console.warn(`CMS: Falha ao buscar post com slug "${slug}". Usando dados de fallback.`);
        return mockBlogPosts.find(p => p.slug === slug);
    }, []);

    // Fetches from 'project' Custom Post Type
    const getProjects = useCallback(async (): Promise<Project[]> => {
        const data = await fetchData<any[]>('/projects', API_BASE_URL_WP);
        if (data) return data.map(mapWpProjectToProject);
        console.warn("CMS: Falha ao buscar projetos. Usando dados de fallback.");
        return mockProjects;
    }, []);
  
    // Fetches from custom endpoint for page-specific data
    const getSpeakingPageData = useCallback(async (): Promise<SpeakingPageData> => {
        const data = await fetchData<SpeakingPageData>('/speaking-page-data', API_BASE_URL_CUSTOM);
        if (data && data.pageTitle) return data;
        console.warn("CMS: Falha ao buscar dados da página de palestras. Usando dados de fallback.");
        return mockSpeakingPageData;
    }, []);

    // Fetches from 'speaking_topic' Custom Post Type
    const getSpeakingTopics = useCallback(async (): Promise<SpeakingTopic[]> => {
        const data = await fetchData<any[]>('/speaking_topics', API_BASE_URL_WP);
        if (data) return data.map(mapWpSpeakingTopic);
        console.warn("CMS: Falha ao buscar tópicos de palestras. Usando dados de fallback.");
        return mockSpeakingTopics;
    }, []);

    // Fetches from 'timeline_event' Custom Post Type
    const getTimelineEvents = useCallback(async (): Promise<TimelineEvent[]> => {
        const data = await fetchData<any[]>('/timeline_events', API_BASE_URL_WP);
        if (data) return data.map(mapWpTimelineEvent);
        console.warn("CMS: Falha ao buscar eventos da timeline. Usando dados de fallback.");
        return mockTimelineEvents;
    }, []);
  
    // Fetches from 'book' Custom Post Type
    const getBooks = useCallback(async (): Promise<Book[]> => {
        const data = await fetchData<any[]>('/books', API_BASE_URL_WP);
        if (data) return data.map(mapWpBookToBook);
        console.warn("CMS: Falha ao buscar livros. Usando dados de fallback.");
        return mockBooks;
    }, []);

    // Fetches a single 'book' CPT by slug and maps it to the detailed landing page type
    const getBookLandingPageData = useCallback(async (slug: string): Promise<BookLandingPageData | null> => {
        const data = await fetchData<any[]>(`/books?slug=${slug}`, API_BASE_URL_WP);
        if (data && data.length > 0) return mapWpBookToBookLandingPage(data[0]);
        console.warn(`CMS: Falha ao buscar dados da página do livro "${slug}". Usando dados de fallback.`);
        return mockBookLandingPages.find(p => p.slug === slug) || null;
    }, []);

    // Fetches testimonials from the 'testimonial' Custom Post Type
    const getTestimonials = useCallback(async (): Promise<Testimonial[]> => {
        const data = await fetchData<any[]>('/testimonials', API_BASE_URL_WP);
        if (data) return data.map(mapWpTestimonialToTestimonial);
        console.warn("CMS: Falha ao buscar depoimentos. Usando dados de fallback.");
        return mockTestimonials;
    }, []);

    // Fetches from custom endpoint for the main menu
    const getNavLinks = useCallback(async (): Promise<NavLink[]> => {
        const data = await fetchData<NavLink[]>('/menu/primary_api_menu', API_BASE_URL_CUSTOM);
        if (data && data.length > 0) return data;
        console.warn("CMS: Falha ao buscar links de navegação. Usando dados de fallback.");
        return mockNavLinks;
    }, []);

    // Fetches from custom endpoint for social links (ACF Options Page)
    const getSocialLinks = useCallback(async (): Promise<SocialLinks> => {
        const data = await fetchData<SocialLinks>('/social-links', API_BASE_URL_CUSTOM);
        if (data) return data;
        console.warn("CMS: Falha ao buscar links sociais. Usando dados de fallback.");
        return mockSocialLinks;
    }, []);
        
    // --- New functions for Exclusive Area ---

    const getExclusiveVideos = useCallback(async (): Promise<ExclusiveVideo[]> => {
        const data = await fetchData<any[]>('/exclusive_videos', API_BASE_URL_WP);
        if (data) return data.map(mapWpToExclusiveVideo);
        console.warn("CMS: Falha ao buscar vídeos exclusivos. Usando dados de fallback.");
        return [];
    }, []);

    const getCommunityQuestions = useCallback(async (): Promise<CommunityQuestion[]> => {
        const data = await fetchData<any[]>('/community_questions', API_BASE_URL_WP);
        if (data) return data.map(mapWpToCommunityQuestion);
        console.warn("CMS: Falha ao buscar perguntas da comunidade. Usando dados de fallback.");
        return [];
    }, []);

    // New function for searching blog posts
    const searchBlogPosts = useCallback(async (term: string): Promise<BlogPost[]> => {
        if (!term.trim()) {
            return [];
        }
        const data = await fetchData<any[]>(`/search?term=${encodeURIComponent(term)}`, API_BASE_URL_CUSTOM);
        if (data) {
            return data.map(mapWpPostToBlogPost);
        }
        console.warn(`CMS: Falha na busca por "${term}".`);
        return [];
    }, []);
  
    return { 
        getBlogPosts, 
        getPostBySlug, 
        getProjects, 
        getSpeakingPageData, 
        getSpeakingTopics, 
        getTimelineEvents, 
        getBooks, 
        getBookLandingPageData, 
        getNavLinks, 
        getSocialLinks,
        getTestimonials,
        getExclusiveVideos,
        getCommunityQuestions,
        searchBlogPosts
    };
};