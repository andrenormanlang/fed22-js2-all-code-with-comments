import { createColumnHelper } from '@tanstack/react-table'
import WarningAlert from '../components/alerts/WarningAlert'
// import TanstackBasicTable from '../components/TanstackBasicTable'
import useAuthors from '../hooks/useAuthors'
import { Author } from '../types/BooksAPI.types'
import BSAuthorTable from '../components/BSAuthorTable'
// import TanstackSortableTable from '../components/TanStackSortableTable'
import CreateAuthorForm from '../components/forms/CreateAuthorForm'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

/*
const columns: ColumnDef<Author>[] = [
	{
		accessorKey: 'name',
		header: 'Name',
	},
	{
		accessorKey: 'date_of_birth',
		header: 'Date of birth',
	},
]
*/

const columnHelper = createColumnHelper<Author>()

const columns = [
	columnHelper.accessor('id', {
		header: 'ID',
	}),
	columnHelper.group({
		header: 'Author Details',
		columns: [
			columnHelper.accessor('name', {
				header: 'Name',
				cell: props => (
					<Link to={`/authors/${props.row.original.id}`}>
						{props.getValue()}
					</Link>
				)
			}),
			columnHelper.accessor('date_of_birth', {
				header: 'Date of birth',
			}),
		],
	}),
	columnHelper.display({
		id: 'actions',
		cell: props => (
			<div className="flex justify-end">
				<Link className="btn btn-primary btn-sm" to={`/authors/${props.row.original.id}`}>View</Link>
			</div>
		),
	})
]
const AuthorsPage = () => {
	const { data: authors, isError, isLoading } = useAuthors()

	return (
		<>
			<h1 className="mb-3">Authors</h1>

			{isError && (
				<WarningAlert>
					An terrible, inexplicable error occurred while fetching authors. It wasn't me!
				</WarningAlert>
			)}

			{isLoading && (
				<p>Loading authors...</p>
			)}

			{/* {authors && <TanstackBasicTable columns={columns} data={authors} />} */}
			{/* {authors && <TanstackSortableTable columns={columns} data={authors} />} */}
			{authors && <BSAuthorTable authors={authors} />}

			<hr className="mb-5" />

			<Card>
				<Card.Body>
					<Card.Title>Create Author</Card.Title>
					<CreateAuthorForm />
				</Card.Body>
			</Card>
		</>
	)
}

export default AuthorsPage
