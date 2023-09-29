import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import ConfirmationModal from '../components/ConfirmationModal';
import * as TodosAPI from '../services/TodosAPI';
import { Todo } from '../types/TodosAPI.types';
import { useState } from 'react';


const TodoPage = () => {
  const { id } = useParams();
  const todoId = Number(id);
  const queryClient = useQueryClient();
	const navigate = useNavigate();
	// const [showConfirmationModal, setShowConfirmationModal] = useState(false);
	const [showConfirmDelete, setShowConfirmDelete] = useState(false)

  const { data: todo, isError, isLoading, refetch: getTodo } = useQuery(
    ['todos', { id: todoId }],
    () => TodosAPI.getTodo(todoId)
  );

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

	const deleteTodo = useMutation({
		mutationFn: (todo: Todo) => TodosAPI.deleteTodo(todoId),
		onSuccess: (todo: Todo) => {
			queryClient.invalidateQueries({
				queryKey: ["todos", todo.id],
				exact: true,
			}),
				navigate("/todos?deleted=true", {
					replace: true,
				})
		},
	})

  const toggleTodoMutation = useMutation(
    (updatedTodo: Todo) => TodosAPI.updateTodo(todoId, updatedTodo),
    {
      onMutate: (updatedTodo) => {
        const previousTodo = todo;
        // Optimistically update the local state
        if (previousTodo) {
          queryClient.setQueryData(['todos', { id: todoId }], {
            ...previousTodo,
            completed: updatedTodo.completed,
          });
        }
        return previousTodo;
      },
      onError: ( previousTodo) => {
        // Revert the optimistic update on error
        if (previousTodo) {
          queryClient.setQueryData(['todos', { id: todoId }], previousTodo);
        }
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['todo']);

      },
    }
  );

	// const toggleTodo = useMutation({
	// 	mutationFn: (todo: Todo) =>
	// 		TodosAPI.updateTodo(todo.id, { completed: !todo.completed }),
	// 	onSuccess: (todo: Todo) => {
	// 		queryClient.setQueryData(["todo", { id: todoId }], todo)
	// 	},
	// })

  if (isError) {
    return (
      <Alert variant="warning">
        <h1>Something went wrong!</h1>
        <p>It wasn't me that did something /the server</p>
        <Button variant='primary' onClick={() => getTodo()}>
          TRY AGAIN!!!
        </Button>
      </Alert>
    );
  }

  if (isLoading || !todo) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1>{todo.title}</h1>
      <p><strong>Status:</strong> {todo.completed ? 'Completed' : 'Not completed'}</p>
      <div className="buttons mb-3">
        <Button variant='success' onClick={() => toggleTodoMutation.mutate({ ...todo, completed: !todo.completed })}>
          Toggle
        </Button>
				{/* <Button variant="success" onClick={() => toggleTodo.mutate(todo)}>
					Toggle
				</Button> */}
        <Link to={`/todos/${todoId}/edit`}>
          <Button variant='warning'>Edit</Button>
        </Link>
        {/* <Button variant='danger' onClick={handleDeleteConfirmation}>Delete</Button> */}
				<Button variant="danger" onClick={() => setShowConfirmDelete(true)}>
					Delete
				</Button>
      </div>
      {/* <ConfirmationModal
        show={showConfirmationModal}
        onCancel={() => setShowConfirmationModal(false)}
        onConfirm={handleDeleteConfirmed}
      >
        U SURE BRO?!
      </ConfirmationModal> */}
			<ConfirmationModal
				show={showConfirmDelete}
				onCancel={() => setShowConfirmDelete(false)}
				onConfirm={() => deleteTodo.mutate(todo)}
			>
				U SURE BRO?!
			</ConfirmationModal>
      <Link to="/todos">
        <Button variant='secondary'>&laquo; All todos</Button>
      </Link>
    </>
  );
};

export default TodoPage;
