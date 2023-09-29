import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { NavLink, Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import { NavDropdown } from 'react-bootstrap'

const Navigation = () => {
	const { currentUser, userName } = useAuth()

	return (
		<Navbar bg="dark" variant="dark" expand="sm">
			<Container>
				<Navbar.Brand as={Link} to="/">🔥 Firebase Todos</Navbar.Brand>

				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ms-auto">
					{currentUser ? (<>
							{/* User is logged in */}
							<Nav.Link as={NavLink} end to="/todos">Todos</Nav.Link>

							<NavDropdown
								title={userName}
							>
								<NavDropdown.Item as={NavLink} to="/update-profile">Update Profile</NavDropdown.Item>
								<NavDropdown.Divider />
								<NavDropdown.Item as={NavLink} to="/logout">Logout</NavDropdown.Item>
							</NavDropdown>
						</>) : (<>
							{/* No user is logged in */}
							<Nav.Link as={NavLink} to="/signup">Signup</Nav.Link>
							<Nav.Link as={NavLink} to="/login">Login</Nav.Link>
						</>)}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	)
}

export default Navigation
