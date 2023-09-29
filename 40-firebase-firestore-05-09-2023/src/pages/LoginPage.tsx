import { useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { LoginCredentials } from "../types/User.types";
import useAuth from "../hooks/useAuth";

const LoginPage = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginCredentials>();

  const authContext = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(false);

  const onLogin: SubmitHandler<LoginCredentials> = async (data) => {

    try {
      const { login } = authContext;
      // Use the login function to log in the user
      await login(data.email, data.password);

      // After a successful login, you can navigate to another page if needed
      // Example:
      // const navigate = useNavigate();
      navigate("/todos");
    } catch (error) {
      console.error("Error logging in:", error);

      // Handle login errors here
      setError(true);
    }
    console.log("Would log in user", data);
  };

  return (
    <Row>
      <Col md={{ span: 6, offset: 3 }}>
        <Card>
          <Card.Body>
            <Card.Title className="mb-3">Log In</Card.Title>

            {/* Display error message if there's an error */}
            {error && (
              <Alert variant="danger">
                An error occurred during login. Please try again.
              </Alert>
            )}

            <Form onSubmit={handleSubmit(onLogin)}>
              <Form.Group controlId="email" className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  placeholder="snelhest2000@horsemail.com"
                  type="email"
                  {...register("email", {
                    required: "You have to enter your email",
                  })}
                />
                {errors.email && (
                  <p className="invalid">
                    {errors.email.message ?? "Invalid value"}
                  </p>
                )}
              </Form.Group>

              <Form.Group controlId="password" className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  autoComplete="new-password"
                  {...register("password", {
                    required:
                      "You're kidding, right? Enter your password, stupid",
                    minLength: {
                      value: 3,
                      message: "Please enter at least 3 characters",
                    },
                  })}
                />
                {errors.password && (
                  <p className="invalid">
                    {errors.password.message ?? "Invalid value"}
                  </p>
                )}
                <Form.Text>At least 6 characters</Form.Text>
              </Form.Group>

              <Button variant="primary" type="submit">
                Log In
              </Button>
            </Form>

            <div className="text-center">
              <Link to="/forgot-password">Forgot Password?</Link>
            </div>
          </Card.Body>
        </Card>

        <div className="text-center mt-3">
          Need an account? <Link to="/signup">Sign Up</Link>
        </div>
      </Col>
    </Row>
  );
};

export default LoginPage;
