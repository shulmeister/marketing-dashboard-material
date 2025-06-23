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

    // Check for OAuth redirect (hash contains access_token or id_token)
    const hash = window.location.hash;
    if (hash && (hash.includes("access_token") || hash.includes("id_token"))) {
      console.log("Processing OAuth redirect");

      try {
        const urlParams = new URLSearchParams(hash.substring(1));
        const idToken = urlParams.get("id_token");

        if (idToken) {
          handleGoogleTokenResponse(idToken);
          // Clean up the URL
          window.history.replaceState({}, document.title, window.location.pathname);
        }
      } catch (error) {
        console.error("Error processing OAuth redirect:", error);
      }
    }

    setLoading(false);

    // Load Google OAuth script
    const loadGoogleScript = () => {
      // Check if script is already loaded
      if (window.google) {
        console.log("Google script already loaded");
        return;
      }

      // Check if script element already exists
      const existingScript = document.querySelector(
        'script[src="https://accounts.google.com/gsi/client"]'
      );
      if (existingScript) {
        console.log("Google script element already exists");
        return;
      }

      console.log("Loading Google OAuth script...");
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;

      script.onload = () => {
        console.log("Google OAuth script loaded successfully");
      };

      script.onerror = (error) => {
        console.error("Failed to load Google OAuth script:", error);
      };

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
      console.log("Google Client ID:", clientId ? "Set" : "Not set");

      if (!clientId) {
        console.error("Google Client ID not configured");
        return { success: false, error: "Google Client ID not configured" };
      }

      // Direct OAuth popup approach
      const oauth2Endpoint = "https://accounts.google.com/o/oauth2/v2/auth";
      const redirectUri = window.location.origin;

      const params = new URLSearchParams({
        client_id: clientId,
        redirect_uri: redirectUri,
        response_type: "token id_token",
        scope: "openid profile email",
        include_granted_scopes: "true",
        state: Math.random().toString(36).substring(7),
        nonce: Math.random().toString(36).substring(7),
      });

      const authUrl = `${oauth2Endpoint}?${params.toString()}`;
      console.log("Opening Google OAuth popup:", authUrl);

      // Open popup window
      const popup = window.open(
        authUrl,
        "google-oauth",
        "width=500,height=600,scrollbars=yes,resizable=yes"
      );

      if (!popup) {
        return {
          success: false,
          error: "Popup blocked. Please allow popups for this site and try again.",
        };
      }

      // Monitor popup for OAuth response
      return new Promise((resolve) => {
        const checkPopup = setInterval(() => {
          try {
            if (popup.closed) {
              clearInterval(checkPopup);
              resolve({ success: false, error: "Authentication cancelled" });
              return;
            }

            // Check if popup URL contains the response
            const popupUrl = popup.location.href;
            if (popupUrl.includes("#access_token") || popupUrl.includes("#id_token")) {
              clearInterval(checkPopup);

              // Extract the hash from the URL
              const urlParams = new URLSearchParams(popupUrl.split("#")[1]);
              const idToken = urlParams.get("id_token");

              popup.close();

              if (idToken) {
                // Process the ID token
                handleGoogleTokenResponse(idToken);
                resolve({ success: true });
              } else {
                resolve({ success: false, error: "No ID token received" });
              }
            }
          } catch (e) {
            // Ignore cross-origin errors while popup is on Google's domain
          }
        }, 1000);

        // Timeout after 5 minutes
        setTimeout(() => {
          clearInterval(checkPopup);
          if (!popup.closed) {
            popup.close();
          }
          resolve({ success: false, error: "Authentication timeout" });
        }, 300000);
      });
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

  // Handle Google token response from popup
  const handleGoogleTokenResponse = async (idToken) => {
    try {
      // Decode the JWT token
      const base64Url = idToken.split(".")[1];
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
      console.error("Error processing Google token response:", error);
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
