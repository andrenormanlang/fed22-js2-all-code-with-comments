import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateTodo as TodosAPI_updateTodo } from "../services/TodosAPI"
import { PartialTodo, Todo } from "../types/TodosAPI.types"

const useUpdateTodo = (
	todoId: number,
	onSuccess: (todo: Todo) => void = () => {return}
) => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (data: PartialTodo) =>
			TodosAPI_updateTodo(todoId, data),
		// redirect user to /todos/:id
		onSuccess: (updatedTodo) => {
			// set the response from the mutation as the query cache for the specific single todo
			queryClient.setQueryData(["todo", { id: todoId }], updatedTodo)
			// queryClient.invalidateQueries({ queryKey: ["todo", { id: todoId }] })
			// invalidate the query for this specific single todo
			// queryClient.invalidateQueries({ queryKey: ["todo", { id: todoId }] })

			// invalidate the query for all todos
			// queryClient.invalidateQueries({ queryKey: ["todos"] })
			// queryClient.prefetchQuery({
			// 	queryKey: ["todos"],
			// 	queryFn: TodosAPI.getTodos,
			// })
			// trigger refetching of all todos
			queryClient.refetchQueries({ queryKey: ["todos"] })


			// redirect user to /todos/:id
			// call onSuccess-method passed to our custom hook
			// optional, defaults to empty function
			onSuccess(updatedTodo)
		},
	})
}

export default useUpdateTodo
