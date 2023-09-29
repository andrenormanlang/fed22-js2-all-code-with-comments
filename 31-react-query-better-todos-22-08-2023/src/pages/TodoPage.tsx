import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import ConfirmationModal from '../components/ConfirmationModal';
import * as TodosAPI from '../services/TodosAPI';
import { Todo, Todos } from '../types/TodosAPI.types';
import { useState } from 'react';


const TodoPage = () => {
  const { id } = useParams();
  const todoId = Number(id);
  // const queryClient = useQueryClient();
	const [showConfirmDelete, setShowConfirmDelete] = useState(false)
	const navigate = useNavigate();
	const queryClient = useQueryClient()
	const [queryEnabled, setQueryEnabled] = useState(true)

	// const [showConfirmationModal, setShowConfirmationModal] = useState(false);
	// const [showConfirmDelete, setShowConfirmDelete] = useState(false)

  const {
		data: todo,
		isError,
		isLoading,
		refetch: getTodo,

	} =  useQuery(["todo", { id: todoId }], () => TodosAPI.getTodo(todoId), { enabled: queryEnabled })


	const deleteTodoMutation = useMutation({
		mutationFn: () => TodosAPI.deleteTodo(todoId),
		onSuccess: () => {
			// disable query for this specific single todo
			setQueryEnabled(false)

			// remove the query for this specific single todo
			queryClient.removeQueries({ queryKey: ["todo", { id: todoId }] })

			// invalidate the query for all todos
			// queryClient.invalidateQueries({ queryKey: ["todos"] })
			// modify query cache for ["todos"] and construct a new array with
			// the deeleted todo excluded
			queryClient.setQueryData<Todos>(["todos"], (prevTodos) => {
				return prevTodos?.filter(todo => todo.id !== todoId) ?? []
			})

			// Navigate user to `/todos` (using search params/query params)
			// Navigate user to `/todos` (with delete-status as state)
			navigate('/todos?deleted=true', {
				// replace: true,
				replace: true,
				state: {
					deleted: true,
				}
			})
		}
	})

	// const deleteTodo = useMutation({
	// 	mutationFn: (todo: Todo) => TodosAPI.deleteTodo(todoId),
	// 	onSuccess: (todo: Todo) => {
	// 		queryClient.invalidateQueries({
	// 			queryKey: ["todos", todo.id],
	// 			exact: true,
	// 		}),
	// 			navigate("/todos?deleted=true", {
	// 				replace: true,
	// 			})
	// 	},
	// })


	const updateTodoCompletedMutation = useMutation({
		mutationFn: (newCompleted: boolean) => TodosAPI.updateTodo(todoId, {
			completed: newCompleted,
		}),
		onSuccess: () => {
			// queryClient.setQueryData(["todo", { id: todoId }], todo)
			// queryClient.invalidateQueries({queryKey: ['todos']})
			// invalidate the query for this specific single todo
			queryClient.invalidateQueries({ queryKey: ["todo", { id: todoId }] })

			// invalidate the query for all todos
			queryClient.invalidateQueries({ queryKey: ["todos"] })
		},
	})

	// const toggleTodo = useMutation({
	// 	mutationFn: (todo: Todo) =>
	// 		TodosAPI.updateTodo(todo.id, { completed: !todo.completed }),
	// 	onSuccess: (todo: Todo) => {
	// 		queryClient.setQueryData(["todo", { id: todoId }], todo)
	// 	},
	// })


	// // Delete a todo in the api
	// const deleteTodo = async (todo: Todo) => {
	// 	if (!todo.id) {
	// 		return
	// 	}

	// 	// Delete todo from the api
	// 	await TodosAPI.deleteTodo(todo.id)

	// 	// Navigate user to `/todos` (using search params/query params)
	// 	navigate('/todos?deleted=true', {
	// 		replace: true,
	// 	})
	// }

	// Toggle the completed status of a todo in the api
	const toggleTodo = async (todo: Todo) => {
		updateTodoCompletedMutation.mutate(!todo.completed)
	}

	// // Toggle the completed status of a todo in the api
	// const toggleTodo = async (todo: Todo) => {
	// 	if (!todo.id) {
	// 		return
	// 	}

	// 	// Update a todo in the api
	// 	const updatedTodo = await TodosAPI.updateTodo(todo.id, {
	// 		completed: !todo.completed
	// 	})

	// 	// update todo state with the updated todo
	// 	getTodo()
	// }

	if (isError) {
		return (
			<Alert variant="warning">
				<h1>Something went wrong!</h1>
				<p>It wasn't me that did something /the server</p>

				<Button variant='primary' onClick={() => getTodo()}>TRY AGAIN!!!</Button>
			</Alert>
		)
	}

	if (isLoading || !todo) {
		return (<p>Loading...</p>)
	}

  // const [showConfirmDelete, setShowConfirmDelete] = useState(false);

	// const deleteTodoMutation = useMutation({
	// 	mutationFn: (todoId: number) => TodosAPI.deleteTodo(todoId),
	// 	onMutate: onMutateDeleteTodo,
	// 	onSuccess: onSuccessDeleteTodo,
	// 	onError: onErrorDeleteTodo,
	// });

	// onMutate callback
	// async function onMutateDeleteTodo(todoId: number) {
	// 	await queryClient.cancelQueries(['todos']);

	// 	const previousTodos = queryClient.getQueryData<Todo[]>(['todos']);

	// 	queryClient.setQueryData<Todo[]>(['todos'], (old) => {
	// 		if (!old) return [];
	// 		return old.filter((todo) => todo.id !== todoId);
	// 	});

	// 	return { previousTodos };
	// }

	// onSuccess callback
	// async function onSuccessDeleteTodo() {
	// 	queryClient.invalidateQueries(['todos']);
	// 	navigate('/todos'); // Navigate to '/todos' after successful deletion
	// }

	// onError callback
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	// function onErrorDeleteTodo( context: any) {
	// 	if (context?.previousTodos) {
	// 		queryClient.setQueryData<Todo[]>(['todos'], context.previousTodos);
	// 	}
	// }

	// function handleDeleteConfirmation() {
	// 	setShowConfirmationModal(true);
	// }

	// function handleDeleteConfirmed() {
	// 	deleteTodoMutation.mutate(todoId);
	// 	setShowConfirmationModal(false);

	// }

	// Delete a todo in the api

	// Delete a todo in the api
	// const deleteTodo = async (todo: Todo) => {
	// 	if (!todo.id) {
	// 		return
	// 	}

	// 	// Delete todo from the api
	// 	await TodosAPI.deleteTodo(todo.id)

	// 	// Navigate user to `/todos` (using search params/query params)
	// 	navigate('/todos?deleted=true', {
	// 		replace: true,
	// 	})
	// }

	// const deleteTodo = useMutation({
	// 	mutationFn: (todo: Todo) => TodosAPI.deleteTodo(todoId),
	// 	onSuccess: (todo: Todo) => {
	// 		queryClient.invalidateQueries({
	// 			queryKey: ["todos", todo.id],
	// 			exact: true,
	// 		}),
	// 			navigate("/todos?deleted=true", {
	// 				replace: true,
	// 			})
	// 	},
	// })

  // const toggleTodoMutation = useMutation(
  //   (updatedTodo: Todo) => TodosAPI.updateTodo(todoId, updatedTodo),
  //   {
  //     onMutate: (updatedTodo) => {
  //       const previousTodo = todo;
  //       // Optimistically update the local state
  //       if (previousTodo) {
  //         queryClient.setQueryData(['todos', { id: todoId }], {
  //           ...previousTodo,
  //           completed: updatedTodo.completed,
  //         });
  //       }
  //       return previousTodo;
  //     },
  //     onError: ( previousTodo) => {
  //       // Revert the optimistic update on error
  //       if (previousTodo) {
  //         queryClient.setQueryData(['todos', { id: todoId }], previousTodo);
  //       }
  //     },
  //     onSuccess: () => {
  //       queryClient.invalidateQueries(['todo']);

  //     },
  //   }
  // );

	// const toggleTodo = useMutation({
	// 	mutationFn: (todo: Todo) =>
	// 		TodosAPI.updateTodo(todo.id, { completed: !todo.completed }),
	// 	onSuccess: (todo: Todo) => {
	// 		queryClient.setQueryData(["todo", { id: todoId }], todo)
	// 	},
	// })

  // if (isError) {
  //   return (
  //     <Alert variant="warning">
  //       <h1>Something went wrong!</h1>
  //       <p>It wasn't me that did something /the server</p>
  //       <Button variant='primary' onClick={() => getTodo()}>
  //         TRY AGAIN!!!
  //       </Button>
  //     </Alert>
  //   );
  // }

  // if (isLoading || !todo) {
  //   return <p>Loading...</p>;
  // }

  return (
		<>
			<h1>{todo.title}</h1>

			<p><strong>Status:</strong> {todo.completed ? 'Completed' : 'Not completed'}</p>

			<div className="buttons mb-3">
				<Button
					variant='success'
					onClick={() => toggleTodo(todo)}
					disabled={updateTodoCompletedMutation.isLoading}
				>
					Toggle
				</Button>

				<Link to={`/todos/${todoId}/edit`}>
					<Button variant='warning'>Edit</Button>
				</Link>

				<Button variant='danger' onClick={() => setShowConfirmDelete(true)}>Delete</Button>
			</div>

			<ConfirmationModal
					show={showConfirmDelete}
					onCancel={() => setShowConfirmDelete(false)}
					onConfirm={() => !deleteTodoMutation.isLoading && deleteTodoMutation.mutate()}
			>
				U SURE BRO?!
			</ConfirmationModal>

			<Link to="/todos">
				<Button variant='secondary'>&laquo; All todos</Button>
			</Link>
		</>
    // <>
    //   <h1>{todo.title}</h1>
    //   <p><strong>Status:</strong> {todo.completed ? 'Completed' : 'Not completed'}</p>
    //   <div className="buttons mb-3">
    //     <Button variant='success' onClick={() => toggleTodoMutation.mutate({ ...todo, completed: !todo.completed })}>
    //       Toggle
        // </Button>
				//* <Button variant="success" onClick={() => toggleTodo.mutate(todo)}>
				//	Toggle
				// </Button>
        // <Link to={`/todos/${todoId}/edit`}>
        //   <Button variant='warning'>Edit</Button>
        // </Link>
        // <Button variant='danger' onClick={handleDeleteConfirmation}>Delete</Button>
			// 	<Button variant="danger" onClick={() => setShowConfirmDelete(true)}>
			// 		Delete
			// 	</Button>
      // </div>
      // <ConfirmationModal
      //   show={showConfirmationModal}
      //   onCancel={() => setShowConfirmationModal(false)}
      //   onConfirm={handleDeleteConfirmed}
      // >
      //   U SURE BRO?!
      // </ConfirmationModal>
			// <ConfirmationModal
			// 	show={showConfirmDelete}
			// 	onCancel={() => setShowConfirmDelete(false)}
			// 	onConfirm={() => deleteTodo.mutate(todo)}
			// >
			// 	U SURE BRO?!
			// </ConfirmationModal>
			// <ConfirmationModal
			// 	show={showConfirmDelete}
			// 	onCancel={() => setShowConfirmDelete(false)}
			// 	onConfirm={() => deleteTodo(todo)}
			// >
			// 	U SURE BRO?!
			// </ConfirmationModal>
      // <Link to="/todos">
      //   <Button variant='secondary'>&laquo; All todos</Button>
      // </Link>
    // </>
	)
};

export default TodoPage;
