import React from 'react'
import forecastBanner from '../assets/images/forecast-banner.png'
import { ICurrentWeather } from '../types'
import dayBanner from '../assets/images/day.svg'
import nightBanner from '../assets/images/night.svg'


interface IProps{
	data: ICurrentWeather
}

const Forecast: React.FC<IProps> = ({data}) => {

	const now = Math.round(Date.now() / 1000)
	const banner = now > data.sys.sunrise && now < data.sys.sunset
		? dayBanner
		: nightBanner

	// const banner = data.dt > data.sys.sunrise && data.dt < data.sys.sunset
	// 	? dayBanner
	// 	: nightBanner

	const freshness = new Date(data.dt * 1000).toLocaleString()

	// const weatherIconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

	return (
		<div id="forecast">
			<div className="card">

				{/* <img src={forecastBanner} className="card-img-top" alt="Daytime, nighttime, daytime, nighttime"/> */}
				<img src={banner} className="card-img-top" alt="Daytime, nighttime, daytime, nighttime"/>
				<div className="card-body">
					<h5 className="card-title" id="location">
						<span id="city">{data.name}</span>,
						<span id="country">{data.sys.country}</span>
					</h5>
					<p className="temp">
						<span id="temperature">{data.main.temp}</span>
						&deg;C
					</p>
					<p className="humidity">
						<span id="humidity">{data.main.humidity}</span> % humidity
					</p>
					<p className="wind">
						<span id="windspeed">{data.wind.speed}</span> m/s {data.wind.deg}&deg;
					</p>

					<ul className="conditions">
						{data.weather.map(condition => {
							const weatherIconUrl = `https://openweathermap.org/img/wn/${condition.icon}@2x.png`

							return (
								<li key={condition.id}>
									<img
										src={weatherIconUrl}
										title={condition.main}
										alt={condition.main}
									/>
									{condition.description}
								</li>
							)
						})}
					</ul>

					<p className="text-muted small">
						<span>{freshness}</span>
					</p>
					
					{/* OTHER WAY OF DOING IT */}
					{/* <ul className="conditions">
						{data.weather.map(
							item => (
								<li className='text-capitalize' key={item.id}>
									<img src={`https://openweathermap.org/img/wn/${item.icon}@2x.png`}
									title={item.main}
									alt={item.main}/>
									{item.description}
								</li>
							)
						)
						}
					</ul> */}


					{/* <p className="text-muted small">
						<span>
							Data from: {new Date(data.dt * 1000).toLocaleString()}
						</span>
					</p> */}

					{/*
					<ul className="conditions">
						<li><img src="" title="CONDITION_MAIN" alt="CONDITION_MAIN">CONDITION_DESCRIPTION</li>
					</ul>

					<p className="text-muted small">
						<span>
							1970-01-01 13:37:00
						</span>
					</p>
					*/}
				</div>

			</div>
		</div>
	)
}

export default Forecast
