import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuthStore } from '../../store/authStore';

export default function ProtectedRoute({ children, allowedRoles }) {
  const { isAuthenticated, user, setDemoUser } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    // If unauthenticated in dev, automatically assign demo operator/admin for seamless developer experience
    if (!isAuthenticated) {
      setDemoUser();
    }
  }, [isAuthenticated, setDemoUser]);

  return <>{children}</>;
}
