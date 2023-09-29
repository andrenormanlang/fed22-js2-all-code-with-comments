import {useContext} from 'react'
import classNames from 'classNames'
import Container from 'react-bootstrap/Container'
import { Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import HomePage from './pages/HomePage'
import NotFound from './pages/NotFound'
import SearchPage from './pages/SearchPage'
import RandomDogPage from './pages/RandomDogPage'
import './assets/scss/App.scss'
import { ThemeContext } from './contexts/ThemeContextProvider'
import useThemeContext from './hooks/useThemeContext'

const App = () => {
	// const {isDarkMode} = useContext(ThemeContext)
	const { isDarkMode } = useThemeContext()

	// Insalled npm i classnames <https://www.npmjs.com/package/classnames>
	const cssClasses = classNames({
		'app': true,
		'bg-dark text-white': isDarkMode,
		'not-dark-mode': !isDarkMode
	})

	return (
		// <div id="App" className={ isDarkMode ? 'bg-dark text-white' : ''}>
		<div id="App" className={ cssClasses}>

			<Navigation />

			<Container className="py-3">
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/random-dog" element={<RandomDogPage />} />
					<Route path="/search" element={<SearchPage />} />

					<Route path="*" element={<NotFound />} />
				</Routes>
			</Container>
		</div>
	)
}

export default App
