import React from 'react'
import { Link } from 'react-router-dom'
import Table from 'react-bootstrap/Table'
import { Book } from '../types/BooksAPI.types'

interface IProps {
	books: Book[]
}

const BSBookTable: React.FC<IProps> = ({ books }) => {
	if (!books.length) {
		return <p>No books for you!</p>
	}

	return (
		<Table responsive striped bordered hover>
			<thead>
				<tr>
					<th>Title</th>
					<th>Author</th>
					<th>Author Birthdate</th>
					<th>Pages</th>
					<th>Published</th>
				</tr>
			</thead>
			<tbody>
				{books.map(book => (
					<tr key={book.id}>
						<td>{book.title}</td>
						<td>
							<Link to={`/authors/${book.author.id}`}>{book.author.name}</Link>
						</td>
						<td>{book.author.date_of_birth}</td>
						<td className="text-end">{book.pages} pages</td>
						<td>{book.published}</td>
					</tr>
				))}
			</tbody>
		</Table>
	)
}

export default BSBookTable

// export default BSBookTable
// import React from 'react'
// import Table from 'react-bootstrap/Table'
// import { Link } from 'react-router-dom'
// import { Book } from '../types/BooksAPI.types'
// // import { Button } from 'react-bootstrap'

// interface IProps {
// 	books: Book[]
// }

// const BSBookTable: React.FC<IProps> = ({ books }) => {
// 	if (!books.length) {
// 		return <p>No books for you!</p>
// 	}

// 	return (
// 		<Table responsive striped bordered hover>
// 			<thead>
// 				<tr>
// 				<th>Title</th>
// 					<th>Author</th>
// 					<th>Author Birthdate</th>
// 					<th>Pages</th>
// 					<th>Published</th>
// 				</tr>
// 			</thead>
// 			<tbody>
// 				{books && books.map(book => (
// 					<tr key={book.id}>
// 						<td>{book.title}</td>
// 						<td>
// 							<Link to={`/authors/${book.author.id}`}>{book.author.name}</Link>
// 						</td>
// 						<td>{book.author.date_of_birth}</td>
// 						<td className="text-end">
// 							{book.pages
// 								? `${book.pages} pages`
// 								: 'N/A'}

// 						</td>
// 						<td>{book.published}</td>
// 						{/* <td>
// 							<Button variant="primary">View</Button>
// 							<Button variant="warning">Edit</Button>
// 						</td> */}
// 					</tr>
// 				))}
// 				{/* <tr>
// 					<td>My book title</td>
// 					<td>Some author</td>
// 					<td>1</td>
// 					<td>2023</td>
// 				</tr> */}
// 			</tbody>
// 		</Table>
// 	)
// }

// export default BSBookTable

