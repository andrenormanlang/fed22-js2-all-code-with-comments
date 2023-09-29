// AddNewTodoForm.tsx
import React, { useRef, useState } from "react";
import { Todo } from "../types/TodosAPI.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as TodosAPI from "../services/TodosAPI";
import { useNavigate } from "react-router-dom";
import Alert from "react-bootstrap/Alert";

interface IProps {
  onAddTodo: (todo: Todo) => void;

  alertMessage: string;
}

const AddNewTodoForm: React.FC<IProps> = ({ alertMessage }) => {
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [newTodoCompleted, setNewTodoCompleted] = useState(false);
  const newTodoTitleRef = useRef<HTMLInputElement | null>(null);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);


  const createTodoMutation = useMutation(TodosAPI.createTodo, {
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
      setTimeout(() => {
				navigate("/todos")
			}, 2000)
      setShowSuccessMessage(true);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newTodo: Todo = {

      title: newTodoTitle,
      completed: newTodoCompleted,
    };

    createTodoMutation.mutate(newTodo);

    setNewTodoTitle("");
    setNewTodoCompleted(false);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <div className="input-group">
        <input
          ref={newTodoTitleRef}
          type="text"
          className="form-control"
          placeholder="Todo title"
          onChange={(e) => setNewTodoTitle(e.target.value)}
          value={newTodoTitle}
        />

        <button
          disabled={!newTodoTitle.trim() || createTodoMutation.isLoading}
          type="submit"
          className="btn btn-success"
        >
          Create
        </button>
      </div>

      {createTodoMutation.isLoading ? (
        'Adding todo...'
      ) : (createTodoMutation.isError ? (
            <div>An error occurred: {}</div>
      ) : null)}
      {createTodoMutation.isSuccess && (
        <Alert variant="success" className="mt-3">
          Todo created in Form!
        </Alert>
      )}

      {alertMessage && (
        <Alert variant={alertMessage.includes("created") ? "success" : "danger"} className="mt-3">
          {alertMessage}
        </Alert>
      )}
    </form>
  );
};

export default AddNewTodoForm;

