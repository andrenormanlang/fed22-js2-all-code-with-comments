import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { NavLink, Link } from 'react-router-dom'


// https://react-bootstrap.github.io/components/navbar/


const Navigation = () => {
	return (
		<Navbar bg="dark" variant="dark" expand="md">
			<Container>
				<Navbar.Brand as={Link} to="/">📝 Better Todos</Navbar.Brand>

				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ms-auto">
						{/* Using end the Todos endpoint doesn´t appear as active in the other endpoints */}
						<Nav.Link as={NavLink} end to="/todos">Todos</Nav.Link>
						<Nav.Link as={NavLink} to="/todos/create">Create Todo</Nav.Link>
						{/* or use a link such as create_todo */}
						{/* <Nav.Link as={NavLink} end to="/todos">Todos</Nav.Link>
						<Nav.Link as={NavLink} to="/create_todo">Create Todo</Nav.Link> */}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	)
}

export default Navigation
