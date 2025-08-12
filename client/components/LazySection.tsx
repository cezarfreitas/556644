import { useState, useRef, useEffect, ReactNode } from "react";

interface LazySectionProps {
  children: ReactNode;
  className?: string;
  rootMargin?: string;
  threshold?: number;
  fallback?: ReactNode;
}

export default function LazySection({
  children,
  className = "",
  rootMargin = "100px",
  threshold = 0.1,
  fallback,
}: LazySectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin,
        threshold,
      },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [rootMargin, threshold]);

  return (
    <div ref={sectionRef} className={className}>
      {isVisible ? children : fallback || <div className="h-96 bg-gray-50" />}
    </div>
  );
}
