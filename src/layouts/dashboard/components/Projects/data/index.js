/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/**
=========================================================
* Material Dashboard 2 React - Marketing Campaigns Data
=========================================================
*/

// @mui material components
import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDProgress from "components/MDProgress";

// Images - using existing logos for marketing platforms
import logoSlack from "assets/images/small-logos/logo-slack.svg";
import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
import logoXD from "assets/images/small-logos/logo-xd.svg";
import logoAtlassian from "assets/images/small-logos/logo-atlassian.svg";
import logoJira from "assets/images/small-logos/logo-jira.svg";
import logoInvesion from "assets/images/small-logos/logo-invision.svg";
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";

export default function data() {
  const avatars = (members) =>
    members.map(([image, name]) => (
      <Tooltip key={name} title={name} placeholder="bottom">
        <MDAvatar
          src={image}
          alt="name"
          size="xs"
          sx={{
            border: ({ borders: { borderWidth }, palette: { white } }) =>
              `${borderWidth[2]} solid ${white.main}`,
            cursor: "pointer",
            position: "relative",

            "&:not(:first-of-type)": {
              ml: -1.25,
            },

            "&:hover, &:focus": {
              zIndex: "10",
            },
          }}
        />
      </Tooltip>
    ));

  const Campaign = ({ image, name, type }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDBox ml={1}>
        <MDTypography variant="button" fontWeight="medium" lineHeight={1}>
          {name}
        </MDTypography>
        <MDBox>
          <MDTypography variant="caption" color="text">
            {type}
          </MDTypography>
        </MDBox>
      </MDBox>
    </MDBox>
  );

  const StatusBadge = ({ status, color }) => (
    <MDBox display="flex" alignItems="center">
      <Icon fontSize="small" sx={{ color: color, mr: 1 }}>
        {status === "Active"
          ? "play_circle"
          : status === "Completed"
          ? "check_circle"
          : "pause_circle"}
      </Icon>
      <MDTypography
        variant="caption"
        fontWeight="medium"
        color={color === "success.main" ? "success" : color === "error.main" ? "error" : "warning"}
      >
        {status}
      </MDTypography>
    </MDBox>
  );

  return {
    columns: [
      { Header: "campaign", accessor: "campaign", width: "45%", align: "left" },
      { Header: "team", accessor: "team", width: "15%", align: "left" },
      { Header: "performance", accessor: "performance", align: "center" },
      { Header: "status", accessor: "status", align: "center" },
    ],

    rows: [
      {
        campaign: (
          <Campaign image={logoSlack} name="Summer Marketing Blitz" type="Multi-channel Campaign" />
        ),
        team: (
          <MDBox display="flex" py={1}>
            {avatars([
              [team1, "Marketing Manager"],
              [team2, "Content Specialist"],
              [team3, "Social Media Lead"],
              [team4, "Analytics Specialist"],
            ])}
          </MDBox>
        ),
        performance: (
          <MDBox textAlign="center">
            <MDTypography variant="caption" color="success" fontWeight="medium">
              142% ROI
            </MDTypography>
            <MDBox width="8rem" textAlign="left" mt={0.5}>
              <MDProgress value={85} color="success" variant="gradient" label={false} />
            </MDBox>
          </MDBox>
        ),
        status: <StatusBadge status="Active" color="success.main" />,
      },
      {
        campaign: (
          <Campaign image={logoSpotify} name="Email Newsletter Series" type="Mailchimp Campaign" />
        ),
        team: (
          <MDBox display="flex" py={1}>
            {avatars([
              [team2, "Email Marketing Lead"],
              [team4, "Content Writer"],
            ])}
          </MDBox>
        ),
        performance: (
          <MDBox textAlign="center">
            <MDTypography variant="caption" color="info" fontWeight="medium">
              28.5% Open Rate
            </MDTypography>
            <MDBox width="8rem" textAlign="left" mt={0.5}>
              <MDProgress value={65} color="info" variant="gradient" label={false} />
            </MDBox>
          </MDBox>
        ),
        status: <StatusBadge status="Active" color="success.main" />,
      },
      {
        campaign: (
          <Campaign image={logoXD} name="Facebook Ad Optimization" type="Social Media Ads" />
        ),
        team: (
          <MDBox display="flex" py={1}>
            {avatars([
              [team1, "Paid Ads Specialist"],
              [team3, "Creative Designer"],
            ])}
          </MDBox>
        ),
        performance: (
          <MDBox textAlign="center">
            <MDTypography variant="caption" color="success" fontWeight="medium">
              $2.34 CPC
            </MDTypography>
            <MDBox width="8rem" textAlign="left" mt={0.5}>
              <MDProgress value={92} color="success" variant="gradient" label={false} />
            </MDBox>
          </MDBox>
        ),
        status: <StatusBadge status="Completed" color="success.main" />,
      },
      {
        campaign: (
          <Campaign image={logoAtlassian} name="Lead Generation Funnel" type="Digital Marketing" />
        ),
        team: (
          <MDBox display="flex" py={1}>
            {avatars([
              [team4, "Growth Manager"],
              [team3, "UX Designer"],
              [team2, "Content Strategist"],
              [team1, "Data Analyst"],
            ])}
          </MDBox>
        ),
        performance: (
          <MDBox textAlign="center">
            <MDTypography variant="caption" color="warning" fontWeight="medium">
              234 Leads/month
            </MDTypography>
            <MDBox width="8rem" textAlign="left" mt={0.5}>
              <MDProgress value={78} color="warning" variant="gradient" label={false} />
            </MDBox>
          </MDBox>
        ),
        status: <StatusBadge status="Active" color="success.main" />,
      },
      {
        campaign: (
          <Campaign image={logoJira} name="Google Analytics Setup" type="Analytics & Tracking" />
        ),
        team: (
          <MDBox display="flex" py={1}>
            {avatars([[team4, "Analytics Specialist"]])}
          </MDBox>
        ),
        performance: (
          <MDBox textAlign="center">
            <MDTypography variant="caption" color="success" fontWeight="medium">
              Live Tracking
            </MDTypography>
            <MDBox width="8rem" textAlign="left" mt={0.5}>
              <MDProgress value={100} color="success" variant="gradient" label={false} />
            </MDBox>
          </MDBox>
        ),
        status: <StatusBadge status="Completed" color="success.main" />,
      },
      {
        campaign: (
          <Campaign image={logoInvesion} name="Content Marketing Hub" type="Content Strategy" />
        ),
        team: (
          <MDBox display="flex" py={1}>
            {avatars([
              [team1, "Content Manager"],
              [team4, "SEO Specialist"],
            ])}
          </MDBox>
        ),
        performance: (
          <MDBox textAlign="center">
            <MDTypography variant="caption" color="info" fontWeight="medium">
              +45% Traffic
            </MDTypography>
            <MDBox width="8rem" textAlign="left" mt={0.5}>
              <MDProgress value={60} color="info" variant="gradient" label={false} />
            </MDBox>
          </MDBox>
        ),
        status: <StatusBadge status="Active" color="success.main" />,
      },
    ],
  };
}
