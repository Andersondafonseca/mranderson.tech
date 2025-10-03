import { useCallback } from 'react';
import { BlogPost, Project, SpeakingTopic, TimelineEvent, Book, BookLandingPageData, NavLink, SocialLinks, SpeakingPageData } from '../types';
import { 
    mockNavLinks, 
    mockSocialLinks, 
    mockBlogPosts, 
    mockProjects, 
    mockSpeakingPageData, 
    mockSpeakingTopics, 
    mockTimelineEvents, 
    mockBooks, 
    mockBookLandingPages 
} from '../data/mockData';

const API_BASE_URL = 'https://mranderson.tech/wp-json/mranderson-api/v1';
const PROXIES = [
    'https://api.allorigins.win/raw?url=',
    'https://thingproxy.freeboard.io/fetch/',
];

/**
 * Fetches data with a fallback proxy system. Returns null on complete failure.
 * Logs warnings to the console for diagnostics without throwing errors.
 */
async function fetchData<T>(endpoint: string): Promise<T | null> {
    const fullUrl = `${API_BASE_URL}${endpoint}`;
    
    // 1. Try direct fetch
    try {
        const response = await fetch(fullUrl);
        if (response.ok) {
            // console.log(`Direct fetch successful for: ${fullUrl}`);
            return await response.json();
        }
        if (response.status !== 404) {
            console.warn(`Direct fetch for ${fullUrl} failed with status: ${response.status} ${response.statusText}`);
        }
    } catch (error) {
        console.warn(`Direct fetch for ${fullUrl} failed. This is likely a CORS issue. Trying proxies...`);
    }

    // 2. Try proxies if direct fetch fails
    for (const proxy of PROXIES) {
        const proxyUrl = `${proxy}${encodeURIComponent(fullUrl)}`;
        try {
            const response = await fetch(proxyUrl);
            if (response.ok) {
                console.log(`Successfully fetched via proxy: ${proxy.split('/')[2]} for ${fullUrl}`);
                return await response.json();
            }
            if (response.status !== 404) {
                 console.warn(`Proxy fetch via ${proxy.split('/')[2]} failed for ${fullUrl}. Status: ${response.status}`);
            }
        } catch (error) {
            console.warn(`Proxy fetch via ${proxy.split('/')[2]} threw an error for ${fullUrl}.`, error);
        }
    }

    // 3. If all attempts fail, return null. The calling function will handle the fallback.
    return null;
}

// Simple mapper for blog posts, assuming a standard-ish WP REST API structure
const mapWpPostToBlogPost = (post: any): BlogPost => ({
    slug: post.slug || '',
    title: post.title?.rendered || 'Post sem título',
    summary: post.excerpt?.rendered.replace(/<p>|<\/p>|\[&hellip;\]/g, '').trim() || '', // Clean up excerpt
    imageUrl: post.fimg_url || post.featured_image_url || `https://picsum.photos/seed/${post.id}/800/600`,
    category: post.categories_names?.[0] || 'Sem categoria',
    publishDate: post.date || new Date().toISOString(),
    content: post.content?.rendered || '',
});

export const useCmsData = () => {
    const getBlogPosts = useCallback(async (): Promise<BlogPost[]> => {
        const data = await fetchData<any[]>('/posts');
        if (data) return data.map(mapWpPostToBlogPost);
        console.warn("CMS: Falha ao buscar posts do blog. Usando dados de fallback.");
        return mockBlogPosts;
    }, []);

    const getPostBySlug = useCallback(async (slug: string): Promise<BlogPost | undefined> => {
        const data = await fetchData<any[]>(`/posts?slug=${slug}`);
        if (data && data.length > 0) return mapWpPostToBlogPost(data[0]);
        console.warn(`CMS: Falha ao buscar post com slug "${slug}". Usando dados de fallback.`);
        return mockBlogPosts.find(p => p.slug === slug);
    }, []);

    const getProjects = useCallback(async (): Promise<Project[]> => {
        const data = await fetchData<Project[]>('/projects');
        if (data) return data;
        console.warn("CMS: Falha ao buscar projetos. Usando dados de fallback.");
        return mockProjects;
    }, []);
  
    const getSpeakingPageData = useCallback(async (): Promise<SpeakingPageData> => {
        const data = await fetchData<SpeakingPageData>('/pages/speaking-data');
        if (data) return data;
        console.warn("CMS: Falha ao buscar dados da página de palestras. Usando dados de fallback.");
        return mockSpeakingPageData;
    }, []);

    const getSpeakingTopics = useCallback(async (): Promise<SpeakingTopic[]> => {
        const data = await fetchData<SpeakingTopic[]>('/speaking-topics');
        if (data) return data;
        console.warn("CMS: Falha ao buscar tópicos de palestras. Usando dados de fallback.");
        return mockSpeakingTopics;
    }, []);

    const getTimelineEvents = useCallback(async (): Promise<TimelineEvent[]> => {
        const data = await fetchData<TimelineEvent[]>('/timeline-events');
        if (data) return data;
        console.warn("CMS: Falha ao buscar eventos da timeline. Usando dados de fallback.");
        return mockTimelineEvents;
    }, []);
  
    const getBooks = useCallback(async (): Promise<Book[]> => {
        const data = await fetchData<Book[]>('/books');
        if (data) return data;
        console.warn("CMS: Falha ao buscar livros. Usando dados de fallback.");
        return mockBooks;
    }, []);

    const getBookLandingPageData = useCallback(async (slug: string): Promise<BookLandingPageData | null> => {
        const data = await fetchData<BookLandingPageData>(`/book/${slug}`);
        if (data) return data;
        console.warn(`CMS: Falha ao buscar dados da página do livro "${slug}". Usando dados de fallback.`);
        return mockBookLandingPages.find(p => p.slug === slug) || null;
    }, []);

    const getNavLinks = useCallback(async (): Promise<NavLink[]> => {
        const data = await fetchData<NavLink[]>('/menu/primary_api_menu');
        if (data && data.length > 0) return data;
        console.warn("CMS: Falha ao buscar links de navegação. Usando dados de fallback.");
        return mockNavLinks;
    }, []);

    const getSocialLinks = useCallback(async (): Promise<SocialLinks> => {
        const data = await fetchData<SocialLinks>('/social-links');
        if (data) return data;
        console.warn("CMS: Falha ao buscar links sociais. Usando dados de fallback.");
        return mockSocialLinks;
    }, []);
  
    return { getBlogPosts, getPostBySlug, getProjects, getSpeakingPageData, getSpeakingTopics, getTimelineEvents, getBooks, getBookLandingPageData, getNavLinks, getSocialLinks };
};
