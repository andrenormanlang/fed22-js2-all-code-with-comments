import { useState } from 'react'
const Salary= () => {
	const [salary, setSalary] = useState(10)
	//const [showSalary, setShowSalary] = useState(false)
	const [showSalary, setShowSalary] = useState(false) //much better way for doing a transition display!

	const handleChangeSalary = (amount: number) => {
		if (salary + amount < 5) {
			return setSalary(5)
		}

		setSalary(salary + amount)
	}

	return (
			<>
			{/*
			<button className="btn btn-primary m-1" onClick={()=>setShowSalary(true)}>Show salary</button>
			<button className="btn btn-primary" onClick={()=>setShowSalary(false)}>Hide salary</button>
			*/}

			<button className="btn btn-primary m-2" onClick={
				() => {
					setShowSalary(!showSalary)
				}
			}> {showSalary ? "Hide salary" : "Show salary"}
			</button>



			{showSalary && (
				<>
					<h2>Salary</h2>

					<p>Salary per hour: {salary} &euro;</p>

					{salary < 10 && (
						<div className="alert alert-warning">You might want to change job?</div>
					)}

					<div className="buttons">
						<div className="mb-1   d-flex flex-column">
							<button
								className="btn btn-primary btn-lg m-1"
								onClick={() => { handleChangeSalary(1) }}
							>Raise 1 &euro; 🤑</button>
							<button
								className="btn btn-secondary btn-lg m-1"
								onClick={() => { handleChangeSalary(-1) }}
							>Decrease 1 &euro; 😢</button>
						</div>

						<div className="mb-1  d-flex flex-column">
							<button
								className="btn btn-success btn-lg m-1"
								onClick={() => { handleChangeSalary(5) }}
							>Raise 5 &euro; 🤑🤑🤑</button>
							<button
								className="btn btn-danger btn-lg m-1"
								onClick={() => { handleChangeSalary(-5) }}
							>Decrease 5 &euro; 😢😢😢</button>
						</div>
					</div>
				</>
			)}</>


	)
}

export default Salary
