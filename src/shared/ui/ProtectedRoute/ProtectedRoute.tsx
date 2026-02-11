import { useAuth } from "@/features/auth";
import React from "react";
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

export interface ProtectedRouteProps {
  children: ReactNode;
  redirectPath?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  redirectPath = "/login",
}) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div style={{ textAlign: "center", padding: "4rem 0" }}>
        <div style={{ color: "#666" }}>Загрузка...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
};
