'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/hooks/useUser';

interface ProtectedRouteProps {
  children: React.ReactNode;
  fallbackRoute?: string;
}

export default function ProtectedRoute({ 
  children, 
  fallbackRoute = '/' 
}: ProtectedRouteProps) {
  const router = useRouter();
  const { user, isLoading } = useUser();

  useEffect(() => {
    // Only redirect after loading is complete AND user is definitely null
    // This prevents premature redirects during session restoration
    if (!isLoading && !user) {
      router.replace(fallbackRoute);
    }
  }, [isLoading, user, router, fallbackRoute]);

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render children if user is not authenticated
  // The redirect will happen in the useEffect above
  if (!user) {
    return null;
  }

  return <>{children}</>;
}