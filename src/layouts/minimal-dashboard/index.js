/**
 * Minimal Marketing Dashboard - Testing Version
 */

import React from 'react';

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

function MinimalDashboard() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <MDBox p={3}>
                <MDTypography variant="h4" fontWeight="medium">
                  🎉 Marketing Analytics Dashboard
                </MDTypography>
                <MDTypography variant="body1" color="text" mt={2}>
                  Dashboard is working! Here's your marketing data:
                </MDTypography>
                
                <Box mt={3}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={3}>
                      <Card sx={{ p: 2, textAlign: 'center' }}>
                        <Typography variant="h4" color="primary">2,450</Typography>
                        <Typography variant="body2">Email Subscribers</Typography>
                      </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <Card sx={{ p: 2, textAlign: 'center' }}>
                        <Typography variant="h4" color="success.main">23</Typography>
                        <Typography variant="body2">Email Campaigns</Typography>
                      </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <Card sx={{ p: 2, textAlign: 'center' }}>
                        <Typography variant="h4" color="info.main">12,450</Typography>
                        <Typography variant="body2">FB Impressions</Typography>
                      </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <Card sx={{ p: 2, textAlign: 'center' }}>
                        <Typography variant="h4" color="warning.main">$245</Typography>
                        <Typography variant="body2">Ad Spend</Typography>
                      </Card>
                    </Grid>
                  </Grid>
                </Box>

                <MDBox mt={4}>
                  <MDTypography variant="h6" fontWeight="medium">
                    📊 Key Metrics
                  </MDTypography>
                  <ul>
                    <li>Email Open Rate: 24.5%</li>
                    <li>Click-Through Rate: 1.97%</li>
                    <li>Average CPM: $19.73</li>
                    <li>Subscriber Growth: +5% this month</li>
                  </ul>
                </MDBox>

                <MDBox mt={3}>
                  <Typography variant="body2" color="text.secondary">
                    ✅ Dashboard Status: Working<br/>
                    ✅ Components: Loaded<br/>
                    ✅ Data: Mock data displaying<br/>
                    🔄 Next: Add real API integration
                  </Typography>
                </MDBox>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default MinimalDashboard;
