import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import { useCmsData } from '../hooks/useCmsData';
import { Book } from '../types';
import CardSkeleton from '../components/skeletons/CardSkeleton';
import FadeIn from '../components/FadeIn';

const Books: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { getBooks } = useCmsData();

  useEffect(() => {
    const fetchBooks = async () => {
      setIsLoading(true);
      const data = await getBooks();
      setBooks(data);
      setIsLoading(false);
    };
    fetchBooks();
  }, [getBooks]);

  return (
    <div className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-100">Livros Publicados</h1>
            <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto">
              Explore insights e estratégias consolidadas em guias práticos para sua carreira e negócios.
            </p>
          </div>
        </FadeIn>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
            {Array.from({ length: 1 }).map((_, index) => (
              <CardSkeleton key={index} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
            {books.map(book => (
              <FadeIn key={book.slug}>
                <Card
                  imageUrl={book.coverImageUrl}
                  title={book.title}
                  description={book.summary}
                  linkTo={`/livros/${book.slug}`}
                  linkText="Ver detalhes"
                />
              </FadeIn>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Books;