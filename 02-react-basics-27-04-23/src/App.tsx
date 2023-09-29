import { useState } from 'react'
import ClickCounter from './components/ClickCounter'
import './App.css'
import Salary from './components/Salary'
import Posts from './components/Posts'

type Post = {
	title: string
	likes: number
}

const App = () => {
	const [msg, setMsg] = useState("Hi mom, I'm stateful!")
	const [showMsg, setShowMsg] = useState(false)







	console.log("Rendering...")

	return (
		<div className="App">
		<h1>React Basics</h1>


		<h2>{msg}</h2>

		<div className='d-flex flex-column ms-2'>


		<button onClick={ () => { setMsg(msg === 'Hi dad!' ?'Hi mom, I´m stateful' : 'Hi dad!'), setShowMsg(!showMsg) } } className="btn btn-warning btn-lg mt-2">
		Hi Dad
		</button>

		<hr />

		<ClickCounter/>
		<hr />
		<Salary />

		</div>
		<hr />
		<Posts />

	</div>
	)
}

export default App
