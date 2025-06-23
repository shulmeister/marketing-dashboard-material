/**
 * Google Analytics API Service for Material Dashboard
 * Using Google Analytics Reporting API v4
 */

const API_KEY = process.env.REACT_APP_GOOGLE_SHEETS_API_KEY;
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:3000";

export const googleAnalyticsService = {
  async getOverview() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/google-analytics?type=overview`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error("Error fetching Google Analytics overview:", error);
      throw error;
    }
  },

  async getCampaigns() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/google-analytics?type=campaigns`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error("Error fetching Google Analytics campaigns:", error);
      throw error;
    }
  },
};
