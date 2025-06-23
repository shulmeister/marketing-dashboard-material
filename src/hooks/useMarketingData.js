import { useState, useEffect } from "react";
import { mailchimpService, mockMailchimpData } from "../api/mailchimp";
import { facebookService, mockFacebookData } from "../api/facebook";

const USE_MOCK_DATA = process.env.REACT_APP_USE_MOCK_DATA === "true";

export const useMarketingData = () => {
  console.log("Environment variables:", {
    USE_MOCK_DATA,
    REACT_APP_USE_MOCK_DATA: process.env.REACT_APP_USE_MOCK_DATA,
    API_BASE_URL: process.env.REACT_APP_API_BASE_URL,
  });
  const [mailchimpData, setMailchimpData] = useState(null);
  const [facebookData, setFacebookData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      console.log("🔍 Debug info:", {
        USE_MOCK_DATA,
        API_BASE_URL: process.env.REACT_APP_API_BASE_URL,
        environment: process.env.NODE_ENV,
      });

      try {
        if (USE_MOCK_DATA) {
          console.log("📊 Using mock data");
          // Use mock data for development
          setMailchimpData(mockMailchimpData);
          setFacebookData(mockFacebookData);
        } else {
          console.log("🌐 Fetching real API data...");
          // Fetch real data from APIs
          const [mailchimpResult, facebookResult] = await Promise.allSettled([
            mailchimpService.getOverview(),
            facebookService.getInsights(),
          ]);

          if (mailchimpResult.status === "fulfilled") {
            console.log("✅ Mailchimp API success:", mailchimpResult.value);
            setMailchimpData(mailchimpResult.value);
          } else {
            console.warn("❌ Mailchimp API failed, using mock data:", mailchimpResult.reason);
            setMailchimpData(mockMailchimpData);
          }

          if (facebookResult.status === "fulfilled") {
            console.log("✅ Facebook API success:", facebookResult.value);
            setFacebookData(facebookResult.value);
          } else {
            console.warn("❌ Facebook API failed, using mock data:", facebookResult.reason);
            setFacebookData(mockFacebookData);
          }
        }
      } catch (err) {
        console.error("Error fetching marketing data:", err);
        setError(err.message);
        // Fallback to mock data on error
        setMailchimpData(mockMailchimpData);
        setFacebookData(mockFacebookData);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const refreshData = () => {
    setLoading(true);
    setError(null);
    // Re-fetch data
    const fetchData = async () => {
      try {
        if (!USE_MOCK_DATA) {
          const [mailchimpResult, facebookResult] = await Promise.allSettled([
            mailchimpService.getOverview(),
            facebookService.getInsights(),
          ]);

          if (mailchimpResult.status === "fulfilled") {
            setMailchimpData(mailchimpResult.value);
          }

          if (facebookResult.status === "fulfilled") {
            setFacebookData(facebookResult.value);
          }
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  };

  return {
    mailchimpData,
    facebookData,
    loading,
    error,
    refreshData,
  };
};
// Trigger deployment
