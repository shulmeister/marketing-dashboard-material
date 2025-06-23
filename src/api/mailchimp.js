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

// Mock data for development when API is not available
export const mockMailchimpData = {
  overview: {
    totalSubscribers: 534,
    totalCampaigns: 8,
    avgOpenRate: 28.5,
    avgClickRate: 4.2,
    totalLists: 3,
    lastUpdated: new Date().toISOString(),
  },
  campaigns: [
    {
      id: "mc001",
      settings: { subject_line: "Summer Sale - 50% Off!" },
      send_time: "2025-06-20T10:00:00Z",
      report_summary: {
        opens: { open_rate: 0.28, unique_opens: 686 },
        clicks: { click_rate: 0.045, unique_clicks: 110 },
        emails_sent: 2450,
      },
    },
    {
      id: "mc002",
      settings: { subject_line: "New Product Launch" },
      send_time: "2025-06-18T14:30:00Z",
      report_summary: {
        opens: { open_rate: 0.22, unique_opens: 539 },
        clicks: { click_rate: 0.032, unique_clicks: 78 },
        emails_sent: 2450,
      },
    },
    {
      id: "mc003",
      settings: { subject_line: "Holiday Marketing Push" },
      send_time: "2025-06-15T09:00:00Z",
      report_summary: {
        opens: { open_rate: 0.31, unique_opens: 759 },
        clicks: { click_rate: 0.052, unique_clicks: 127 },
        emails_sent: 2450,
      },
    },
  ],
};
