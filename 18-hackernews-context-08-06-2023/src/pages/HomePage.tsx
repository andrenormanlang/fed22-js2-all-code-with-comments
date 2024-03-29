import { useContext } from 'react'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import { ThemeContext } from '../contexts/ThemeContextProvider'
import useThemeContext from '../hooks/useThemeContext'



//Not best practice to Toggle Button using a ? such as before
const HomePage = () => {
	// const { isDarkMode, toggleTheme } = useContext(ThemeContext)
	const { isDarkMode, toggleTheme } = useThemeContext()

	const handleToggleTheme = () => {
		// if (toggleTheme) {
		// 	toggleTheme()
		// }
		// // toggleTheme?.()
		toggleTheme()
	}

	return (
		<>
			<h1>Welcome to Hacker News 🕵🏻‍♂️🤓👀!</h1>

			<p>Your theme is: {isDarkMode ? 'dark 🌙' : 'light ☀️'}</p>

			<Button className='' variant="warning" onClick={handleToggleTheme}>Switch theme</Button>

			<Link to="/search">
				<Button variant="primary">Use the Search, you must!</Button>
			</Link>
		</>
	)
}

export default HomePage
