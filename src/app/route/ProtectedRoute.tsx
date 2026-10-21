// src/shared/components/ProtectedRoute/ProtectedRoute.tsx
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../shared/context/AuthContext";

export default function ProtectedRoute() {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Cookien är HttpOnly, så vi vet inte om vi är inloggade förrän GET /api/auth/me har svarat
  if (loading) return null;

  if (!user) return <Navigate to="/" replace state={{ from: location }} />;

  return <Outlet />;
}