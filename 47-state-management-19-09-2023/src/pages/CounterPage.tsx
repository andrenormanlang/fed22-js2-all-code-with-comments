import { useState } from 'react'
import Container from "react-bootstrap/Container"
import PointsCounter from "../components/PointsCounter"

const CounterPage = () => {
	const [points, setPoints] = useState(0)

	const modifyPoints = (amount: number) => {
		setPoints(prevPoints => prevPoints + amount)
	}

	return (
		<Container className="py-3">
			<h1>Counter</h1>

			<div className="mb-5">
				<h2>Home</h2>
				<PointsCounter points={points} modify={modifyPoints} />
			</div>

			<div className="mb-5">
				<h2>Away</h2>
				<PointsCounter points={points} modify={modifyPoints} />
			</div>
		</Container>
	)
}

export default CounterPage

