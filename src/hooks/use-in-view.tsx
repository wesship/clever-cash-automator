
import { useState, useEffect, useRef, RefObject, useCallback } from "react";

interface InViewOptions {
  threshold?: number | number[];
  root?: Element | null;
  rootMargin?: string;
  triggerOnce?: boolean;
  fallbackInView?: boolean;
  skip?: boolean;
  delay?: number;
  onChange?: (inView: boolean) => void;
}

function useInView<T extends Element>(
  options: InViewOptions = {}
): [RefObject<T>, boolean, { entry: IntersectionObserverEntry | null }] {
  const { 
    threshold = 0.1, 
    root = null, 
    rootMargin = "0px", 
    triggerOnce = false,
    fallbackInView = false,
    skip = false,
    delay = 0,
    onChange
  } = options;
  
  const ref = useRef<T>(null);
  const [isInView, setIsInView] = useState<boolean>(fallbackInView);
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);
  const previouslyInView = useRef(fallbackInView);
  const skipObserver = useRef(skip);
  const delayTimeout = useRef<NodeJS.Timeout | null>(null);

  const updateInView = useCallback((inView: boolean, entry: IntersectionObserverEntry) => {
    skipObserver.current = triggerOnce && inView;
    previouslyInView.current = inView;
    
    if (delay && inView !== isInView) {
      if (delayTimeout.current) clearTimeout(delayTimeout.current);
      delayTimeout.current = setTimeout(() => {
        setIsInView(inView);
        setEntry(entry);
        if (onChange) onChange(inView);
      }, delay);
    } else {
      setIsInView(inView);
      setEntry(entry);
      if (onChange) onChange(inView);
    }
  }, [delay, isInView, onChange, triggerOnce]);

  useEffect(() => {
    skipObserver.current = skip;
  }, [skip]);

  useEffect(() => {
    if (!ref.current || skipObserver.current) return;

    let observer: IntersectionObserver;
    
    // Check if IntersectionObserver is available (for SSR/testing environments)
    if (typeof IntersectionObserver === 'undefined') {
      setIsInView(fallbackInView);
      return;
    }

    observer = new IntersectionObserver(
      ([entry]) => {
        const isElementInView = entry.isIntersecting;
        updateInView(isElementInView, entry);

        if (isElementInView && triggerOnce) {
          observer.disconnect();
        }
      },
      { threshold, root, rootMargin }
    );

    const element = ref.current;
    observer.observe(element);

    return () => {
      if (delayTimeout.current) {
        clearTimeout(delayTimeout.current);
      }
      observer.disconnect();
    };
  }, [threshold, root, rootMargin, triggerOnce, updateInView, fallbackInView]);

  return [ref, isInView, { entry }];
}

export default useInView;
