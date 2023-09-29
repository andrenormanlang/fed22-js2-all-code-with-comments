import { useQuery } from '@tanstack/react-query'

import * as TodosAPI from "../services/TodosAPI";

const useUpdateTodo = (todoId : number) => {

	return useQuery(["todo", { id: todoId }], () => TodosAPI.getTodo(todoId))

}

export default useUpdateTodo
