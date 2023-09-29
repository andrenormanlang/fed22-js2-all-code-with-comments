import React, {useState} from 'react'

interface IProps {
	onSearch: (location: string) => void

}

const SearchCity: React.FC<IProps> = ({onSearch}) => {
	const [city, setCity] = useState("")

	// const cityName = city.trim()

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) =>{
		e.preventDefault()
		// console.log("You've searched good for you!");

		// pass `city` to parent component (App)
		onSearch(city)

		// clear `city` state
		setCity(" ")

	}

	const tooFewCharacters = city.trim().length > 0 && city.trim().length < 3

	return (
		<div id="search-wrapper">
			<form id="search-form"onSubmit={handleSubmit}>
				<div className="input-group">
					<input
						onChange={e => {setCity(e.target.value)}}
						value={city}
						type="text"
						className="form-control"
						placeholder="Enter city to search for" aria-label="City" aria-details="Search for city to show current weather for."

					/>

					<button
						type="submit"
						className="btn btn-success"
						disabled={city.trim().length < 3}
						// disabled={!cityName || cityName.length < 3}
					>🔍</button>
					
				</div>
				{tooFewCharacters && <div className="form-text">Please enter at least 3 characters</div>}
			</form>
		</div>
	)
}

export default SearchCity
