import { FirebaseError } from 'firebase/app'
import { useRef, useState } from 'react'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Container from "react-bootstrap/Container"
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import { useForm, SubmitHandler } from 'react-hook-form'
import useAuth from '../hooks/useAuth'
import { UpdateProfileFormData } from '../types/User.types'
import { toast } from "react-toastify"

const UpdateProfile = () => {
	const [errorMessage, setErrorMessage] = useState<string | null>(null)
	const [loading, setLoading] = useState(false)
	const { handleSubmit, register, watch, formState: { errors } } = useForm<UpdateProfileFormData>()
	const { setDisplayName, setEmail, setPassword, reloadUser } = useAuth()

	// Watch the current value of `password` form field
	const passwordRef = useRef<string | null>();
	passwordRef.current = watch('password')

	const onUpdateProfile: SubmitHandler<UpdateProfileFormData> = async (data) => {
		// Clear any previous error state
		setErrorMessage(null)

		// Update user profile
	try {
		// Disable update-button while update is in progress
		setLoading(true)

		// Update displayName *ONLY* if it has changed
		if (data.displayName) {
			await setDisplayName(data.displayName);
		}

		// Update email *ONLY* if it has changed
		if (data.email) {
			await setEmail(data.email);
		}
		if (data.password) {
			// Use the passwordRef with a null check
			await setPassword(passwordRef.current || "");
		}
		// Reload user data after updating email or password
		await reloadUser()

		// Show success toast 🥂
		toast.success("Profile updated successfully!");

		// Enable update-button again
		setLoading(false);

		// Refresh the page to reflect the updated profile
		window.location.reload();


	} catch (error) {
		if (error instanceof FirebaseError) {
			setErrorMessage(error.message)
		} else {
			setErrorMessage("Something went wrong. Have you tried turning it off and on again?")
		}
		setLoading(false)
	}
}

	return (
		<Container className="py-3 center-y">
			<Row>
				<Col md={{ span: 6, offset: 3 }}>
					<Card>
						<Card.Body>
							<Card.Title className="mb-3">Update Profile</Card.Title>

							{errorMessage && (<Alert variant="danger">{errorMessage}</Alert>)}

							<Form onSubmit={handleSubmit(onUpdateProfile)}>
								{/*
									Fill the displayName, photoURL, and email form fields with their current value!
								*/}
								<Form.Group controlId="displayName" className="mb-3">
									<Form.Label>Name</Form.Label>
									<Form.Control
										placeholder="Sean Banan"
										type="text"
										{...register('displayName')}
									/>
								</Form.Group>

								<Form.Group controlId="photoURL" className="mb-3">
									<Form.Label>Photo URL</Form.Label>
									<Form.Control
										placeholder="https://www.chiquita.com/Bananana.jpg"
										type="url"
										{...register('photoURL')}
									/>
								</Form.Group>

								<Form.Group controlId="email" className="mb-3">
									<Form.Label>Email</Form.Label>
									<Form.Control
										placeholder="snelhest2000@horsemail.com"
										type="email"
										{...register('email')}
									/>
								</Form.Group>

								<Form.Group controlId="password" className="mb-3">
									<Form.Label>Password</Form.Label>
									<Form.Control
										type="password"
										autoComplete="new-password"
										{...register('password', {
											minLength: {
												value: 6,
												message: "Please enter at least 6 characters"
											},
										})}
									/>
									{errors.password && <p className="invalid">{errors.password.message ?? "Invalid value"}</p>}
									<Form.Text>At least 6 characters</Form.Text>
								</Form.Group>

								<Form.Group controlId="confirmPassword" className="mb-3">
									<Form.Label>Confirm Password</Form.Label>
									<Form.Control
										type="password"
										autoComplete="off"
										{...register('passwordConfirm', {
											minLength: {
												value: 6,
												message: "Please enter at least 6 characters"
											},
											validate: (value) => {
												return value === passwordRef.current || "The passwords does not match 🤦🏼‍♂️"
											}
										})}
									/>
									{errors.passwordConfirm && <p className="invalid">{errors.passwordConfirm.message ?? "Invalid value"}</p>}
								</Form.Group>
								<Button
									disabled={loading}
									variant="primary"
									type="submit"
								>
									{loading
										? "Updating profile..."
										: "Save"}
								</Button>
							</Form>

						</Card.Body>
					</Card>

				</Col>
			</Row>
		</Container>
	)
}

export default UpdateProfile


