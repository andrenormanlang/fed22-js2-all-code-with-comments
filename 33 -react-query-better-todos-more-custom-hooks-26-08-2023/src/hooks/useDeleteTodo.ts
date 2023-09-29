import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { deleteTodo as TodosAPI_deleteTodo } from "../services/TodosAPI"
import { Todos } from "../types/TodosAPI.types"

const useDeleteTodo = (
	todoId: number,
	disableQueries: () => void = () => {
		return
	}
) => {
	const navigate = useNavigate()
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: () => TodosAPI_deleteTodo(todoId),
		onSuccess: () => {
			// disable query for this specific single todo
			// setQueryEnabled(false)
			disableQueries()

			// remove the query for this specific single todo
			queryClient.removeQueries({ queryKey: ["todo", { id: todoId }] })

			// invalidate the query for all todos
			// queryClient.invalidateQueries({ queryKey: ["todos"] })
			// modify query cache for ["todos"] and construct a new array with
			// the deeleted todo excluded
			queryClient.setQueryData<Todos>(["todos"], (prevTodos) => {
				return prevTodos?.filter((todo) => todo.id !== todoId) ?? []
			})

			// Navigate user to `/todos` (using search params/query params)
			// Navigate user to `/todos` (with delete-status as state)
			navigate("/todos", {
				replace: true,
				state: {
					deleted: true,
				},
			})
		},
	})
}

export default useDeleteTodo
