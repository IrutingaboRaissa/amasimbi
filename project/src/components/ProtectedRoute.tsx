import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading, isAgeEligible } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!user) {
    // Redirect to login but save the attempted location
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check age eligibility for specific routes
  if (location.pathname === '/learn' && user.age && !isAgeEligible(user.age)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-purple-900 mb-4">Access Restricted</h1>
          <p className="text-purple-700 mb-6">
            This content is only available for users between 12 and 25 years old.
          </p>
          <p className="text-sm text-purple-600">
            Please update your profile with your correct age to access this content.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
} 