import { useState, useEffect } from "react";
import { googleSheetsService, mockSalesData } from "../api/googlesheets";

const USE_MOCK_DATA = process.env.REACT_APP_USE_MOCK_DATA === "true";

export const useCampaignData = () => {
  const [salesData, setSalesData] = useState(null);
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      console.log("🔍 Fetching campaign analytics data:", {
        USE_MOCK_DATA,
        API_BASE_URL: process.env.REACT_APP_API_BASE_URL,
      });

      try {
        if (USE_MOCK_DATA) {
          console.log("📊 Using mock sales data");
          setSalesData(mockSalesData);
          // Mock Google Analytics data
          setAnalyticsData({
            sessions: 1850,
            users: 1290,
            conversions: 67,
            conversionRate: 5.2,
            avgSessionDuration: 185,
            pageViews: 4850,
            bounceRate: 38.7,
            lastUpdated: new Date().toISOString(),
          });
        } else {
          console.log("🌐 Fetching real API data...");

          // Fetch sales data from Google Sheets
          try {
            const salesResult = await googleSheetsService.getSalesData();
            console.log("✅ Google Sheets API success:", salesResult);
            setSalesData(salesResult);
          } catch (salesError) {
            console.warn("❌ Google Sheets API failed, using mock data:", salesError);
            setSalesData(mockSalesData);
          }

          // Google Analytics data (currently using realistic placeholder data)
          // TODO: Integrate with real Google Analytics API when available
          setAnalyticsData({
            sessions: 1850,
            users: 1290,
            conversions: 67,
            conversionRate: 5.2,
            avgSessionDuration: 185,
            pageViews: 4850,
            bounceRate: 38.7,
            lastUpdated: new Date().toISOString(),
          });
        }
      } catch (err) {
        console.error("Error fetching campaign data:", err);
        setError(err.message);
        setSalesData(mockSalesData);
        setAnalyticsData({
          sessions: 1850,
          users: 1290,
          conversions: 67,
          conversionRate: 5.2,
          avgSessionDuration: 185,
          pageViews: 4850,
          bounceRate: 38.7,
          lastUpdated: new Date().toISOString(),
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const refreshData = async () => {
    setLoading(true);
    setError(null);

    try {
      if (!USE_MOCK_DATA) {
        const salesResult = await googleSheetsService.getSalesData();
        setSalesData(salesResult);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    salesData,
    analyticsData,
    loading,
    error,
    refreshData,
  };
};
