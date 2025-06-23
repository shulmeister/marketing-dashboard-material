/**
 * Campaign Analytics Dashboard - Combined Google Analytics + Sales Tracker
 */

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
import { useCampaignData } from "hooks/useCampaignData";

function Dashboard() {
  const { salesData, analyticsData, loading, error } = useCampaignData();

  if (loading) {
    return (
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox py={3}>
          <MDTypography variant="h4" fontWeight="medium">
            Loading Campaign Analytics...
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
            Error loading campaign data: {error}
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
        {/* Header */}
        <MDBox mb={3}>
          <MDTypography variant="h4" fontWeight="medium">
            📊 Campaign Analytics Dashboard
          </MDTypography>
          <MDTypography variant="body2" color="text">
            Website performance + Sales team activity insights
          </MDTypography>
        </MDBox>

        {/* Website Analytics Section */}
        <MDBox mb={4}>
          <MDTypography variant="h5" fontWeight="medium" mb={2}>
            🌐 Website Performance (Google Analytics)
          </MDTypography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  color="primary"
                  icon="visibility"
                  title="Sessions"
                  count={analyticsData?.sessions?.toLocaleString() || "0"}
                  percentage={{
                    color: "success",
                    amount: `${analyticsData?.conversionRate || 0}%`,
                    label: "conversion rate",
                  }}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  color="info"
                  icon="people"
                  title="Users"
                  count={analyticsData?.users?.toLocaleString() || "0"}
                  percentage={{
                    color: "info",
                    amount: `${analyticsData?.bounceRate || 0}%`,
                    label: "bounce rate",
                  }}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  color="success"
                  icon="trending_up"
                  title="Conversions"
                  count={analyticsData?.conversions?.toString() || "0"}
                  percentage={{
                    color: "success",
                    amount: `${Math.round(analyticsData?.avgSessionDuration || 0)}s`,
                    label: "avg session time",
                  }}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  color="warning"
                  icon="pageview"
                  title="Page Views"
                  count={analyticsData?.pageViews?.toLocaleString() || "0"}
                  percentage={{
                    color: "info",
                    amount: "Live",
                    label: "data sync",
                  }}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>

        {/* Sales Performance Section */}
        <MDBox mb={4}>
          <MDTypography variant="h5" fontWeight="medium" mb={2}>
            👥 Sales Team Performance (Google Sheets)
          </MDTypography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  color="dark"
                  icon="business"
                  title="Total Visits"
                  count={salesData?.totalVisits?.toLocaleString() || "0"}
                  percentage={{
                    color: "info",
                    amount: salesData?.timeRange || "N/A",
                    label: "time period",
                  }}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  color="success"
                  icon="schedule"
                  title="Avg Visits/Day"
                  count={salesData?.avgVisitsPerDay?.toString() || "0"}
                  percentage={{
                    color: "success",
                    amount: salesData?.performance?.rating || "Good",
                    label: "performance rating",
                  }}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  color="warning"
                  icon="attach_money"
                  title="Cost Per Visit"
                  count={`$${salesData?.costPerVisit?.toFixed(2) || "0.00"}`}
                  percentage={{
                    color: "success",
                    amount: salesData?.performance?.roiRating || "Good ROI",
                    label: "roi status",
                  }}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  color="info"
                  icon="speed"
                  title="Efficiency Score"
                  count={`${salesData?.efficiencyScore || 0}%`}
                  percentage={{
                    color: "success",
                    amount: salesData?.performance?.efficiencyRating || "Dynamic",
                    label: "efficiency level",
                  }}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>

        {/* Territory Distribution */}
        <MDBox mb={4}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <MDBox p={3}>
                  <MDTypography variant="h6" fontWeight="medium" mb={3}>
                    🗺️ Territory Distribution
                  </MDTypography>
                  {salesData?.territoryDistribution?.map((territory, index) => (
                    <MDBox key={index} mb={2}>
                      <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="body2" fontWeight="medium">
                          {territory.territory}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {territory.percentage}% ({territory.visits} visits)
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          width: "100%",
                          height: 8,
                          backgroundColor: "grey.200",
                          borderRadius: 1,
                          mt: 1,
                        }}
                      >
                        <Box
                          sx={{
                            width: `${territory.percentage}%`,
                            height: "100%",
                            backgroundColor:
                              index === 0
                                ? "primary.main"
                                : index === 1
                                ? "info.main"
                                : "success.main",
                            borderRadius: 1,
                          }}
                        />
                      </Box>
                    </MDBox>
                  ))}
                </MDBox>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <MDBox p={3}>
                  <MDTypography variant="h6" fontWeight="medium" mb={3}>
                    🏢 Top Business Relationships
                  </MDTypography>
                  {salesData?.topBusinessRelationships?.map((business, index) => (
                    <MDBox key={index} mb={2}>
                      <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography
                          variant="body2"
                          fontWeight="medium"
                          sx={{ fontSize: "0.85rem" }}
                        >
                          {business.business}
                        </Typography>
                        <Typography variant="h6" color="primary.main">
                          {business.visits}
                        </Typography>
                      </Box>
                      {index < salesData.topBusinessRelationships.length - 1 && (
                        <Box sx={{ borderBottom: 1, borderColor: "grey.200", mt: 1 }} />
                      )}
                    </MDBox>
                  ))}
                </MDBox>
              </Card>
            </Grid>
          </Grid>
        </MDBox>

        {/* Performance Summary */}
        <MDBox>
          <Card>
            <MDBox p={3}>
              <MDTypography variant="h5" fontWeight="medium" mb={3}>
                📈 Performance Summary
              </MDTypography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <Box textAlign="center" p={2}>
                    <Typography variant="h3" color="primary.main">
                      {(
                        ((analyticsData?.conversions || 0) / (salesData?.totalVisits || 1)) *
                        100
                      ).toFixed(1)}
                      %
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Marketing to Sales Conversion
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Box textAlign="center" p={2}>
                    <Typography variant="h3" color="success.main">
                      $
                      {((analyticsData?.conversions || 0) * (salesData?.costPerVisit || 0)).toFixed(
                        0
                      )}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Estimated Revenue Impact
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Box textAlign="center" p={2}>
                    <Typography variant="h3" color="warning.main">
                      {((analyticsData?.sessions || 0) / (salesData?.avgVisitsPerDay || 1)).toFixed(
                        0
                      )}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Days of Web Traffic per Sales Visit
                    </Typography>
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

export default Dashboard;
