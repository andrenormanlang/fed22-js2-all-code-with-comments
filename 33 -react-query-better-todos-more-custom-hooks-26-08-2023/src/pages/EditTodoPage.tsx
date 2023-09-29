import { useState, useEffect } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate, useParams } from "react-router-dom";
// import { Todo } from "../types/TodosAPI.types";
// import { useQueryClient } from '@tanstack/react-query'
// import * as TodosAPI from "../services/TodosAPI";
// import useEditTodo from "../hooks/useEditTodo";
import useTodo from "../hooks/useTodo";
import useUpdateTodo from '../hooks/useUpdateTodo'

const EditTodoPage = () => {
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const todoId = Number(id);
//   const queryClient = useQueryClient()

  // const queryClient = useQueryClient(); // Get the query client instance

  // Fetch the todo using React Query
  // const { data: todo, error, isLoading } = useQuery(
  //   ["todo", todoId],
  //   () => TodosAPI.getTodo(todoId)
  // );

	// const {
	// 	data: todo,
	// 	isError,
	// 	isLoading,
	// 	refetch: getTodo,
	// } = useQuery({
	// 	queryKey: ["todo", { id: todoId }],
	// 	queryFn: () => TodosAPI.getTodo(todoId),
	// 	onSuccess: (todo) => {
	// 		setNewTodoTitle(todo.title)
	// 	}
	// })

	const {
		data: todo,
		isError,
		isLoading,
		refetch: getTodo,
	} =  useTodo(todoId)//useQuery(["todo", { id: todoId }], () => TodosAPI.getTodo(todoId))

	const updateTodoTitleMutation = useUpdateTodo(todoId, () => {
		// redirect user to /todos/:id
		navigate(`/todos/${todoId}`)
	})

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		if (!todo || !todo.id) {
			return
		}

		// Update a todo in the api
		updateTodoTitleMutation.mutate({title: newTodoTitle})
	}


	useEffect(() => {
		if (todo) {
			setNewTodoTitle(todo.title)
		}
	}, [todo])


	// const handleSubmit = async (e: React.FormEvent) => {
	// 	e.preventDefault()

	// 	if (!todo || !todo.id) {
	// 		return
	// 	}

	// 	// Update a todo in the api
	// 	await TodosAPI.updateTodo(todo.id, {
	// 		title: newTodoTitle,
	// 	})

	// 	// redirect user to /todos/:id
	// 	navigate(`/todos/${todo.id}`)
	// }

	// useEffect(() => {
	// 	if (todo) {
	// 		setNewTodoTitle(todo.title)
	// 	}
	// }, [todo])

	if (isError) {
		return (
			<Alert variant="warning">
				<h1>Something went wrong!</h1>
				<p>It wasn't me that did something /the server</p>

				<Button variant='primary' onClick={() => getTodo()}>TRY AGAIN!!!</Button>
			</Alert>
		)
	}

	// Define the mutation for updating the todo
	// const updateTodoMutation = useMutation(
	//   (updatedTodo: Todo) => TodosAPI.updateTodo(todoId, updatedTodo),
	//   {
	//     onSuccess: () => {
	//       queryClient.invalidateQueries(["todo", todoId]); // Invalidate the cache
	//       navigate(`/todos/${todoId}`); // Navigate back to the todo detail page
	//     },
	//   }
	// );

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();

  //   if (!todo || !todo.id) {
  //     return;
  //   }

    // Update the todo using the mutation
  //   updateTodoMutation.mutate({
	// 		title: newTodoTitle,
	// 		completed: false
	// 	});
  // };

  // if (error) {
  //   return (
  //     <Alert variant="warning">
  //       <h1>Something went wrong!</h1>

  //       <Button variant="primary" onClick={() => queryClient.refetchQueries(["todo", todoId])}>
  //         TRY AGAIN!!!
  //       </Button>
  //     </Alert>
  //   );
  // }

  if (isLoading || !todo) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1>Edit: {todo.title}</h1>
      <Form onSubmit={handleSubmit} className="mb-4">
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter the new title"
            onChange={(e) => setNewTodoTitle(e.target.value)}
            value={newTodoTitle}
          />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={updateTodoTitleMutation.isLoading}>
          Save
        </Button>
      </Form>
      {/* <Button variant="secondary">&laquo; Go back</Button> */}
      <Button variant='secondary' onClick={() => navigate(-1)}>&laquo; Go back</Button>
    </>
  );
};

export default EditTodoPage;
