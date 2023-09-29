import { useState, useEffect } from 'react'
import './assets/scss/App.scss'

function App() {

	// const [time, setTime] = useState(new Date().toLocaleTimeString())
	// const [time, setTime] = useState("") //INCORRECT WAY!
	// const time = new Date().toLocaleTimeString()
	// let time = new Date().toLocaleTimeString()

	// setInterval(() => {
		// time = new Date().toLocaleTimeString()
		// setTime(new Date().toLocaleTimeString())  // INCORRECT WAY!
	// 	console.log("tick", time)
	// }, 1000)

	// const [time, setTime] = useState("")

	const [time, setTime] = useState(() => {
		console.log("I'm initing")
		return new Date().toLocaleTimeString()
	})

	useEffect(() => {
		console.log("Starting clock...")

		setInterval(() => {
			setTime(new Date().toLocaleTimeString())
			console.log("tick")
		}, 1000)
	}, [])

	useEffect(() => {
		document.title = time
	}, [time])


	return (
		<div className="container">
			<div className="display-1 text-center">
				{/* {time} */}
				{/* RENDERS ONLY ONCE! */}
				{time}
			</div>
		</div>
	)
}

export default App
