

import React, { useState, useEffect, useMemo } from 'react';
import Card from '../components/Card';
import { useCmsData } from '../hooks/useCmsData';
import { BlogPost } from '../types';
import CardSkeleton from '../components/skeletons/CardSkeleton';
import FadeIn from '../components/FadeIn';

const Blog: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [isLoading, setIsLoading] = useState(true);
  const { getBlogPosts } = useCmsData();

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      const data = await getBlogPosts();
      setPosts(data);
      setFilteredPosts(data);
      setIsLoading(false);
    };
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const categories = useMemo(() => {
    const allCategories = posts.map(post => post.category);
    return ['Todos', ...Array.from(new Set(allCategories))];
  }, [posts]);

  useEffect(() => {
    if (selectedCategory === 'Todos') {
      setFilteredPosts(posts);
    } else {
      setFilteredPosts(posts.filter(post => post.category === selectedCategory));
    }
  }, [selectedCategory, posts]);

  return (
    <div className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-100">Blog</h1>
            <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto">
              Artigos, insights e reflexões sobre tecnologia, inovação e o futuro dos negócios.
            </p>
          </div>
        </FadeIn>

        {/* Category Filters */}
        <div className="flex justify-center flex-wrap gap-2 mb-12">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-300 ${
                selectedCategory === category
                  ? 'bg-amber-500 text-black shadow'
                  : 'bg-gray-900 text-slate-200 hover:bg-gray-800'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Blog Post Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, index) => (
              <CardSkeleton key={index} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map(post => (
              <FadeIn key={post.slug}>
                <Card
                  imageUrl={post.imageUrl}
                  title={post.title}
                  description={post.summary}
                  linkTo={`/blog/${post.slug}`}
                  linkText="Ler artigo completo"
                  category={post.category}
                />
              </FadeIn>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;