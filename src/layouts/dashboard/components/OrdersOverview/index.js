/**
=========================================================
* Material Dashboard 2 React - Marketing Activity Overview
=========================================================
*/

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import TimelineItem from "examples/Timeline/TimelineItem";

function MarketingActivity() {
  return (
    <Card sx={{ height: "100%" }}>
      <MDBox pt={3} px={3}>
        <MDTypography variant="h6" fontWeight="medium">
          Marketing Activity
        </MDTypography>
        <MDBox mt={0} mb={2}>
          <MDTypography variant="button" color="text" fontWeight="regular">
            <MDTypography display="inline" variant="body2" verticalAlign="middle">
              <Icon sx={{ color: ({ palette: { success } }) => success.main }}>arrow_upward</Icon>
            </MDTypography>
            &nbsp;
            <MDTypography variant="button" color="text" fontWeight="medium">
              34%
            </MDTypography>{" "}
            campaign performance this month
          </MDTypography>
        </MDBox>
      </MDBox>
      <MDBox p={2}>
        <TimelineItem
          color="success"
          icon="email"
          title="Mailchimp: Summer newsletter sent to 449 subscribers"
          dateTime="23 JUN 2:15 PM"
        />
        <TimelineItem
          color="info"
          icon="ads_click"
          title="Facebook Ads: Lead generation campaign launched"
          dateTime="22 JUN 4:30 PM"
        />
        <TimelineItem
          color="primary"
          icon="analytics"
          title="Google Analytics: New tracking goals configured"
          dateTime="22 JUN 10:20 AM"
        />
        <TimelineItem
          color="warning"
          icon="campaign"
          title="New A/B test started for email subject lines"
          dateTime="21 JUN 3:45 PM"
        />
        <TimelineItem
          color="success"
          icon="trending_up"
          title="Social media engagement increased by 28%"
          dateTime="20 JUN 11:30 AM"
          lastItem
        />
      </MDBox>
    </Card>
  );
}

export default MarketingActivity;
