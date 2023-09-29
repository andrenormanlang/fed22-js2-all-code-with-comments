import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { SignUpCredentials } from "../types/User.types";

const SignupPage = () => {
	const {
		handleSubmit,
		register,
		watch,
		formState: { errors },
	} = useForm<SignUpCredentials>();

	const { signup } = useAuth();
	const navigate = useNavigate();
	const [error, setError] = useState(false);

	// Watch the current value of `password` form field
	const passwordRef = useRef("");
	passwordRef.current = watch("password");
	const onSignUp: SubmitHandler<SignUpCredentials> = async data => {
		console.log("Would sign up user", data);

		try {
			const userCredential = await signup(data.email, data.password);
			console.log("Yaaaaay I got an account!!!", userCredential);

			navigate("/");
		} catch (error) {
			console.error("Error signing up:", error);

			// Handle signup errors here
			setError(true);
		}
	};

	return (
		<Row>
			<Col md={{ span: 6, offset: 3 }}>
				<Card>
					<Card.Body>
						<Card.Title className="mb-3">Sign Up</Card.Title>
						{errors && (
							<Alert variant="danger">
								An error occurred during signup. Please try
								again.
							</Alert>
						)}

						<Form
							onSubmit={handleSubmit(onSignUp)} /* noValidate */
						>
							<Form.Group controlId="email" className="mb-3">
								<Form.Label>Email</Form.Label>
								<Form.Control
									placeholder="email@email.se"
									type="email"
									{...register("email", {
										required: "You have to enter an email",
									})}
								/>
								{errors.email && (
									<p className="invalid">
										{errors.email.message ??
											"Invalid value"}
									</p>
								)}
							</Form.Group>

							<Form.Group controlId="email" className="mb-3">
								<Form.Label>Password</Form.Label>
								<Form.Control
									// placeholder='' // CHECK FORM.TEXT BELOW
									type="password"
									autoComplete="off"
									{...register("password", {
										required: "Enter a pw you idiot",
										minLength: {
											value: 3,
											message:
												"Please enter at least 3 characters",
										},
									})}
								/>
								{errors.password && (
									<p className="invalid">
										{errors.password.message ??
											"Invalid value"}
									</p>
								)}
								<Form.Text>At least 6 characters</Form.Text>
							</Form.Group>

							<Form.Group controlId="email" className="mb-3">
								<Form.Label>Confirm Password</Form.Label>
								<Form.Control
									type="password"
									{...register("passwordConfirm", {
										required: "Enter a pw again.....",
										minLength: {
											value: 3,
											message:
												"Please enter at least 3 characters",
										},
										validate: value => {
											return (
												value === passwordRef.current ||
												"The password does not match🤦‍♂️"
											);
										},
									})}
								/>
								{errors.passwordConfirm && (
									<p className="invalid">
										{errors.passwordConfirm.message ??
											"Invalid value"}
									</p>
								)}
							</Form.Group>

							<Button variant="primary" type="submit">
								Create Account
							</Button>
						</Form>
						{/* <div className="text-center">
						<Link to="/forgot-password">Forgot Password?</Link>
					</div> */}
					</Card.Body>
				</Card>

				<div className="text-center mt-3">
					Already have an account? <Link to="/login">Log In</Link>
				</div>
			</Col>
		</Row>
	);
};

export default SignupPage;
