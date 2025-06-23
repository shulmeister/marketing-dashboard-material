/**
 * Google Sheets API Service for Sales Tracker Integration
 */

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:3000";

export const googleSheetsService = {
  async getOverview() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/google-sheets?type=overview`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error("Error fetching Google Sheets overview:", error);
      throw error;
    }
  },
  async getSales() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/google-sheets?type=sales`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error("Error fetching Google Sheets sales:", error);
      throw error;
    }
  },
};
