import { useEffect, useState } from 'react'
import Forecast from './components/Forecast'
import SearchCity from './components/SearchCity'
import { getCurrentWeather } from './services/owmapi'
import { ICurrentWeather } from './types'
import Airplane from './assets/images/747.svg'
import './assets/scss/App.scss'

function App() {
	const [currentWeather,setCurrentWeather] = useState<ICurrentWeather|null>(null)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string|false>(false)
	// const [error, setError] = useState(false)
	// const [errorMsg, setErrorMsg] = useState({status: 0, message: ""})
	
	const handleSearch = async (location: string) => {
		// console.log("Want to search for: " , location);
		setCurrentWeather(null) // not load the new weather while searching
		setError(false)
		setLoading(true)
		
		try {
			// call API and ask for weather in `location`
			const data = await getCurrentWeather(location)

			// update `currentWeather`-state with the current weather
			setCurrentWeather(data)
		
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (err: any) {
			setError(err.message)
		}



		// call API and ask for weather in location
		// const data = await getCurrentWeather(location)
		// console.log("Weather in location:", data);

		// if (data.cod !== 200) {
		// 	setError(true)
		// 	setErrorMsg({
		// 		status: data.cod,
		// 		message: data.message
		// 	})
		// 	setLoading(false)
		// 	return
		// }

		setLoading(false)
		// update `currentWeather` -state wit the current weather
		// setCurrentWeather(data)



	}

	return (
		<div id="app" className="container">


			<SearchCity onSearch={handleSearch} />


			{error && (
				<div className="alert alert-warning">
					{error}
				</div>
			)}


			{loading && <img src={Airplane} className="img-fluid py-5 w-100" alt="flying airplane" />}

			{currentWeather && <Forecast data={currentWeather} />}

			{/* {error && <div className='alert alert-warning'>Something went wrong: {errorMsg.status} <span className='text-capitalize'>{errorMsg.message}</span></div>} */}
			
			{/* <img src={Airplane} className="img-fluid py-5 w-100"/> */}

			{/* <div className="alert alert-warning"> OH NOOOO!!</div> */}

			{/* {currentWeather && !loading && !error && <Forecast data={currentWeather} />} */}

			
		</div>
	)
}

export default App
