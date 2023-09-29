import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import ListGroup from "react-bootstrap/ListGroup"
import { Link } from "react-router-dom"
import { toast } from 'react-toastify'
import TodoForm from '../components/TodoForm'
import useGetTodos from '../hooks/useGetTodos'
import { newTodosCol } from '../services/firebase'
import { TodoFormData } from "../types/Todo.types"
import { firebaseTimestampToString } from '../helpers/time'

const TodosPage = () => {
	const {
		data: todos,
		loading
	} = useGetTodos()

	// Create a new todo in the API
	const addTodo = async (data: TodoFormData) => {
		// Add a new document with a generated ID
		const docRef = doc(newTodosCol)

		// Set the contents of the document
		await setDoc(docRef, {
			...data,
			created_at: serverTimestamp(),
			updated_at: serverTimestamp(),
		})

		// 🥂
		toast.success("Yay, even MORE stuff to do... 😁")
	}

	return (
		<>
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
		</>
	)
}

export default TodosPage

// import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
// // import Button from "react-bootstrap/Button"
// import ListGroup from "react-bootstrap/ListGroup"
// import { Link } from "react-router-dom"
// import { toast } from 'react-toastify'
// // import AddNewTodoForm from "../components/AddNewTodoForm"
// import useGetTodos from '../hooks/useGetTodos'
// import { newTodosCol } from '../services/firebase'
// import { TodoFormData } from "../types/Todo.types"
// import TodoForm from '../components/TodoForm'

// const TodosPage = () => {
// 	const {
// 		data: todos,
// 		// getData: getTodos,
// 		loading
// 	} = useGetTodos()

// 	// Create a new todo in the API
// 	const addTodo = async (data: TodoFormData) => {
// 		// Add a new document with a generated ID
// 		const docRef = doc(newTodosCol)

// 		// Set the contents of the document
// 		await setDoc(docRef, {
// 			...data,
// 			// title: data.title,
// 			// completed: false,
// 			created_at: serverTimestamp(),
// 			updated_at: serverTimestamp(),
// 		})

// 		// 🥂
// 		toast.success("Yay, even MORE stuff to do... 😁")
// 	}

// 	return (
// 		<>
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
// 							<span className="created">{todo.created_at.toDate().toLocaleString()}</span>
// 						</ListGroup.Item>
// 					))}
// 				</ListGroup>
// 			)}

// 			{todos && todos.length === 0 && (
// 				<p>Yayyy, you have 0 todos to do</p>
// 			)}
// 		</>
// 	)
// }

// export default TodosPage

// import { doc, setDoc } from "firebase/firestore";
// import { newTodosCol } from "../services/firebase";
// import ListGroup from "react-bootstrap/ListGroup";
// import { Link } from "react-router-dom";
// import AddNewTodoForm from "../components/AddNewTodoForm";
// import { NewTodo } from "../types/Todo.types";
// import useGetTodos from "../hooks/useGetTodos";
// import Button from "react-bootstrap/Button";
// import { toast } from 'react-toastify'

// // const todos: Todos = [
// // 	{
// // 		id: "14c9b3244b4a",
// // 		title: "Learn React 😊",
// // 		completed: true,
// // 	},
// // 	{
// // 		id: "5e584050fc4f",
// // 		title: "Learn Firebase 🔥",
// // 		completed: false,
// // 	},
// // 	{
// // 		id: "d3329c34dc67",
// // 		title: "Profit 💰",
// // 		completed: false,
// // 	},
// // 	{
// // 		id: "44fd9cc7e1a4",
// // 		title: "Take over the world 😈",
// // 		completed: false,
// // 	},
// // ]

// const TodosPage = () => {
// 	// const { todos, loading } = useGetTodos();
// 	const { data: todos, getData: getTodos, loading } = useGetTodos();
// 	// OR
// 	// const [todos, setTodos] = useState<Todos |null>(null)

// 	// Create a new todo in the API
// 	// const addTodo = (todo: NewTodo) => {
// 	// 	// 👻
// 	// 	console.log("Would add a new todo:", todo)
// 	// }

// 	// Create a new todo in the API
// 	const addTodo = async (todo: NewTodo) => {
// 		// Add a new document with a generated ID
// 		const docRef = doc(newTodosCol)

// 		// Set the contents of the document
// 		await setDoc(docRef, todo)

// 		// 🥂
// 		toast.success("Yay, even MORE stuff to do... 😁")
// 	}

// 	return (
// 		<>
// 			<div className="d-flex justify-content-between align-items-start">
// 				<h1 className="mb-3">Todos</h1>
// 				<Button variant="primary" onClick={() => getTodos()}>
// 					Refresh
// 				</Button>
// 			</div>

// 			<AddNewTodoForm onAddTodo={addTodo} />

// 			{loading && <p>Loading todos...</p>}

// 			{todos && todos.length > 0 && (
// 				<ListGroup className="todolist">
// 					{todos.map(todo => (
// 						<ListGroup.Item
// 							action
// 							as={Link}
// 							key={todo._id}
// 							className={todo.completed ? "done" : ""}
// 							to={`/todos/${todo._id}`}
// 						>
// 							{todo.title}
// 						</ListGroup.Item>
// 					))}
// 				</ListGroup>
// 			)}

// 			{todos && todos.length === 0 && (
// 				<p>Yayyy, you have 0 todos to do</p>
// 			)}
// 		</>
// 	);
// };

// export default TodosPage;



