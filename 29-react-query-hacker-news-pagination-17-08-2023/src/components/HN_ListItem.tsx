import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup'
import { HN_SearchHit } from '../types/HackerNewsAPI.types'

interface IProps {
	item: HN_SearchHit,
}

const dateFormatter = new Intl.DateTimeFormat(undefined, {
	dateStyle: 'full',
	timeStyle: 'short',
	// year: 'numeric',
	// month: 'long',
	// day: 'numeric',
	// hour: 'numeric',
	// minute: 'numeric',
	// second: 'numeric',
	// timeZoneName: 'short',
})

const isoToFormattedString = (isoDate: string) => {
	const date = new Date(isoDate)
	return dateFormatter.format(date)
}

const HN_ListItem: React.FC<IProps> = ({ item }) => {
	return (
		<ListGroup.Item
			action
			href={item.url}
		>
			<h2 className="h3">{item.title}</h2>
			<div className="d-flex justify-content-between align-items-end">
				<span className="text-muted smaller">
					{item.points} points by {item.author}
				</span>
				<span className="text-muted small">
					{isoToFormattedString(item.created_at)}
				</span>
			</div>
		</ListGroup.Item>
	)
}

export default HN_ListItem
