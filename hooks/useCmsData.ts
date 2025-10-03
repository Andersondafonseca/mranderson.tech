import { useCallback } from 'react';
import { BlogPost, Project, SpeakingTopic, TimelineEvent, Book, BookLandingPageData, NavLink, SocialLinks, SpeakingPageData } from '../types';
import { 
    mockSpeakingPageData, 
    mockSpeakingTopics, 
    mockTimelineEvents, 
    mockBooks, 
    mockBookLandingPages, 
} from '../data/mockData';

/**
 * ===================================================================================
 * NOTE: The direct connection to the WordPress API is failing despite correct
 * CORS headers on the server. This likely indicates a network or firewall issue
 * on the server's hosting environment that is blocking requests.
 *
 * As a temporary workaround to get the site operational, we are using
 * a CORS proxy. This is NOT a permanent solution, as free proxies are unreliable
 * and can go down at any time, as has happened multiple times.
 *
 * The root cause on the mranderson.tech server should be investigated.
 * ===================================================================================
 */

const API_BASE_URL = 'https://mranderson.tech/wp-json';
const PROXY_URL = 'https://corsproxy.io/?'; // Swapped to a new proxy

// --- Helper Functions ---

// A single, reusable fetch function that uses a CORS proxy to bypass network issues.
const fetchWithProxy = async (url: string) => {
    const response = await fetch(`${PROXY_URL}${url}`);

    if (!response.ok) {
        let errorMessage = `Network response was not ok for url: ${url}`;
        try {
            // Try to get a more specific error message from the API response body
            const errorData = await response.json();
            if (errorData.message) {
                errorMessage = `API Error for ${url}: ${errorData.message}`;
            }
        } catch (e) { 
            // Could not parse JSON, stick with the original network error
        }
        throw new Error(errorMessage);
    }
    return response.json();
};

// Helper to strip HTML tags, useful for excerpts
const stripHtml = (html: string) => {
    if (typeof document !== 'undefined') {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        return doc.body.textContent || "";
    }
    // Fallback for non-browser environments
    return html.replace(/<[^>]+>/g, '');
};

// --- Data Mapping Functions ---

const mapToBlogPost = (post: any): BlogPost => {
    const featuredMedia = post._embedded?.['wp:featuredmedia']?.[0];
    const categories = post._embedded?.['wp:term']?.[0];
    return {
        slug: post.slug,
        title: post.title.rendered,
        summary: stripHtml(post.excerpt.rendered),
        imageUrl: featuredMedia?.source_url || 'https://picsum.photos/800/600',
        category: categories?.[0]?.name || 'Uncategorized',
        publishDate: post.date,
        content: post.content.rendered,
    };
};

// Maps data from a 'projects' custom post type endpoint
const mapToProject = (project: any): Project => {
    // Assumes you are using Advanced Custom Fields (ACF) plugin for custom fields
    const acf = project.acf || {};
    return {
        name: project.title.rendered,
        description: acf.description || '',
        link: acf.link || '#',
        icon: acf.icon || 'fas fa-rocket', // Default icon if not set
    };
};


// --- THE HOOK ---

export const useCmsData = () => {

    const fetchFromApi = useCallback(async <T>(endpoint: string, mappingFn: (item: any) => T | null, isSingleItem: boolean = false): Promise<T | T[] | null> => {
        const url = `${API_BASE_URL}${endpoint}`;
        try {
            const data = await fetchWithProxy(url);
            if (isSingleItem) {
                const item = Array.isArray(data) ? data[0] : data;
                return item ? mappingFn(item) : null;
            }
            return Array.isArray(data) ? data.map(mappingFn).filter(Boolean) as T[] : [];
        } catch (error) {
            console.error(`Failed to fetch from ${endpoint}:`, error);
            return isSingleItem ? null : [];
        }
    }, []);

    // --- Public API Functions ---

    // Fetches live blog posts from WordPress
    const getBlogPosts = useCallback(async (): Promise<BlogPost[]> => {
        return (await fetchFromApi('/wp/v2/posts?_embed', mapToBlogPost)) as BlogPost[];
    }, [fetchFromApi]);

    // Fetches a single live blog post from WordPress
    const getPostBySlug = useCallback(async (slug: string): Promise<BlogPost | undefined> => {
        const post = await fetchFromApi(`/wp/v2/posts?slug=${slug}&_embed`, mapToBlogPost, true);
        return post as BlogPost | undefined;
    }, [fetchFromApi]);
    
    // Fetches live projects from WordPress custom post type 'projects'
    const getProjects = useCallback(async (): Promise<Project[]> => {
        // The endpoint will be '/wp/v2/projects' if you register a post type with the slug 'projects'
        return (await fetchFromApi('/wp/v2/projects?acf_format=standard', mapToProject)) as Project[];
    }, [fetchFromApi]);

    // --- Functions using MOCK DATA to prevent errors ---
    // These can be converted to fetch from the API once the endpoints are available in WordPress.
  
    const getSpeakingPageData = useCallback(async (): Promise<SpeakingPageData> => {
        return Promise.resolve(mockSpeakingPageData);
    }, []);

    const getSpeakingTopics = useCallback(async (): Promise<SpeakingTopic[]> => {
        return Promise.resolve(mockSpeakingTopics);
    }, []);

    const getTimelineEvents = useCallback(async (): Promise<TimelineEvent[]> => {
        return Promise.resolve(mockTimelineEvents);
    }, []);
  
    const getBooks = useCallback(async (): Promise<Book[]> => {
        return Promise.resolve(mockBooks);
    }, []);

    const getBookLandingPageData = useCallback(async(slug: string): Promise<BookLandingPageData | null> => {
        const bookData = mockBookLandingPages.find(p => p.slug === slug) || null;
        return Promise.resolve(bookData);
    }, []);

    const getNavLinks = useCallback(async(): Promise<NavLink[]> => {
        // Fetches from the custom '/mranderson-api/v1/menu/primary_api_menu' endpoint.
        const url = `${API_BASE_URL}/mranderson-api/v1/menu/primary_api_menu`;
        try {
            const data = await fetchWithProxy(url);
            if (!Array.isArray(data)) {
                throw new Error('API response for nav links was not an array.');
            }
            return data;
        } catch (error) {
            console.error('Failed to fetch nav links from CMS:', error);
            return []; // Return empty array; the Header component will use its own fallback.
        }
    }, []);

    const getSocialLinks = useCallback(async(): Promise<SocialLinks | null> => {
        // Fetches from the custom '/mranderson-api/v1/social-links' endpoint.
        const url = `${API_BASE_URL}/mranderson-api/v1/social-links`;
        try {
            const data = await fetchWithProxy(url);
            return data;
        } catch (error) {
            console.error('Failed to fetch social links from CMS:', error);
            return null; // Return null; the Footer component will keep its default state.
        }
    }, []);
  
    return { getBlogPosts, getPostBySlug, getProjects, getSpeakingPageData, getSpeakingTopics, getTimelineEvents, getBooks, getBookLandingPageData, getNavLinks, getSocialLinks };
};
