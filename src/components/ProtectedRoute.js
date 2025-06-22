/**
 * Protected Route component that requires authentication
 */

import { Navigate } from "react-router-dom";
import { useAuth } from "context/AuthContext";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <MDBox
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <MDTypography variant="h6">Loading...</MDTypography>
      </MDBox>
    );
  }

  // Redirect to sign-in if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/authentication/sign-in" replace />;
  }

  // Render the protected component if authenticated
  return children;
};

export default ProtectedRoute;
