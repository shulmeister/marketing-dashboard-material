/**
=========================================================
* Material Dashboard 2 React - Marketing Dashboard
=========================================================
*/

import { useState, useEffect } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Custom hooks
import { useMarketingData } from "hooks/useMarketingData";

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import MarketingActivity from "layouts/dashboard/components/OrdersOverview";

function MarketingDashboard() {
  const { mailchimpData, facebookData, loading, error, refreshData } = useMarketingData();

  // Transform Mailchimp data for charts
  const mailchimpChartData = {
    labels: ["Subscribers", "Campaigns", "Lists"],
    datasets: {
      label: "Mailchimp Metrics",
      data: [
        mailchimpData?.overview?.totalSubscribers || 0,
        mailchimpData?.overview?.totalCampaigns || 0,
        mailchimpData?.overview?.totalLists || 0,
      ],
    },
  };

  // Transform Facebook data for charts
  const facebookChartData = {
    labels: ["Impressions", "Clicks", "Spend"],
    datasets: {
      label: "Facebook Ads",
      data: [
        Math.round((facebookData?.summary?.totalImpressions || 0) / 1000), // Scale down impressions
        facebookData?.summary?.totalClicks || 0,
        Math.round(facebookData?.summary?.totalSpend || 0),
      ],
    },
  };

  if (loading) {
    return (
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox py={3}>
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12}>
              <Card>
                <MDBox p={3} textAlign="center">
                  <MDTypography variant="h5">Loading Marketing Data...</MDTypography>
                </MDBox>
              </Card>
            </Grid>
          </Grid>
        </MDBox>
        <Footer />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        {/* Header with company branding and date */}
        <MDBox mb={3}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={6}>
              <MDTypography variant="h4" fontWeight="medium">
                Shulman Marketing Analytics
              </MDTypography>
              <MDTypography variant="body2" color="text">
                Live data from Facebook Ads, Mailchimp & Google Sheets •{" "}
                {" "}
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </MDTypography>
            </Grid>
            <Grid item xs={12} md={6} sx={{ textAlign: { xs: "left", md: "right" } }}>
              <MDButton
                variant="gradient"
                color="info"
                onClick={refreshData}
                startIcon={<Icon>refresh</Icon>}
              >
                Refresh Data
              </MDButton>
            </Grid>
          </Grid>
        </MDBox>
        {/* Statistics Cards */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="email"
                title="Email Subscribers"
                count={mailchimpData?.overview?.totalSubscribers?.toLocaleString() || "0"}
                percentage={{
                  color: "success",
                  amount: "+5%",
                  label: "than last month",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="campaign"
                title="Email Campaigns"
                count={mailchimpData?.overview?.totalCampaigns || "0"}
                percentage={{
                  color: "success",
                  amount: `${mailchimpData?.overview?.avgOpenRate?.toFixed(1) || "0"}%`,
                  label: "avg open rate",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="facebook"
                title="FB Impressions"
                count={(facebookData?.summary?.totalImpressions || 0).toLocaleString()}
                percentage={{
                  color: "success",
                  amount: `${facebookData?.summary?.avgCtr?.toFixed(2) || "0"}%`,
                  label: "click-through rate",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="info"
                icon="attach_money"
                title="Ad Spend"
                count={`$${(facebookData?.summary?.totalSpend || 0).toFixed(2)}`}
                percentage={{
                  color: "success",
                  amount: `$${facebookData?.summary?.avgCpm?.toFixed(2) || "0"}`,
                  label: "average CPM",
                }}
              />
            </MDBox>
          </Grid>
        </Grid>

        {/* Charts Section */}
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="info"
                  title="Mailchimp Overview"
                  description="Subscribers, Campaigns & Lists"
                  date={`Updated: ${
                    mailchimpData?.lastUpdated
                      ? new Date(mailchimpData.lastUpdated).toLocaleDateString()
                      : "N/A"
                  }`}
                  chart={mailchimpChartData}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="success"
                  title="Facebook Ads Performance"
                  description="Impressions (k), Clicks & Spend"
                  date="Last 24 hours"
                  chart={facebookChartData}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <Card>
                  <MDBox p={3}>
                    <MDTypography variant="h6" fontWeight="medium">
                      Campaign Performance
                    </MDTypography>
                    <MDBox mt={2}>
                      {mailchimpData?.campaigns?.slice(0, 3).map((campaign, index) => (
                        <MDBox key={campaign.id || index} mb={2}>
                          <MDTypography variant="button" fontWeight="medium" color="text">
                            {campaign.settings?.subject_line || "Campaign"}
                          </MDTypography>
                          <MDBox display="flex" justifyContent="space-between" mt={0.5}>
                            <MDTypography variant="caption" color="text">
                              Open Rate:{" "}
                              {((campaign.report_summary?.opens?.open_rate || 0) * 100).toFixed(1)}%
                            </MDTypography>
                            <MDTypography variant="caption" color="text">
                              Clicks: {campaign.report_summary?.clicks?.unique_clicks || 0}
                            </MDTypography>
                          </MDBox>
                        </MDBox>
                      )) || (
                        <MDTypography variant="body2" color="text">
                          No campaign data available
                        </MDTypography>
                      )}
                    </MDBox>
                  </MDBox>
                </Card>
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>

        {/* Bottom Section */}
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              <Projects />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MarketingActivity />
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default MarketingDashboard;
