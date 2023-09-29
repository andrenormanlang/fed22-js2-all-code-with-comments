import  { useState, ChangeEvent } from 'react';
import { toast } from 'react-toastify';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Card } from "react-bootstrap";
import useAuth from '../hooks/useAuth';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState<string>('');
  const { resetPassword } = useAuth()

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleResetPassword = async () => {
    if (!email) {
      toast.error('Please enter your email.');
      return;
    }

    // Call the resetPassword function from the context
    resetPassword(email);
  };

	return (
		<Container className="center-y">
			<div className="d-flex justify-content-center">
				<Card className="">
					<Card.Body>
						<h2 className="text-center">Forgot Password</h2>
						<p className="text-center">
							Enter your email address to reset your password.
						</p>
						<Form>
							<Form.Group controlId="email">
								<Form.Control
									type="email"
									placeholder="Email"
									value={email}
									onChange={handleEmailChange}
								/>
							</Form.Group>
							<Button
								className="mt-2"
								variant="primary"
								onClick={handleResetPassword}

							>
								Reset Password
							</Button>
						</Form>
					</Card.Body>
				</Card>
			</div>
		</Container>
	);
};

export default ForgotPasswordPage;
