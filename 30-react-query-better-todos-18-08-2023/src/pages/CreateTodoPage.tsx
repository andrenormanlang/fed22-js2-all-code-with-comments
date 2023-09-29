import  { useState } from "react";
import { useNavigate } from "react-router-dom";

import AddNewTodoForm from "../components/AddNewTodoForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as TodosAPI from "../services/TodosAPI";
import { Todo } from "../types/TodosAPI.types";

const CreateTodoPage = () => {
  const [alertMessage, setAlertMessage] = useState("");
  const [isCreating, setIsCreating] = useState(true); // Add loading state
  const [todos, setTodos] = useState<Todo[]>([]); // Initialize with your todos

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const createTodoMutation = useMutation(TodosAPI.createTodo, {
    onMutate: () => {
      isCreating; // Set loading state when mutation is triggered
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
      navigate("/todos");
      setAlertMessage("Todo created!");
      setIsCreating(false)
    },
    onError: () => {
      setAlertMessage("Todo could not be created 😔");
      setIsCreating(false); // Reset loading state
    },
  });

  const handleAddTodo = (todo: Todo) => {
    createTodoMutation.mutate(todo);
    // Update the todos list with the newly created todo
    setTodos([todo, ...todos]);
  };

  return (
    <>
      <h1 className="mb-3">Create a new Todo</h1>

      {/* Pass isLoading, alertMessage, onAddTodo, and todos as props */}
      <AddNewTodoForm
        onAddTodo={handleAddTodo}
        alertMessage={alertMessage}
      />
    </>
  );
};

export default CreateTodoPage;
