
import { useState } from 'react'
import './App.css'

/* type Post ={
	id: number,
	title: string,
	likes: number
}
 */

/* Can use index instead of id */
type Post ={
	title: string,
	likes: number
}

/* const posts: Post[] = [

] */

/* const posts: Post[] =[
	{id: 1, title: "React Rocks 🤘🏾", likes: 1337},
	{id: 2, title: "JSX Rocks Even More 🤘🏾", likes: 42},
	{id: 1, title: "Got state? ", dislikes: 3},

] */

const App = () => {
	const [msg, setMsg] = useState("Hi Mom, I'm stateful!")
	/* let clicks = 0 */
	/* console.log("App is being rendered"); */
	const [clicks, setClicks] = useState(0)
/* 	const [posts, setPosts] = useState<Post[]>([
		{id: 1, title: "React Rocks 🤘🏾", likes: 1337},
		{id: 2, title: "JSX Rocks Even More 🤘🏾", likes: 42},
		{id: 3, title: "Got state? ", likes: 3},

	]) */
	const [posts, setPosts] = useState<Post[]>([
		{ title: "React Rocks 🤘🏾", likes: 1337},
		{ title: "JSX Rocks Even More 🤘🏾", likes: 42},
		{ title: "Got state? ", likes: 3},

	])

	const [salary, setSalary] = useState(10)


	const handleButtonClick = () => {
/* 		console.log('You clicked the button, good boy!');
		setMsg("Bye mom") */
		setClicks(clicks + 1)
		/* console.log('Clicks:', clicks) */
	}

	const handleChangeSalary =(amount: number) =>{
		if (salary + amount < 5 ){
			return setSalary(5)
		}

		setSalary(salary + amount)
	}

	/* Best way is to use function above that takes in account the increase and decrease in one function */
	/* const handleIncreaseSalary =(amount: number) =>{
		setSalary(salary + amount)
	} */

	/* const handleDecreaseSalary =(amount: number) =>{
		setSalary(salary - amount)
	} */

	/* const handleLowSalaryIncrease = () =>{

		setSalary(salary+1)
	}

	const handleLowSalaryDecrease = () =>{

		setSalary(salary-1)
	}

	const handleHighSalaryIncrease = () =>{

		setSalary(salary+5)
	}

	const handleHighSalaryDecrease = () =>{

		setSalary(salary-5)
	} */

	/* const hiDad =() =>{setMsg("Hi dad!")} */

	console.log('Rendering...');

	// WRONG WAY --> document.querySelector('button')?.addEventListener('click', handleButtonClick)

	return (
		<div className='App'>
			<h1>React Basics</h1>
			<h2>{msg}</h2>
			<p>You have clicked the button {clicks} times.</p>

			{/* Correct way of adding is the below in {} and not with document query selector */}
			<button onClick={handleButtonClick} className='btn btn-success btn-lg'>👇 ME!</button>
			{/*<button onClick={()=>{setClicks(clicks +1)}} className='btn btn-success btn-lg'>👇 ME!</button>*/}

			<button onClick={() =>{setMsg("Hi dad!")}} className='btn btn-warning btn-lg'>🤚🏾🖐🏾 Hi dad!</button>

			<hr /> {/* skipping lines in jsx */}

			<p>Salary per hour: {salary} &euro;</p>

			{/* {salary < 10 ? <p>TOO LOW!</p> : <p>🤑</p>} */}
			{salary <10 &&(
				<div className="alert alert-warning">You might want a second job?</div>
			)}

			<div className="buttons">
				<div className="mb-1">
					<button
						className="btn btn-primary btn-lg"
						onClick=/* {handleLowSalaryIncrease} */ /* {()=> {setSalary(salary +1)}} */
						{()=>{handleChangeSalary(1)}}
					>Raise 1 &euro; 🤑</button>
					<button
						className="btn btn-warning btn-lg"
						onClick=/* {handleLowSalaryDecrease} */ /* {()=> {setSalary(salary -1)}} */
						{()=>{handleChangeSalary(-1)}}
					>Decrease 1 &euro; 😢</button>
				</div>

				<div className="mb-1">
					<button
						className="btn btn-success btn-lg"
						onClick=/* {handleHighSalaryIncrease} */ /* {()=> {setSalary(salary +5)}} */
						{()=>{handleChangeSalary(5)}}
					>Raise 5 &euro; 🤑🤑🤑</button>
					<button
						className="btn btn-danger btn-lg"
						onClick=/* {handleHighSalaryDecrease} */ /* {()=> {setSalary(salary -5)}} */ {()=>{handleChangeSalary(-5)}}
					>Decrease 5 &euro; 😢😢😢</button>
				</div>
			</div>

			<hr />

			<h2>Posts</h2>
			<ul className='float-start'>
				{/* {
					posts.map(post =>(
						<li key={post.id}>
						{post.title}({post.likes} likes)
						</li>
					))
				} */}
				{
					posts.map((post, index) =>(
						<li key={index} >
							{post.title}({post.likes} likes)
						</li>
					))
				}
			</ul>
		</div>

	)


}

export default App
