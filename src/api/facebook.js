/**
 * Facebook API Service for Material Dashboard
 */

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:3000";

export const facebookService = {
  async getOverview() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/facebook?type=overview`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error("Error fetching Facebook overview:", error);
      throw error;
    }
  },
  async getCampaigns() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/facebook?type=campaigns`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error("Error fetching Facebook campaigns:", error);
      throw error;
    }
  },
};
