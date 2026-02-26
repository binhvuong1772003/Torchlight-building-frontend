import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div className="flex h-screen item-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-zinc-600 border-t-white"></div>
      </div>
    );
  }
  return user ? <>{children}</> : <Navigate to="/login" replace />;
};
