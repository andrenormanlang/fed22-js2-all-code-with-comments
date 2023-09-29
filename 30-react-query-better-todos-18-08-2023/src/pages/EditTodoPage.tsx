import { useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate, useParams } from "react-router-dom";
import { Todo } from "../types/TodosAPI.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"; // Import React Query hooks
import * as TodosAPI from "../services/TodosAPI";

const EditTodoPage = () => {
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const todoId = Number(id);
  const queryClient = useQueryClient(); // Get the query client instance

  // Fetch the todo using React Query
  const { data: todo, error, isLoading } = useQuery(
    ["todo", todoId],
    () => TodosAPI.getTodo(todoId)
  );

  // Define the mutation for updating the todo
  const updateTodoMutation = useMutation(
    (updatedTodo: Todo) => TodosAPI.updateTodo(todoId, updatedTodo),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["todo", todoId]); // Invalidate the cache
        navigate(`/todos/${todoId}`); // Navigate back to the todo detail page
      },
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!todo || !todo.id) {
      return;
    }

    // Update the todo using the mutation
    updateTodoMutation.mutate({
			title: newTodoTitle,
			completed: false
		});
  };

  if (error) {
    return (
      <Alert variant="warning">
        <h1>Something went wrong!</h1>
        
        <Button variant="primary" onClick={() => queryClient.refetchQueries(["todo", todoId])}>
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
        <Button variant="primary" type="submit">
          Save
        </Button>
      </Form>
      <Button variant="secondary">&laquo; Go back</Button>
    </>
  );
};

export default EditTodoPage;
