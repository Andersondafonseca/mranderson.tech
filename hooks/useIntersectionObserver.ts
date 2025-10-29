import { useState, useEffect, useRef, RefObject } from 'react';

interface IntersectionObserverOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
}

/**
 * A custom React hook that uses the Intersection Observer API to detect
 * when an element is visible in the viewport.
 * @param options - Configuration options for the IntersectionObserver.
 * @returns A tuple containing a RefObject to attach to the element and a boolean indicating its visibility.
 */
export const useIntersectionObserver = (
  options: IntersectionObserverOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
): [RefObject<HTMLDivElement>, boolean] => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      // Update state when the element intersects with the viewport
      if (entry.isIntersecting) {
        setIsVisible(true);
        // Stop observing the element once it has become visible to prevent re-triggering
        observer.unobserve(entry.target);
      }
    }, options);

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    // Cleanup function to unobserve the element when the component unmounts
    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [options]);

  return [elementRef, isVisible];
};
