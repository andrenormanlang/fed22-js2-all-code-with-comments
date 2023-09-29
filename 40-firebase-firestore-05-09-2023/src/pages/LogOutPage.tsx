import { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const LogoutPage = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [logoutError, setLogoutError] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      
      navigate("/");
      return;
    }

    // Perform the logout operation when the component mounts
    const performLogout = async () => {
      try {
        await logout();
        // If logout is successful, redirect to another page (e.g., login)
        navigate("/");
      } catch (error) {
        console.error("Error logging out:", error);
        // Handle logout errors here
        setLogoutError(true);
      }
    };

    performLogout();
  }, [currentUser, logout, navigate]);

  return (
    <Container className="py-3 center-y">
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Card>
            <Card.Body>
              <Card.Title className="mb-3">Logout</Card.Title>
              {logoutError ? (
                <Alert variant="danger">
                  An error occurred during logout. Please try again.
                </Alert>
              ) : (
                currentUser ? (
                  <Card.Text>Please wait while you're being logged out...</Card.Text>
                ) : (
                  <Card.Text>You are not logged in, so no logout is needed.</Card.Text>
                )
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LogoutPage;
