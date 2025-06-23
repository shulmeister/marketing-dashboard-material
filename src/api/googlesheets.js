/**
 * Google Sheets API Service for Sales Tracker Integration
 */

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:3000";
const SHEET_ID = "1rKBP_5eLgvIVprVEzOYRnyL9J3FMf9H-6SLjIvIYFgg";

export const googleSheetsService = {
  async getSalesData() {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/google-sheets?sheetId=${SHEET_ID}&range=Dashboard!A1:M19`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching Google Sheets sales data:", error);
      throw error;
    }
  },
};

// Mock data for development when API is not available
export const mockSalesData = {
  totalVisits: 480,
  avgVisitsPerDay: 9.6,
  costPerVisit: 12.73,
  efficiencyScore: 100,
  timeRange: "50 days",
  territoryDistribution: [
    { territory: "Colorado Springs", percentage: 88.9, visits: 427 },
    { territory: "Pueblo", percentage: 6.9, visits: 33 },
    { territory: "Fountain", percentage: 4.2, visits: 20 },
  ],
  topBusinessRelationships: [
    { business: "Colorado Springs Orthopedic Group", visits: 20 },
    { business: "UCHealth Memorial Hospital Central", visits: 14 },
    { business: "The Independence Center", visits: 12 },
    { business: "PFC Floyd K Lindstrom VA Outpatient Clinic", visits: 13 },
    { business: "Flagship Health", visits: 12 },
  ],
  performance: {
    rating: "Excellent",
    roiRating: "Outstanding ROI",
    efficiencyRating: "Dynamic",
  },
  lastUpdated: new Date().toISOString(),
};
