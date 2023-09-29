import { useQuery } from '@tanstack/react-query'
import { getTodos as TodosAPI_getTodos } from '../services/TodosAPI'

const useTodos = () => {
	return useQuery(['todos'], TodosAPI_getTodos)
}

export default useTodos
