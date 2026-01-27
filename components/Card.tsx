import React, { useMemo, useState } from 'react';
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
  const [imgError, setImgError] = useState(false);

  const showImage = useMemo(() => Boolean(imageUrl) && !imgError, [imageUrl, imgError]);

  return (
    <div className="bg-gray-900 rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/10 hover:-translate-y-2 group">
      <div className="overflow-hidden">
        {showImage ? (
          <img
            className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
            src={imageUrl}
            alt={title}
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-48 bg-gradient-to-br from-gray-900 via-gray-950 to-black border-b border-gray-800 flex items-center justify-center">
            <div className="text-center">
              <div className="text-amber-400 text-3xl">
                <i className="fas fa-book-open"></i>
              </div>
              <div className="mt-2 text-xs text-slate-400">Capa indisponível</div>
            </div>
          </div>
        )}
      </div>

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
