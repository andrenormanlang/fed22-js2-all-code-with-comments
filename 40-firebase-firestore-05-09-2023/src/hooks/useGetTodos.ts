import { orderBy } from 'firebase/firestore'
import { todosCol } from '../services/firebase'
import { Todo } from '../types/Todo.types'
import useStreamCollection from './useStreamCollection'

const useGetTodos = () => {
	return useStreamCollection<Todo>(todosCol, orderBy('completed'), orderBy('title'))
}

export default useGetTodos

// // import { useEffect, useState } from "react"
// // import {  Todos } from "../types/Todo.types"
// // import {  getDocs } from "firebase/firestore"
// // import { todosCol } from "../services/firebase"
// // import { orderBy, where } from 'firebase/firestore'
// import { orderBy } from 'firebase/firestore'
// import { todosCol } from '../services/firebase'
// import { Todo } from '../types/Todo.types'
// // import useGetCollection from './useGetCollection'
// import useStreamCollection from './useStreamCollection'

// const useGetTodos = () => {
// 	// const orderByTitle = orderBy('title')


// 	// const whereCompleted = where('completed', '==', true)

// 	return useStreamCollection<Todo>(todosCol, orderBy('completed'), orderBy('title'))

// 	// return useStreamCollection<Todo>(todosCol, whereCompleted, whereUser, orderByTitle)
// 	// return useStreamCollection<Todo>(todosCol, whereCompleted, orderByTitle)

// 	// return useStreamCollection<Todo>(todosCol)
// 	// return useStreamCollection<Todo>(todosCol) there is the possibility of sending a transformer for sorting
// 	//
// }

// export default useGetTodos
// const useGetTodos = () => {
// 	return useGetCollection<Todo>(todosCol)
// }

// export default useGetTodos


// const useGetTodos = () => {
// 	const { data, getData, loading } = useGetCollection("todos");

// 	return { data, getData, loading };
//   };

// export default useGetTodos;

// const useGetTodos = () => {
// 	const [loading, setLoading] = useState(true)
// 	// const [todos, setTodos] = useState<Todos>([])
// 	// const [todos, setTodos] = useState<Todos | null>(null)
// 	const [data, setData] = useState<Todos|null>(null)

// 	const getData =  async () => {
// 		setLoading(true)
// 		// get reference to collection "todos"
// 		// const colRef = collection(db, "todos")
// 		// const colRef = collection(db, "todos") as CollectionReference<Todo>


// 		// get query snapshot of collection
// 		// const snapshot = await getDocs(colRef)
// 		const snapshot = await getDocs(todosCol) // updated to a generic type on services

// 		// loop over all docs
// 		// snapshot.forEach(doc => {
// 		// 	// console.log("Got me a document!")
// 		// 	// console.log(doc.id)
// 		// 	// console.log(doc.data())
// 		// loop over all docs
// 		// const data: Todos = snapshot.docs.map(doc => {
// 		// 	return {
// 		// 		_id: doc.id,
// 		// 		...doc.data(),
// 		// 	} as Todo
// 		// })
// 		const data: Todos = snapshot.docs.map(doc => {
// 			return {
// 				...doc.data(),
// 				_id: doc.id,
// 				// title: doc.data().title, //this is due to the CollectionReference typing above
// 			} //as Todo --> no need anymore
// 		})

// 		// setTodos(data)
// 		setData(data)
// 		setLoading(false)

// 		// })
// 		// console.log('got that snapshot 📸', snapshot);
// 		}

// 		// Get todos on component mount
// 		useEffect(() => {
// 			getData()
// 		}, [])

// 		// Return the todos and loading states
// 		// return { todos, loading };
// 		return {data,getData,loading}


// }

// export default useGetTodos

