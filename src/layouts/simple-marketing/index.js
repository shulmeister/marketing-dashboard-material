import React from "react";
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

function SimpleMarketingDashboard() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <MDBox mb={3}>
          <MDTypography variant="h4" fontWeight="medium">
            Marketing Analytics Dashboard
          </MDTypography>
          <MDTypography variant="body2" color="text">
            Simple version with mock data
          </MDTypography>
        </MDBox>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="email"
                title="Email Subscribers"
                count="2,450"
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
                count="23"
                percentage={{
                  color: "success",
                  amount: "24.5%",
                  label: "avg open rate",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="visibility"
                title="FB Impressions"
                count="12,450"
                percentage={{
                  color: "success",
                  amount: "1.97%",
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
                count="$245.67"
                percentage={{
                  color: "success",
                  amount: "$19.73",
                  label: "average CPM",
                }}
              />
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default SimpleMarketingDashboard;
