import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter} from 'react-router-dom'
import {QueryClientProvider, QueryClient} from '@tanstack/react-query'


const queryClient = new QueryClient({
	defaultOptions:{
		queries: {
			refetchOnWindowFocus: false,
			// staleTime: 5 * 60 * 1000, // 5 minutes
			staleTime: 15 * 1000, // 15 seconds
		}
	}
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</QueryClientProvider>
	</React.StrictMode>,
)

// import {HashRouter} from 'react-router-dom'
// Instead of:	 https://localhost:5173/random-cat
// Have:		https://localhost:5173/#/random-cat
