// import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
// import Container from "react-bootstrap/Container"
// import ListGroup from "react-bootstrap/ListGroup"
// import { Link } from "react-router-dom"
// import { toast } from 'react-toastify'
// import TodoForm from '../components/TodoForm'
// import useGetTodos from '../hooks/useGetTodos'
// import { newTodosCol } from '../services/firebase'
// import { TodoFormData } from "../types/Todo.types"
// import { firebaseTimestampToString } from '../helpers/time'
// import useAuth from '../hooks/useAuth'

// const TodosPage = () => {
// 	const {currentUser} = useAuth()

// 	const uid = currentUser!.uid

// 	const {

// 		data: todos,
// 		loading
// 	} = useGetTodos(uid)

// 	// Create a new todo in the API
// 	const addTodo = async (data: TodoFormData) => {
// 		// Add a new document with a generated ID
// 		const docRef = doc(newTodosCol)

// 		// Set the contents of the document
// 		await setDoc(docRef, {

// 			...data,
// 			uid: uid, // add this line
// 			created_at: serverTimestamp(),
// 			updated_at: serverTimestamp(),
// 		})

// 		// 🥂
// 		toast.success("Yay, even MORE stuff to do... 😁")
// 	}

// 	return (
// 		<Container className="py-3">
// 			<div className="d-flex justify-content-between align-items-start">
// 				<h1 className="mb-3">Todos</h1>
// 			</div>

// 			<TodoForm onSave={addTodo} />

// 			{loading && <p>Loading todos...</p>}

// 			{todos && todos.length > 0 && (
// 				<ListGroup className="todolist">
// 					{todos.map((todo) => (
// 						<ListGroup.Item
// 							action
// 							as={Link}
// 							key={todo._id}
// 							className={todo.completed ? "done" : ""}
// 							to={`/todos/${todo._id}`}
// 						>
// 							<span className="todo-title">{todo.title}</span>
// 							<span className="created">
// 								{loading && firebaseTimestampToString(todo.created_at)}
// 							</span>
// 						</ListGroup.Item>
// 					))}
// 				</ListGroup>
// 			)}

// 			{todos && todos.length === 0 && (
// 				<p>Yayyy, you have 0 todos to do</p>
// 			)}
// 		</Container>
// 	)
// }

// export default TodosPage

// TodosPage.tsx
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import Container from "react-bootstrap/Container"
import ListGroup from "react-bootstrap/ListGroup"
import { Link } from "react-router-dom"
import { toast } from 'react-toastify'
import TodoForm from '../components/TodoForm'
import useGetTodos from '../hooks/useGetTodos'
import { newTodosCol } from '../services/firebase'
import { TodoFormData } from "../types/Todo.types"
import { firebaseTimestampToString } from '../helpers/time'
import useAuth from '../hooks/useAuth'

const TodosPage = () => {
	const {currentUser} = useAuth()

	const uid = currentUser!.uid

	const {
		data: todos,
		loading
	} = useGetTodos(uid)

	// Create a new todo in the API
	const addTodo = async (data: TodoFormData) => {
		// Add a new document with a generated ID
		const docRef = doc(newTodosCol)

		// Set the contents of the document
		// await setDoc(docRef, {
		// 	...data,
		// 	uid: uid,
		// 	created_at: serverTimestamp(),
		// 	updated_at: serverTimestamp(),
		// })

		toast.success("Yay, even MORE stuff to do... 😁")
	}

	return (
		<Container className="py-3">
			<div className="d-flex justify-content-between align-items-start">
				<h1 className="mb-3">Todos</h1>
			</div>

			<TodoForm onSave={addTodo} />

			{loading && <p>Loading todos...</p>}

			{todos && todos.length > 0 && (
				<ListGroup className="todolist">
					{todos.map((todo) => (
						<ListGroup.Item
							action
							as={Link}
							key={todo._id}
							className={todo.completed ? "done" : ""}
							to={`/todos/${todo._id}`}
						>
							<span className="todo-title">{todo.title}</span>
							<span className="created">
								{firebaseTimestampToString(todo.created_at)}
							</span>
						</ListGroup.Item>
					))}
				</ListGroup>
			)}

			{todos && todos.length === 0 && (
				<p>Yayyy, you have 0 todos to do</p>
			)}
		</Container>
	)
}

export default TodosPage
