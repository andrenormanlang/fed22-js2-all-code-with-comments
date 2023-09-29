// import { useContext} from 'react'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'
import { NavLink, Link } from 'react-router-dom'
import useThemeContext from '../hooks/useThemeContext'
// 'import { ThemeContext } from '../contexts/ThemeContextProvider'


const Navigation = () => {
	const {isDarkMode, toggleTheme} = useThemeContext()

	const handleToggleTheme = () => {
		toggleTheme()
	}

	return (
		<Navbar bg="dark" variant="dark" expand="md">
			<Container>
				<Navbar.Brand as={Link} to="/">Hacker News</Navbar.Brand>

				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ms-auto">
						<Nav.Link as={NavLink} to="/random-dog">🐶 Random dog</Nav.Link>
						<Nav.Link as={NavLink} end to="/search">Search</Nav.Link>
						<Button className="outline-secondary" onClick={handleToggleTheme}>
							{isDarkMode ? '🌞' : '🌛'}
						</Button>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	)
}

export default Navigation
