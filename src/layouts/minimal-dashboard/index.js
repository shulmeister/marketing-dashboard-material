/**
 * Social Media Dashboard - Facebook Analytics
 */

import React from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import { useMarketingData } from "hooks/useMarketingData";

function MinimalDashboard() {
  const { facebookData, loading, error } = useMarketingData();

  if (loading) {
    return (
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox py={3}>
          <MDTypography variant="h4" fontWeight="medium">
            Loading Social Media Data...
          </MDTypography>
        </MDBox>
        <Footer />
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox py={3}>
          <MDTypography variant="h4" fontWeight="medium" color="error">
            Error loading social media data: {error}
          </MDTypography>
        </MDBox>
        <Footer />
      </DashboardLayout>
    );
  }

  const latestData = facebookData?.data?.[0] || {};
  const summary = facebookData?.summary || {};

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <MDBox mb={3}>
          <MDTypography variant="h4" fontWeight="medium">
            📱 Social Media Dashboard
          </MDTypography>
          <MDTypography variant="body2" color="text">
            Real Facebook Ads data and analytics
          </MDTypography>
        </MDBox>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="info"
                icon="visibility"
                title="FB Impressions"
                count={parseInt(
                  latestData.impressions || summary.totalImpressions || 0
                ).toLocaleString()}
                percentage={{
                  color: "success",
                  amount: `${latestData.ctr || summary.avgCtr || 0}%`,
                  label: "click-through rate",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="mouse"
                title="Total Clicks"
                count={parseInt(latestData.clicks || summary.totalClicks || 0).toLocaleString()}
                percentage={{
                  color: "info",
                  amount: "Active",
                  label: "engagement",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="attach_money"
                title="Ad Spend"
                count={`$${parseFloat(latestData.spend || summary.totalSpend || 0).toFixed(2)}`}
                percentage={{
                  color: "warning",
                  amount: `$${latestData.cpm || summary.avgCpm || 0}`,
                  label: "average CPM",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="warning"
                icon="trending_up"
                title="Performance"
                count={
                  latestData.date_start
                    ? new Date(latestData.date_start).toLocaleDateString()
                    : "N/A"
                }
                percentage={{
                  color: "success",
                  amount: "Live",
                  label: "data sync",
                }}
              />
            </MDBox>
          </Grid>
        </Grid>

        {/* Campaign Details */}
        <MDBox mt={4}>
          <MDTypography variant="h5" fontWeight="medium" mb={2}>
            Active Facebook Campaigns
          </MDTypography>
          <Grid container spacing={3}>
            {facebookData?.campaigns?.map((campaign, index) => (
              <Grid item xs={12} md={6} key={campaign.id || index}>
                <Card>
                  <MDBox p={3}>
                    <MDTypography variant="h6" fontWeight="medium">
                      {campaign.name || "Untitled Campaign"}
                    </MDTypography>
                    <MDTypography
                      variant="body2"
                      color={campaign.status === "ACTIVE" ? "success" : "text"}
                      mt={1}
                    >
                      Status: {campaign.status}
                    </MDTypography>
                    <Grid container spacing={2} mt={2}>
                      <Grid item xs={6}>
                        <MDTypography variant="body2">
                          <strong>Daily Budget:</strong> ${campaign.daily_budget || "N/A"}
                        </MDTypography>
                      </Grid>
                      <Grid item xs={6}>
                        <MDTypography variant="body2">
                          <strong>Campaign ID:</strong> {campaign.id}
                        </MDTypography>
                      </Grid>
                    </Grid>
                  </MDBox>
                </Card>
              </Grid>
            ))}
          </Grid>
        </MDBox>

        {/* Performance Summary */}
        <MDBox mt={4}>
          <Card>
            <MDBox p={3}>
              <MDTypography variant="h5" fontWeight="medium" mb={3}>
                📊 Performance Summary
              </MDTypography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={3}>
                  <Box textAlign="center">
                    <Typography variant="h4" color="primary">
                      {parseInt(summary.totalImpressions || 0).toLocaleString()}
                    </Typography>
                    <Typography variant="body2">Total Impressions</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Box textAlign="center">
                    <Typography variant="h4" color="success.main">
                      {parseInt(summary.totalClicks || 0).toLocaleString()}
                    </Typography>
                    <Typography variant="body2">Total Clicks</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Box textAlign="center">
                    <Typography variant="h4" color="warning.main">
                      ${parseFloat(summary.totalSpend || 0).toFixed(2)}
                    </Typography>
                    <Typography variant="body2">Total Spend</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Box textAlign="center">
                    <Typography variant="h4" color="info.main">
                      {summary.avgCtr || 0}%
                    </Typography>
                    <Typography variant="body2">Avg CTR</Typography>
                  </Box>
                </Grid>
              </Grid>
            </MDBox>
          </Card>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default MinimalDashboard;
