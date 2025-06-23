/**
 * Facebook API Service for Material Dashboard
 */

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:3000";

export const facebookService = {
  async getInsights(dateRange = "yesterday") {
    try {
      const response = await fetch(`${API_BASE_URL}/api/facebook?date_range=${dateRange}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching Facebook insights:", error);
      throw error;
    }
  },
};

// Mock data for development when API is not available
export const mockFacebookData = {
  data: [
    {
      date_start: "2025-06-23",
      date_stop: "2025-06-23",
      spend: "245.67",
      impressions: "12450",
      clicks: "245",
      cpm: "19.73",
      ctr: "1.97",
    },
  ],
  campaigns: [
    {
      id: "fb001",
      name: "Summer Campaign 2025",
      status: "ACTIVE",
      daily_budget: "50.00",
      lifetime_budget: null,
    },
    {
      id: "fb002",
      name: "Brand Awareness Q2 2025",
      status: "PAUSED",
      daily_budget: "75.00",
      lifetime_budget: null,
    },
  ],
  summary: {
    totalSpend: 245.67,
    totalImpressions: 12450,
    totalClicks: 245,
    avgCpm: 19.73,
    avgCtr: 1.97,
  },
};
