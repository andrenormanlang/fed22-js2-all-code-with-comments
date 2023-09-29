import {useState} from 'react'

const ClickCounter =()	=>{

	const [clicks, setClicks] = useState(0)

	const handleButtonClick = () => {
		console.log('clicks before first state change:', clicks);

		// You have to use "previous state" function for it to work in sequential order and add accordingly!

		setClicks((prevState) => {return prevState +1}) //prevState = 0, return 1

		/* setClicks(clicks + 1) */

		setClicks((prevState) => {return prevState +1}) //prevState = 1, return 2

		console.log('clicks after first state change:', clicks);

		/* setClicks(clicks + 1) */ // what happens with clicks?? //nothing happens since it is asynchronous rendering?!

		// setClicks((prevState) => {return prevState +1})

		console.log('clicks after second state change:', clicks);

	}

	return(
		<>
		<p>You have clicked the button {clicks} times.</p>

		<button onClick={handleButtonClick} className="btn btn-success btn-lg">👆🏻 me!</button>

		</>
	)
}

export default ClickCounter
