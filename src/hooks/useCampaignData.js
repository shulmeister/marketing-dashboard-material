import { googleSheetsService } from "../api/googlesheets";
import { googleAnalyticsService } from "../api/googleanalytics";
import { useState, useEffect } from "react";

export function useCampaignData() {
  const [salesData, setSalesData] = useState(null);
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      console.log("🔍 Fetching campaign analytics data...");

      try {
        // Fetch sales data from Google Sheets
        const salesResult = await googleSheetsService.getSalesData();
        console.log("✅ Google Sheets API success:", salesResult);
        setSalesData(salesResult);

        // Fetch Google Analytics data from API
        const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:3000";
        const analyticsResponse = await fetch(`${API_BASE_URL}/api/google-analytics`);

        if (analyticsResponse.ok) {
          const analyticsResult = await analyticsResponse.json();
          console.log("✅ Google Analytics API success:", analyticsResult);

          // Transform the data to match our expected format
          const transformedData = {
            sessions: analyticsResult.overview?.totalSessions || analyticsResult.sessions || 0,
            users: analyticsResult.overview?.totalUsers || analyticsResult.users || 0,
            conversions:
              analyticsResult.overview?.totalConversions || analyticsResult.conversions || 0,
            conversionRate:
              analyticsResult.conversionRate ||
              (analyticsResult.overview?.totalConversions && analyticsResult.overview?.totalSessions
                ? (analyticsResult.overview.totalConversions /
                    analyticsResult.overview.totalSessions) *
                  100
                : 0),
            avgSessionDuration: analyticsResult.avgSessionDuration || 150,
            pageViews: analyticsResult.pageViews || analyticsResult.overview?.totalPageViews || 0,
            bounceRate: analyticsResult.bounceRate || 35,
            lastUpdated: analyticsResult.lastUpdated || new Date().toISOString(),
            source: analyticsResult.source || "google_analytics_api",
          };

          setAnalyticsData(transformedData);
        } else {
          throw new Error(`Analytics API responded with status: ${analyticsResponse.status}`);
        }
      } catch (err) {
        console.error("Error fetching campaign data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { salesData, analyticsData, loading, error };
}
