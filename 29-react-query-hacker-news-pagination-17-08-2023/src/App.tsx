import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Container from 'react-bootstrap/Container'
import { Routes, Route } from 'react-router-dom'
import GlobalFetchingSpinner from './components/GlobalFetchingSpinner'
import Navigation from './pages/partials/Navigation'
import HomePage from './pages/HomePage'
import PageNotFound from './pages/PageNotFound'
import RandomCatPage from './pages/RandomCatPage'
import SearchHNPage from './pages/SearchHNPage'

import './assets/scss/App.scss'

const App = () => {
	return (
		<div id="App">
			<Navigation />
			<GlobalFetchingSpinner />

			<Container className="py-3">
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/random-cat" element={<RandomCatPage />} />
					<Route path="/search-hn" element={<SearchHNPage />} />

					<Route path="*" element={<PageNotFound />} />
				</Routes>
			</Container>

			<ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
		</div>
	)
}

export default App

