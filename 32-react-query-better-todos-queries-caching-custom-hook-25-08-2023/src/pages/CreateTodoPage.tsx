// import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import Alert from 'react-bootstrap/Alert'
import { NewTodo } from '../types/TodosAPI.types'
import AddNewTodoForm from '../components/AddNewTodoForm'
import * as TodosAPI from '../services/TodosAPI'

const CreateTodoPage = () => {
  // const [alertMessage, setAlertMessage] = useState("");
  // const [isCreating, setIsCreating] = useState(true); // Add loading state
  // const [todos, setTodos] = useState<Todo[]>([]); // Initialize with your todos

	// const [success, setSuccess] = useState<boolean|null>(null)
	const navigate = useNavigate()
	const queryClient = useQueryClient()


  // const queryClient = useQueryClient();

  // const createTodoMutation = useMutation(TodosAPI.createTodo, {
  //   onMutate: () => {
  //     isCreating; // Set loading state when mutation is triggered
  //   },
  //   onSuccess: () => {
  //     queryClient.invalidateQueries(["todos"]);
  //     navigate("/todos");
  //     setAlertMessage("Todo created!");
  //     setIsCreating(false)
  //   },
  //   onError: () => {
  //     setAlertMessage("Todo could not be created 😔");
  //     setIsCreating(false); // Reset loading state
  //   },
  // });

  // const handleAddTodo = (todo: Todo) => {
  //   createTodoMutation.mutate(todo);
  //   // Update the todos list with the newly created todo
  //   setTodos([todo, ...todos]);
  // };

	const createTodoMutation = useMutation({
		mutationFn: TodosAPI.createTodo,
		onSuccess: (/* todo, newTodo */) => {
			// invalidate any ['todos] queries
			queryClient.invalidateQueries({ queryKey: ['todos']})

			setTimeout(() => {
				navigate("/todos")
			}, 2000)
		}
	})

	// Create a new todo in the API - Johan´s solution
	const addTodo = async (todo: NewTodo) => {
		await createTodoMutation.mutateAsync(todo/* , {
			onSuccess: () => {
				// this will be executed
			}
		} */)

		// if (createTodoMutation.isError) {
		// 	setSuccess(false)
		// }

		// if (createTodoMutation.isSuccess) {
		// 	setTimeout(() => {
		// 		navigate("/todos")
		// 	}, 2000)

		// 	setSuccess(true)
		// }

		// try {
		// 	const createdTodo = await TodosAPI.createTodo(todo)

		// 	setTimeout(() => {
		// 		navigate("/todos")
		// 	}, 2000)

		// 	setSuccess(!!createdTodo)

		// // eslint-disable-next-line @typescript-eslint/no-explicit-any
		// } catch (err: any) {
		// 	setSuccess(false)

		// }
	}

  return (
    <>
      <h1 className="mb-3">Create a new Todo</h1>

      {/* Pass isLoading, alertMessage, onAddTodo, and todos as props */}
      {/* <AddNewTodoForm
        onAddTodo={handleAddTodo}
        alertMessage={alertMessage}
      /> */}
			<h1 className="mb-3">Create a new Todo</h1>

			<AddNewTodoForm onAddTodo={addTodo} />

			{createTodoMutation.isSuccess && (
				<Alert variant="success" className="mt-3">Todo created!</Alert>
			)}

			{createTodoMutation.isError && (
				<Alert variant="warning" className="mt-3">Todo could not be created 😔</Alert>
			)}
	</>
  );
};

export default CreateTodoPage;
