/**
 * Authentication Context for Material Dashboard
 */

import React, { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check for existing authentication on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("dashboard-user");
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      setIsAuthenticated(true);
    }
    setLoading(false);

    // Load Google OAuth script
    const loadGoogleScript = () => {
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    };

    loadGoogleScript();
  }, []);

  // Simple email/password login (for demo purposes)
  const login = async (email, password) => {
    try {
      // For demo purposes, accept any email/password
      const userData = {
        id: 1,
        email: email,
        name: email.split("@")[0],
        avatar: `https://ui-avatars.com/api/?name=${
          email.split("@")[0]
        }&background=344767&color=fff`,
      };

      localStorage.setItem("dashboard-user", JSON.stringify(userData));
      setUser(userData);
      setIsAuthenticated(true);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Real Google OAuth login
  const loginWithGoogle = async () => {
    try {
      const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
      if (!clientId) {
        throw new Error("Google Client ID not configured");
      }

      // Initialize Google OAuth
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: handleGoogleResponse,
        });

        // Prompt for Google sign-in
        window.google.accounts.id.prompt();
      } else {
        throw new Error("Google OAuth script not loaded");
      }

      return { success: true };
    } catch (error) {
      console.error("Google login error:", error);
      return { success: false, error: error.message };
    }
  };

  // Handle Google OAuth response
  const handleGoogleResponse = async (response) => {
    try {
      // Decode the JWT token
      const base64Url = response.credential.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );

      const userInfo = JSON.parse(jsonPayload);

      const userData = {
        id: userInfo.sub,
        email: userInfo.email,
        name: userInfo.name,
        avatar: userInfo.picture,
        provider: "google",
      };

      localStorage.setItem("dashboard-user", JSON.stringify(userData));
      setUser(userData);
      setIsAuthenticated(true);

      // Redirect to dashboard
      window.location.href = "/marketing-dashboard";
    } catch (error) {
      console.error("Error processing Google response:", error);
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("dashboard-user");
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    loginWithGoogle,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
