import { useMutation, useQueryClient} from '@tanstack/react-query'
import { NewTodo, Todos } from '../types/TodosAPI.types'
import Alert from 'react-bootstrap/Alert'
import ListGroup from 'react-bootstrap/ListGroup'
import { Link, useLocation } from 'react-router-dom'
import AddNewTodoForm from '../components/AddNewTodoForm'
import AutoDismissingAlert from '../components/AutoDismissingAlert'
import useTodos from '../hooks/useTodos'
import * as TodosAPI from '../services/TodosAPI'


const TodosPage = () => {
	// const location = useLocation()
	// const [searchParams, setSearchParams] = useSearchParams()
	// const searchParams_deletedTodo = searchParams.get("deleted")
	// const deletedTodo = Boolean(searchParams_deletedTodo)
	const location = useLocation()
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const deletedTodo = location.state?.deleted ?? false
	const queryClient = useQueryClient()

	// Get todos from api
	// OWN SOLUTION!
	// const { isLoading, isError, data: todos } = useQuery({
  //   queryKey: ['todos'],
  //   queryFn: TodosAPI.getTodos,
  // })

	// const {
	// 	data: todos,
	// 	isError,
	// 	// refetch, //: getTodos
	// } = useQuery(['todos'], TodosAPI.getTodos)

	// Custom hooks
	const {
		data: todos,
		isError,
	} = useTodos()


	// Create a new todo in the API with mutation
	const createTodoMutation = useMutation({
		mutationFn: TodosAPI.createTodo,
		onSuccess: (newTodo) =>{
			// queryClient.invalidateQueries({queryKey: ['todos']})
			// instead of invalidating the ["todos"] query, we can construct
			// new data based on the old data and the response from the create
			// Todo request.
			queryClient.setQueryData<Todos>(["todos"], (prevTodos) => {
				return [
					...prevTodos ?? [],
					newTodo,
				]
			})

			// also insert the new todo into the query cache
			queryClient.setQueryData(["todo", { id: newTodo.id }], newTodo)


		} // no need for getTodos() and refetch: getTodos

	});

	// Create a new todo in the API 1st version
	// const addTodo = async (todo: NewTodo) => {
	// 	await TodosAPI.createTodo(todo)
	// 	getTodos()
	// }

	// Create a new todo in the  with React Query instead
	const addTodo = async (todo: NewTodo) => {
		createTodoMutation.mutateAsync(todo) //mutate asynchronous can be called here instead
		// 	await TodosAPI.createTodo(todo)
		// 	getTodos()
	}

	// if (isLoading) {
	//   return <span>Loading...</span>
	// }

	// // sort alphabetically by title
	// data.sort((a, b) => a.title.localeCompare(b.title))

	// // sort by completed status
	// data.sort((a, b) => Number(a.completed) - Number(b.completed))
	// const addTodo = async (todo: Todo) => {
  //   try {
  //     await createTodoMutation.mutateAsync(todo);
  //     refetch(); // Refetch todos after adding a new todo
  //   } catch (error) {
  //     console.error('Error adding todo:', error);
  //   }
  // };

	// TodosAPI.createTodo(todo)
	// 	getTodos()
	// fetch todos when App is being mounted

	// {todos?.reduce((prev, todo) => { return prev + todo.id }), 0} // check screencast 19.1


	return (
		<>
			<h1 className="mb-3">Todos</h1>

			<AddNewTodoForm onAddTodo={addTodo}  /* alertMessage={''} */ />

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

			{location.state?.message && (
				<Alert variant="success">
					{location.state.message}
				</Alert>
			)}

			{deletedTodo && (
				<AutoDismissingAlert variant="success" hideAfter={3}>
					Todo was successfully deleted
				</AutoDismissingAlert>
			)}


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
