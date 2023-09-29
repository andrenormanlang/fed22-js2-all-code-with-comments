import { useQuery } from '@tanstack/react-query'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { NavLink, Link } from 'react-router-dom'
import useThemeContext from '../hooks/useThemeContext'
import { getRandomDadJoke } from '../services/ICanHazDadJokeAPI'

const Navigation = () => {
	const { isDarkMode, toggleTheme } = useThemeContext()
	const { data } = useQuery(["random-dad-joke"], getRandomDadJoke)

	const handleToggleTheme = () => {
		toggleTheme()
	}

	return (
		<Navbar bg="dark" variant="dark" expand="md">
			<Container>
				<Navbar.Brand as={Link} to="/">{data && data.joke}</Navbar.Brand>

				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ms-auto">
						<Nav.Link as={NavLink} to="/i-can-haz-dad-joke">👨🏼 I Can Haz Dad Joke?</Nav.Link>

						<Button variant="outline-secondary" onClick={handleToggleTheme}>
							{isDarkMode ? '☀️' : '🌙'}
						</Button>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	)
}

export default Navigation

