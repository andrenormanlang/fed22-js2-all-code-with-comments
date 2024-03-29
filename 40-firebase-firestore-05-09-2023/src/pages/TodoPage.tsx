import { useState } from "react"
import Button from "react-bootstrap/Button"
import { Link, useNavigate, useParams } from "react-router-dom"
import ConfirmationModal from "../components/ConfirmationModal"
import useGetTodo from "../hooks/useGetTodo"
import { deleteDoc, doc } from "firebase/firestore"
import { todosCol } from "../services/firebase"
import {toast} from 'react-toastify'

const TodoPage = () => {
	const [showConfirmDelete, setShowConfirmDelete] = useState(false)
	const navigate = useNavigate()
	const { id } = useParams()

	const documentId = id as string

	const {
		data: todo,
		// getData: getTodo,
		loading
	} = useGetTodo(documentId)

	const deleteTodo = async () => {
		// Get a reference to the document
		const docRef = doc(todosCol, documentId)

		// Delete the document
		await deleteDoc(docRef)

		// 🥂
		toast.success("💣 Todo deleted")

		// Redirect user to todos list (and replace the current history entry for this page)
		navigate('/todos', {
			replace: true,
		})
	}


	if (loading || !todo) {
		return <p>Loading todo...</p>
	}

	return (
		<>
			<div className="d-flex justify-content-between align-items-start">
				<h1>{todo.title}</h1>
				{/* <Button variant="primary" onClick={() => getTodo()}>Refresh</Button> */}
			</div>

			<p>
				<strong>Status:</strong>{" "}
				{todo.completed ? "Completed" : "Not completed"}
			</p>

			<div className="buttons mb-3">
				<Button
					variant="success"
					onClick={() => console.log("Would toggle todo")}
				>
					Toggle
				</Button>

				<Link to={`/todos/${id}/edit`}>
					<Button variant="warning">Edit</Button>
				</Link>

				<Button
					variant="danger"
					onClick={() => setShowConfirmDelete(true)}
				>
					Delete
				</Button>
			</div>

			<ConfirmationModal
				show={showConfirmDelete}
				onCancel={() => setShowConfirmDelete(false)}
				onConfirm={deleteTodo}
			>
				U SURE BRO?!
			</ConfirmationModal>

			<Link to="/todos">
				<Button variant="secondary">&laquo; All todos</Button>
			</Link>
		</>
	)
}

export default TodoPage



/*  import { useState } from "react"
import Button from "react-bootstrap/Button"
import { Link, useParams } from "react-router-dom"
import ConfirmationModal from "../components/ConfirmationModal"
import useGetTodo from "../hooks/useGetTodo";


// const todo: Todo = {
// 	_id: "133713371337",
// 	title: "Learn to fake better data 😅",
// 	completed: true,
// }

const TodoPage = () => {
	const [showConfirmDelete, setShowConfirmDelete] = useState(false);
	const { id } = useParams();

	const documentId = id as string;

	const {
		data: todo,
		getData: getTodo,
		loading,
	} = useGetTodo(documentId); // or useGetTodo(id as string)

	if(loading || !todo){
		return <p>Loading todo...</p>
	}

	return (
	<>

		<div className="d-flex justify-content-between align-items-start">
			<h1>{todo.title}</h1>
			<Button variant="primary" onClick={() => getTodo()}>Refresh</Button>
		</div>

		<p>
			<strong>Status:</strong>{" "}
			{todo.completed? "Completed": "Not completed"}
		</p>

		<div className="buttons mb-3">
			<Button
				variant="success"
				onClick={() =>console.log("Would toggle todo")}
			>
				Toggle
			</Button>

			<Link to={`/todos/${id}/edit`}>
				<Button variant="warning">Edit</Button>
			</Link>

			<Button
				variant="danger"
				onClick={() =>setShowConfirmDelete(true)}
			>
				Delete
			</Button>
		</div>

		<ConfirmationModal
			show={showConfirmDelete}
			onCancel={() =>setShowConfirmDelete(false)}
			onConfirm={() =>console.log("Would delete todo with id:",id)}
		>
			U SURE BRO?!
		</ConfirmationModal>

		<Link to="/todos">
			<Button variant="secondary">&laquo; All todos</Button>
		</Link>

	</>
	);
};

export default TodoPage; */
