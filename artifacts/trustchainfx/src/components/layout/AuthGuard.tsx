import { useEffect } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/contexts/AuthContext";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  const [location, setLocation] = useLocation();

  useEffect(() => {
    const publicPaths = ["/login", "/signup", "/forgot-password"];
    const isPublicPath = publicPaths.includes(location);

    if (!isAuthenticated && !isPublicPath) {
      setLocation("/login");
    } else if (isAuthenticated && isPublicPath) {
      setLocation("/dashboard");
    }
  }, [isAuthenticated, location, setLocation]);

  return <>{children}</>;
}
