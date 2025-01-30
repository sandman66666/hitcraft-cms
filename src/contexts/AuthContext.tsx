import { createContext, useContext, ReactNode } from "react";
import { useDescope, useSession, useUser } from "@descope/react-sdk";
import { AuthContextType, DescopeUser } from "../types";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const descope = useDescope();
  const { isSessionLoading, sessionToken, isAuthenticated } = useSession();
  const { user: descopeUser } = useUser();

  const refresh = async (token?: string) => {
    try {
      await descope.refresh(token);
    } catch (error) {
      console.error("Failed to refresh session:", error);
    }
  };

  const logout = async () => {
    try {
      await descope.logout();
      window.location.href = "/";
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Don't render children until we've attempted to refresh the session
  if (isSessionLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 rounded-full animate-spin border-4 border-transparent border-t-[#8a44c8] border-r-[#df0c39] border-b-[#df0c39] border-l-[#8a44c8]" />
      </div>
    );
  }

  const value: AuthContextType = {
    descope: {
      user: descopeUser as DescopeUser,
      isSessionLoading,
      sessionToken,
      isAuthenticated,
    },
    refresh,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
