
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCmsData } from '../hooks/useCmsData';
import { BlogPost as BlogPostType } from '../types';
import BlogPostSkeleton from '../components/skeletons/BlogPostSkeleton';

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { getPostBySlug } = useCmsData();

  useEffect(() => {
    const fetchPost = async () => {
      if (slug) {
        setIsLoading(true);
        const data = await getPostBySlug(slug);
        setPost(data || null);
        setIsLoading(false);
      }
    };
    fetchPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  if (isLoading) {
    return <BlogPostSkeleton />;
  }

  if (!post) {
    return (
      <div className="text-center py-20">
        <h1 className="text-4xl font-bold">Artigo não encontrado.</h1>
        <Link to="/blog" className="mt-4 inline-block text-amber-400 hover:underline">Voltar para o Blog</Link>
      </div>
    );
  }

  return (
    <article className="py-16 md:py-24 bg-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-base font-semibold text-amber-400 tracking-wide uppercase">{post.category}</p>
          <h1 className="mt-2 text-3xl md:text-5xl font-extrabold text-slate-100 tracking-tight">
            {post.title}
          </h1>
          <p className="mt-6 text-md text-slate-400">
            Publicado em {new Date(post.publishDate).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
          </p>
        </div>
        
        <div className="mb-12">
            <img src={post.imageUrl} alt={post.title} className="w-full h-auto max-h-[500px] object-cover rounded-2xl shadow-lg" />
        </div>

        <div 
          className="prose prose-lg prose-invert mx-auto"
          dangerouslySetInnerHTML={{ __html: post.content }}
        >
        </div>

        <div className="mt-16 text-center">
            <Link to="/blog" className="inline-block text-amber-400 hover:text-amber-300 font-semibold transition-colors">
                &larr; Voltar para todos os artigos
            </Link>
        </div>
      </div>
    </article>
  );
};

export default BlogPost;
