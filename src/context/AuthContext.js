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

  // Google login (placeholder for now)
  const loginWithGoogle = async (googleUser) => {
    try {
      const userData = {
        id: googleUser.sub || Date.now(),
        email: googleUser.email,
        name: googleUser.name,
        avatar:
          googleUser.picture ||
          `https://ui-avatars.com/api/?name=${googleUser.name}&background=344767&color=fff`,
        provider: "google",
      };

      localStorage.setItem("dashboard-user", JSON.stringify(userData));
      setUser(userData);
      setIsAuthenticated(true);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
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
