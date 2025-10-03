
import React from 'react';
import { Link } from 'react-router-dom';

interface CardProps {
  imageUrl?: string;
  title: string;
  description: string;
  linkTo: string;
  linkText: string;
  category?: string;
  icon?: string;
}

const Card: React.FC<CardProps> = ({ imageUrl, title, description, linkTo, linkText, category, icon }) => {
  return (
    <div className="bg-gray-900 rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/10 hover:-translate-y-2 group">
      {imageUrl && (
        <div className="overflow-hidden">
            <img className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110" src={imageUrl} alt={title} />
        </div>
      )}
      <div className="p-6">
        <div className="flex items-center mb-2">
            {icon && <i className={`${icon} text-amber-400 mr-3 text-2xl`}></i>}
            {category && <p className="text-sm font-semibold text-amber-500 uppercase tracking-wide">{category}</p>}
        </div>
        <h3 className="text-xl font-bold mb-2 text-slate-100">{title}</h3>
        <p className="text-slate-300 mb-4 text-base leading-relaxed">{description}</p>
        <Link to={linkTo} className="font-semibold text-amber-400 hover:text-amber-300 transition-colors">
          {linkText} <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>
    </div>
  );
};

export default Card;