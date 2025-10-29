import React, { ReactNode } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

interface FadeInProps {
  children: ReactNode;
  className?: string;
  delay?: string; // Tailwind delay class like 'delay-100', 'delay-200'
}

/**
 * A wrapper component that applies a fade-in and slide-up animation
 * to its children when they scroll into the viewport.
 */
const FadeIn: React.FC<FadeInProps> = ({ children, className = '', delay = '' }) => {
  const [ref, isVisible] = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px', // Trigger animation slightly before it's fully in view
  });

  const transitionClasses = `transition-all duration-700 ease-out ${delay}`;
  const initialStateClasses = 'opacity-0 translate-y-5';
  const finalStateClasses = 'opacity-100 translate-y-0';

  return (
    <div
      ref={ref}
      className={`${className} ${transitionClasses} ${
        isVisible ? finalStateClasses : initialStateClasses
      }`}
    >
      {children}
    </div>
  );
};

export default FadeIn;
