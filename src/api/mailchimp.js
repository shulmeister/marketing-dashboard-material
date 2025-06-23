/**
 * Mailchimp API Service for Material Dashboard
 * Note: This will make requests to your backend API endpoints
 */

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:3000";

export const mailchimpService = {
  async getOverview() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/mailchimp?type=overview`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching Mailchimp overview:", error);
      throw error;
    }
  },

  async getCampaigns() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/mailchimp?type=campaigns`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching Mailchimp campaigns:", error);
      throw error;
    }
  },

  async getLists() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/mailchimp?type=lists`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching Mailchimp lists:", error);
      throw error;
    }
  },
};
