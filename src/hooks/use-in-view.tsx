
import { useState, useEffect, useRef, RefObject } from "react";

interface InViewOptions {
  threshold?: number;
  root?: Element | null;
  rootMargin?: string;
  triggerOnce?: boolean;
}

function useInView<T extends Element>(
  options: InViewOptions = {}
): [RefObject<T>, boolean] {
  const { 
    threshold = 0.1, 
    root = null, 
    rootMargin = "0px", 
    triggerOnce = false 
  } = options;
  
  const ref = useRef<T>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isElementInView = entry.isIntersecting;
        setIsInView(isElementInView);

        if (isElementInView && triggerOnce) {
          observer.unobserve(element);
        }
      },
      { threshold, root, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, root, rootMargin, triggerOnce]);

  return [ref, isInView];
}

export default useInView;
