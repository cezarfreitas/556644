import { useState, useEffect, ReactNode } from "react";

interface IconLoaderProps {
  children: ReactNode;
  fallback?: ReactNode;
  className?: string;
}

export default function IconLoader({
  children,
  fallback,
  className,
}: IconLoaderProps) {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Set hydrated after component mounts to prevent SSR/client mismatch
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return fallback ? (
      <div className={className}>{fallback}</div>
    ) : (
      <div className={`${className} opacity-0`} aria-hidden="true" />
    );
  }

  return <>{children}</>;
}
