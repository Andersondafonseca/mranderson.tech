import React from 'react';

const BlogPostSkeleton: React.FC = () => {
  return (
    <article className="py-16 md:py-24 bg-black animate-pulse">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="h-5 bg-gray-800 rounded w-1/4 mx-auto mb-4"></div>
          <div className="h-10 bg-gray-800 rounded w-full max-w-2xl mx-auto mb-4"></div>
          <div className="h-8 bg-gray-800 rounded w-3/4 max-w-lg mx-auto mb-6"></div>
          <div className="h-5 bg-gray-800 rounded w-1/3 mx-auto"></div>
        </div>
        
        <div className="mb-12">
            <div className="w-full h-96 bg-gray-800 rounded-2xl"></div>
        </div>

        <div className="prose prose-lg prose-invert mx-auto space-y-4">
          <div className="h-4 bg-gray-800 rounded w-full"></div>
          <div className="h-4 bg-gray-800 rounded w-full"></div>
          <div className="h-4 bg-gray-800 rounded w-11/12"></div>
          <div className="h-4 bg-gray-800 rounded w-full mt-6"></div>
          <div className="h-4 bg-gray-800 rounded w-5/6"></div>
        </div>
      </div>
    </article>
  );
};

export default BlogPostSkeleton;
