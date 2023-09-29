// import { useEffect, useState } from 'react'
// import { Todo } from '../types/TodosAPI.types'
import {useQuery, useMutation} from '@tanstack/react-query'
// import {useQuery} from '@tanstack/react-query'
import Alert from 'react-bootstrap/Alert'
import ListGroup from 'react-bootstrap/ListGroup'
// import { Link, useLocation, useSearchParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
// import AddNewTodoForm from '../components/AddNewTodoForm'
// import AutoDismissingAlert from '../components/AutoDismissingAlert'
import * as TodosAPI from '../services/TodosAPI'
import AddNewTodoForm from '../components/AddNewTodoForm'
import { Todo } from '../types/TodosAPI.types'
// import { Todo } from '../types/TodosAPI.types'

const TodosPage = () => {
	// const [todos, setTodos] = useState<Todos|null>(null)
	// const location = useLocation()
	// const [searchParams, setSearchParams] = useSearchParams()
	// const searchParams_deletedTodo = searchParams.get("deleted")
	// const deletedTodo = Boolean(searchParams_deletedTodo)

	// Get todos from api
	// OWN SOLUTION!
	// const { isLoading, isError, data: todos } = useQuery({
  //   queryKey: ['todos'],
  //   queryFn: TodosAPI.getTodos,
  // })

	const {
		data: todos,
		isError,
		refetch
	} = useQuery(['todos'], TodosAPI.getTodos)

  // if (isLoading) {
  //   return <span>Loading...</span>
  // }

  // // sort alphabetically by title
	// data.sort((a, b) => a.title.localeCompare(b.title))

	// // sort by completed status
	// data.sort((a, b) => Number(a.completed) - Number(b.completed))

	// Create a new todo in the API

  const createTodoMutation = useMutation(TodosAPI.createTodo);

	const addTodo = async (todo: Todo) => {
    try {
      await createTodoMutation.mutateAsync(todo);
      refetch(); // Refetch todos after adding a new todo
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

	// TodosAPI.createTodo(todo)
	// 	getTodos()
	// fetch todos when App is being mounted

	return (
		<>
			<h1 className="mb-3">Todos</h1>

			<AddNewTodoForm onAddTodo={addTodo}  alertMessage={''} />

			{/* {location.state?.message && (
				<Alert variant="success">
					{location.state.message}
				</Alert>
			)} */}

			{/* {deletedTodo && (
				<AutoDismissingAlert variant="success" hideAfter={3}>
					Todo was successfully deleted
				</AutoDismissingAlert>
			)} */}

			{isError && (
							<Alert variant="danger">
								An terrible, inexplicable error occurred while fetching todos. It wasn't me!
							</Alert>
			)}

			{todos && todos.length > 0 && (
				<ListGroup className="todolist">
					{todos.map(todo => (
						<ListGroup.Item
							action
							as={Link}
							key={todo.id}
							className={todo.completed ? 'done' : ''}
							to={`/todos/${todo.id}`}
						>
							{todo.title}
						</ListGroup.Item>
					))}
				</ListGroup>
			)}

			{todos && todos.length === 0 && (
				<p>Yayyy, you have 0 todos to do</p>
			)}
		</>
	)
}

export default TodosPage
