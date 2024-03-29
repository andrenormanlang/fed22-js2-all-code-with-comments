import {  useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Alert from 'react-bootstrap/Alert'
import { Todo } from '../types'
import AddNewTodoForm from '../components/AddNewTodoForm'
import * as TodosAPI from '../services/TodosAPI'

const CreateTodoPage = () => {
	const [success, setSuccess] = useState<boolean|null>(null)
	const navigate = useNavigate()


	// Create a new todo in the API
	const addTodo = async (todo: Todo) => {
		try{
			const createdTodo = await TodosAPI.createTodo(todo)

			// useEffect(() =>{
			// 	setTimeout(() => {
			// 	navigate("/todos")
			// 	}, 2000)
			// }, [])

			setTimeout(() => {
				navigate("/todos")
				}, 2000)

			// using a !! has transformed the createdTodo from a type Todo which is not accepted to a boolean
			setSuccess(!!createdTodo)

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (err:any) {
			setSuccess(false)
		}

		// check result and set success accordingly
		// if(createdTodo) {
		// 	setSuccess(true)
		// } else {
		// 	setSuccess(false)
		// }
	}

	return (
		<>
			<h1 className="mb-3">Create a new Todo</h1>

			<AddNewTodoForm onAddTodo={addTodo} />

			{success === true && (
				<Alert variant="success" className='mt-3'>Todo created!</Alert>
			)}


			{success === false && (
				<Alert variant="warning" className='mt-3'>Todo could not be created.😢</Alert>
			)}

		</>
	)
}

export default CreateTodoPage
