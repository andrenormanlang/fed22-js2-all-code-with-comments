import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import useCreateBook from '../../hooks/useCreateBook'
import { NewBook } from '../../types/BooksAPI.types'

const currentYear = new Date().getFullYear()

const CreateBookForm = () => {
	const { handleSubmit, register, formState: { errors } } = useForm<NewBook>()
	const createAuthorMutation = useCreateBook()
	const { id } = useParams()
	const authorId = Number(id)

	const onCreateAuthorSubmit: SubmitHandler<NewBook> = (data) => {
		console.log("Submitted data:", data)

		createAuthorMutation.mutate({
			...data,
			authorId,
		})
	}

	return (
		<Form onSubmit={handleSubmit(onCreateAuthorSubmit)}>
			<Form.Group className="mb-3" controlId="title">
				<Form.Label>Title</Form.Label>
				<Form.Control
					type="text"
					placeholder="Vindarna över Vibbleby"
					{...register('title', {
						required: true,
						minLength: 3,
					})}
				/>
				{errors.title && <p className="text-danger">A book without a title is not a book</p>}
			</Form.Group>

			<Form.Group className="mb-3" controlId="pages">
				<Form.Label>Pages</Form.Label>
				<Form.Control
					type="number"
					{...register('pages', {
						required: true,
						min: 1,
					})}
				/>
				{errors.pages && <p className="text-danger">A book has to have at least 1 page</p>}
			</Form.Group>

			<Form.Group className="mb-3" controlId="published">
				<Form.Label>Published</Form.Label>
				<Form.Control
					type="number"
					{...register('published', {
						required: true,
						min: 1500,
						max: currentYear,
					})}
				/>
				{errors.published && <p className="text-danger">That is not a valid published year (has to be between 1500 and {currentYear})</p>}
			</Form.Group>

			<div className="d-flex justify-content-end">
				<Button
					variant="success"
					type="submit"
				>Create</Button>
			</div>
		</Form>
	)
}

export default CreateBookForm
