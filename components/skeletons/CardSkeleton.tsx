import React from 'react';

const CardSkeleton: React.FC = () => {
  return (
    <div className="bg-gray-900 rounded-lg shadow-lg overflow-hidden animate-pulse">
      <div className="w-full h-48 bg-gray-800"></div>
      <div className="p-6">
        <div className="h-4 bg-gray-800 rounded w-1/4 mb-4"></div>
        <div className="h-6 bg-gray-800 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-800 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-800 rounded w-5/6 mb-4"></div>
        <div className="h-5 bg-gray-800 rounded w-1/3"></div>
      </div>
    </div>
  );
};

export default CardSkeleton;
