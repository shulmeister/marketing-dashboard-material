/**
 * Marketing Reports Dashboard - Comprehensive Cross-Platform Analytics
 */

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Hooks
import { useMarketingData } from "hooks/useMarketingData";
import { useCampaignData } from "hooks/useCampaignData";

function Tables() {
  const { mailchimpData, facebookData, loading: marketingLoading } = useMarketingData();
  const { salesData, analyticsData, loading: campaignLoading } = useCampaignData();

  const loading = marketingLoading || campaignLoading;

  if (loading) {
    return (
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox pt={6} pb={3}>
          <MDTypography variant="h4" fontWeight="medium">
            Loading Marketing Reports...
          </MDTypography>
        </MDBox>
        <Footer />
      </DashboardLayout>
    );
  }

  // Generate comprehensive report data
  const totalEmailsSent =
    mailchimpData?.campaigns?.reduce(
      (sum, campaign) => sum + (campaign.report_summary?.emails_sent || 0),
      0
    ) || 0;

  const totalEmailOpens =
    mailchimpData?.campaigns?.reduce(
      (sum, campaign) => sum + (campaign.report_summary?.opens?.unique_opens || 0),
      0
    ) || 0;

  const totalEmailClicks =
    mailchimpData?.campaigns?.reduce(
      (sum, campaign) => sum + (campaign.report_summary?.clicks?.unique_clicks || 0),
      0
    ) || 0;

  const avgOpenRate = mailchimpData?.overview?.avgOpenRate || 0;
  const avgClickRate = mailchimpData?.overview?.avgClickRate || 0;

  // Facebook performance
  const totalAdSpend = parseFloat(facebookData?.summary?.totalSpend || 0);
  const totalImpressions = parseInt(facebookData?.summary?.totalImpressions || 0);
  const totalClicks = parseInt(facebookData?.summary?.totalClicks || 0);
  const avgCtr = facebookData?.summary?.avgCtr || 0;

  // Sales performance
  const totalSalesVisits = salesData?.totalVisits || 0;
  const costPerVisit = salesData?.costPerVisit || 0;
  const efficiencyScore = salesData?.efficiencyScore || 0;

  // Cross-platform metrics
  const totalMarketingSpend = totalAdSpend;
  const totalLeadsGenerated = totalEmailClicks + totalClicks;
  const costPerLead = totalLeadsGenerated > 0 ? totalMarketingSpend / totalLeadsGenerated : 0;
  const leadToVisitRatio =
    totalLeadsGenerated > 0 ? (totalSalesVisits / totalLeadsGenerated) * 100 : 0;

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        {/* Header */}
        <MDBox mb={3}>
          <MDTypography variant="h4" fontWeight="medium">
            📈 Marketing Reports Dashboard
          </MDTypography>
          <MDTypography variant="body2" color="text">
            Comprehensive analytics across all marketing channels
          </MDTypography>
        </MDBox>

        {/* Summary Metrics */}
        <Grid container spacing={3} mb={4}>
          <Grid item xs={12} md={6} lg={3}>
            <ComplexStatisticsCard
              color="primary"
              icon="campaign"
              title="Total Campaigns"
              count={
                (mailchimpData?.overview?.totalCampaigns || 0) +
                (facebookData?.campaigns?.length || 0)
              }
              percentage={{
                color: "success",
                amount: "Active",
                label: "across platforms",
              }}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <ComplexStatisticsCard
              color="success"
              icon="attach_money"
              title="Total Ad Spend"
              count={`$${totalAdSpend.toFixed(2)}`}
              percentage={{
                color: "info",
                amount: `$${costPerLead.toFixed(2)}`,
                label: "cost per lead",
              }}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <ComplexStatisticsCard
              color="info"
              icon="trending_up"
              title="Total Leads"
              count={totalLeadsGenerated.toLocaleString()}
              percentage={{
                color: "success",
                amount: `${leadToVisitRatio.toFixed(1)}%`,
                label: "convert to visits",
              }}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <ComplexStatisticsCard
              color="warning"
              icon="business"
              title="Sales Visits"
              count={totalSalesVisits.toLocaleString()}
              percentage={{
                color: "success",
                amount: `${efficiencyScore}%`,
                label: "efficiency score",
              }}
            />
          </Grid>
        </Grid>

        {/* Email Marketing Performance Table */}
        <Grid container spacing={3}>
          <Grid item xs={12} lg={6}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="primary"
                borderRadius="lg"
                coloredShadow="primary"
              >
                <MDTypography variant="h6" color="white">
                  📧 Email Marketing Performance
                </MDTypography>
              </MDBox>
              <MDBox pt={3} pb={2}>
                <TableContainer component={Paper} elevation={0}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>
                          <strong>Campaign</strong>
                        </TableCell>
                        <TableCell align="right">
                          <strong>Sent</strong>
                        </TableCell>
                        <TableCell align="right">
                          <strong>Opens</strong>
                        </TableCell>
                        <TableCell align="right">
                          <strong>Clicks</strong>
                        </TableCell>
                        <TableCell align="center">
                          <strong>Status</strong>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {mailchimpData?.campaigns?.map((campaign, index) => (
                        <TableRow key={campaign.id || index}>
                          <TableCell component="th" scope="row">
                            <MDTypography variant="body2" fontWeight="medium">
                              {campaign.settings?.subject_line || "Untitled"}
                            </MDTypography>
                            <MDTypography variant="caption" color="text">
                              {campaign.send_time
                                ? new Date(campaign.send_time).toLocaleDateString()
                                : "N/A"}
                            </MDTypography>
                          </TableCell>
                          <TableCell align="right">
                            {(campaign.report_summary?.emails_sent || 0).toLocaleString()}
                          </TableCell>
                          <TableCell align="right">
                            {(campaign.report_summary?.opens?.unique_opens || 0).toLocaleString()}
                            <br />
                            <MDTypography variant="caption" color="success">
                              {((campaign.report_summary?.opens?.open_rate || 0) * 100).toFixed(1)}%
                            </MDTypography>
                          </TableCell>
                          <TableCell align="right">
                            {(campaign.report_summary?.clicks?.unique_clicks || 0).toLocaleString()}
                            <br />
                            <MDTypography variant="caption" color="info">
                              {((campaign.report_summary?.clicks?.click_rate || 0) * 100).toFixed(
                                1
                              )}
                              %
                            </MDTypography>
                          </TableCell>
                          <TableCell align="center">
                            <Chip label="Sent" color="success" size="small" variant="outlined" />
                          </TableCell>
                        </TableRow>
                      )) || []}
                    </TableBody>
                  </Table>
                </TableContainer>
              </MDBox>
            </Card>
          </Grid>

          {/* Facebook Ads Performance Table */}
          <Grid item xs={12} lg={6}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  📱 Social Media Ads Performance
                </MDTypography>
              </MDBox>
              <MDBox pt={3} pb={2}>
                <TableContainer component={Paper} elevation={0}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>
                          <strong>Campaign</strong>
                        </TableCell>
                        <TableCell align="right">
                          <strong>Budget</strong>
                        </TableCell>
                        <TableCell align="right">
                          <strong>Impressions</strong>
                        </TableCell>
                        <TableCell align="right">
                          <strong>Clicks</strong>
                        </TableCell>
                        <TableCell align="center">
                          <strong>Status</strong>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {facebookData?.campaigns?.map((campaign, index) => (
                        <TableRow key={campaign.id || index}>
                          <TableCell component="th" scope="row">
                            <MDTypography variant="body2" fontWeight="medium">
                              {campaign.name || "Untitled Campaign"}
                            </MDTypography>
                            <MDTypography variant="caption" color="text">
                              ID: {campaign.id}
                            </MDTypography>
                          </TableCell>
                          <TableCell align="right">
                            ${campaign.daily_budget || "N/A"}
                            <br />
                            <MDTypography variant="caption" color="text">
                              daily
                            </MDTypography>
                          </TableCell>
                          <TableCell align="right">
                            {Math.round(
                              totalImpressions / (facebookData?.campaigns?.length || 1)
                            ).toLocaleString()}
                          </TableCell>
                          <TableCell align="right">
                            {Math.round(
                              totalClicks / (facebookData?.campaigns?.length || 1)
                            ).toLocaleString()}
                            <br />
                            <MDTypography variant="caption" color="info">
                              {avgCtr}% CTR
                            </MDTypography>
                          </TableCell>
                          <TableCell align="center">
                            <Chip
                              label={campaign.status || "UNKNOWN"}
                              color={campaign.status === "ACTIVE" ? "success" : "default"}
                              size="small"
                              variant={campaign.status === "ACTIVE" ? "filled" : "outlined"}
                            />
                          </TableCell>
                        </TableRow>
                      )) || []}
                    </TableBody>
                  </Table>
                </TableContainer>
              </MDBox>
            </Card>
          </Grid>
        </Grid>

        {/* Sales Territory Performance */}
        <Grid container spacing={3} mt={2}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="success"
                borderRadius="lg"
                coloredShadow="success"
              >
                <MDTypography variant="h6" color="white">
                  👥 Sales Territory Performance Report
                </MDTypography>
              </MDBox>
              <MDBox pt={3} pb={2}>
                <TableContainer component={Paper} elevation={0}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>
                          <strong>Territory</strong>
                        </TableCell>
                        <TableCell align="right">
                          <strong>Total Visits</strong>
                        </TableCell>
                        <TableCell align="right">
                          <strong>Percentage</strong>
                        </TableCell>
                        <TableCell align="right">
                          <strong>Cost per Visit</strong>
                        </TableCell>
                        <TableCell align="right">
                          <strong>Est. Revenue Impact</strong>
                        </TableCell>
                        <TableCell align="center">
                          <strong>Performance</strong>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {salesData?.territoryDistribution?.map((territory, index) => (
                        <TableRow key={index}>
                          <TableCell component="th" scope="row">
                            <MDTypography variant="body2" fontWeight="medium">
                              {territory.territory}
                            </MDTypography>
                          </TableCell>
                          <TableCell align="right">
                            <MDTypography variant="h6" color="primary">
                              {territory.visits}
                            </MDTypography>
                          </TableCell>
                          <TableCell align="right">
                            <MDTypography variant="body2" fontWeight="medium">
                              {territory.percentage}%
                            </MDTypography>
                          </TableCell>
                          <TableCell align="right">
                            <MDTypography variant="body2" fontWeight="medium">
                              ${(costPerVisit * (territory.visits / totalSalesVisits)).toFixed(2)}
                            </MDTypography>
                          </TableCell>
                          <TableCell align="right">
                            <MDTypography variant="body2" color="success" fontWeight="medium">
                              ${(territory.visits * costPerVisit * 1.5).toFixed(0)}
                            </MDTypography>
                          </TableCell>
                          <TableCell align="center">
                            <Chip
                              label={
                                index === 0 ? "Leading" : index === 1 ? "Growing" : "Developing"
                              }
                              color={index === 0 ? "success" : index === 1 ? "info" : "warning"}
                              size="small"
                              variant="filled"
                            />
                          </TableCell>
                        </TableRow>
                      )) || []}
                      <TableRow sx={{ backgroundColor: "grey.50" }}>
                        <TableCell component="th" scope="row">
                          <MDTypography variant="body2" fontWeight="bold">
                            TOTAL
                          </MDTypography>
                        </TableCell>
                        <TableCell align="right">
                          <MDTypography variant="h6" color="primary">
                            {totalSalesVisits}
                          </MDTypography>
                        </TableCell>
                        <TableCell align="right">
                          <MDTypography variant="body2" fontWeight="bold">
                            100%
                          </MDTypography>
                        </TableCell>
                        <TableCell align="right">
                          <MDTypography variant="body2" fontWeight="bold">
                            ${costPerVisit.toFixed(2)}
                          </MDTypography>
                        </TableCell>
                        <TableCell align="right">
                          <MDTypography variant="body2" color="success" fontWeight="bold">
                            ${(totalSalesVisits * costPerVisit * 1.5).toFixed(0)}
                          </MDTypography>
                        </TableCell>
                        <TableCell align="center">
                          <Chip
                            label={`${efficiencyScore}% Efficient`}
                            color="success"
                            size="small"
                            variant="filled"
                          />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
