import React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import { useMarketingData } from "hooks/useMarketingData";

function SimpleMarketingDashboard() {
  const { mailchimpData, loading, error } = useMarketingData();

  if (loading) {
    return (
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox py={3}>
          <MDTypography variant="h4" fontWeight="medium">
            Loading Email Marketing Data...
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
            Error loading email marketing data: {error}
          </MDTypography>
        </MDBox>
        <Footer />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <MDBox mb={3}>
          <MDTypography variant="h4" fontWeight="medium">
            📧 Email Marketing Dashboard
          </MDTypography>
          <MDTypography variant="body2" color="text">
            Real Mailchimp data and analytics
          </MDTypography>
        </MDBox>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="email"
                title="Email Subscribers"
                count={mailchimpData?.overview?.totalSubscribers?.toLocaleString() || "0"}
                percentage={{
                  color: "info",
                  amount: `${mailchimpData?.overview?.totalLists || 0} lists`,
                  label: "active mailing lists",
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
                count={mailchimpData?.overview?.totalCampaigns?.toString() || "0"}
                percentage={{
                  color: "success",
                  amount: `${mailchimpData?.overview?.avgOpenRate?.toFixed(1) || 0}%`,
                  label: "avg open rate",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="warning"
                icon="mouse"
                title="Click Rate"
                count={`${mailchimpData?.overview?.avgClickRate?.toFixed(1) || 0}%`}
                percentage={{
                  color: "success",
                  amount: "Active",
                  label: "engagement metrics",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="info"
                icon="update"
                title="Last Updated"
                count={
                  mailchimpData?.overview?.lastUpdated
                    ? new Date(mailchimpData.overview.lastUpdated).toLocaleDateString()
                    : "N/A"
                }
                percentage={{
                  color: "info",
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
            Recent Email Campaigns
          </MDTypography>
          <Grid container spacing={3}>
            {mailchimpData?.campaigns?.map((campaign, index) => (
              <Grid item xs={12} md={6} key={campaign.id || index}>
                <Card>
                  <MDBox p={3}>
                    <MDTypography variant="h6" fontWeight="medium">
                      {campaign.settings?.subject_line || "Untitled Campaign"}
                    </MDTypography>
                    <MDTypography variant="body2" color="text" mt={1}>
                      Sent:{" "}
                      {campaign.send_time
                        ? new Date(campaign.send_time).toLocaleDateString()
                        : "N/A"}
                    </MDTypography>
                    <Grid container spacing={2} mt={2}>
                      <Grid item xs={6}>
                        <MDTypography variant="body2">
                          <strong>Opens:</strong>{" "}
                          {campaign.report_summary?.opens?.unique_opens || 0}
                        </MDTypography>
                        <MDTypography variant="body2">
                          <strong>Open Rate:</strong>{" "}
                          {((campaign.report_summary?.opens?.open_rate || 0) * 100).toFixed(1)}%
                        </MDTypography>
                      </Grid>
                      <Grid item xs={6}>
                        <MDTypography variant="body2">
                          <strong>Clicks:</strong>{" "}
                          {campaign.report_summary?.clicks?.unique_clicks || 0}
                        </MDTypography>
                        <MDTypography variant="body2">
                          <strong>Click Rate:</strong>{" "}
                          {((campaign.report_summary?.clicks?.click_rate || 0) * 100).toFixed(1)}%
                        </MDTypography>
                      </Grid>
                    </Grid>
                  </MDBox>
                </Card>
              </Grid>
            ))}
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default SimpleMarketingDashboard;
