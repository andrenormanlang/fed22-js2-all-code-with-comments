import React from 'react'
import Button from 'react-bootstrap/Button'

type PointsCounterProps = {
	points: number
	modify: (amount: number) => void
}

const PointsCounter: React.FC<PointsCounterProps> = ({ points, modify }) => {
	return (
		<div className="counter">
			<Button variant="warning" onClick={() => modify(-1)}>-</Button>

			<span className="points">{points}</span>

			<Button variant="success" onClick={() => modify(+1)}>+</Button>
		</div>
	)
}

export default PointsCounter
