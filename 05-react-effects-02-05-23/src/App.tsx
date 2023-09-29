import { useEffect, useState } from 'react'
import { Todo, TodoList } from './types'
import './assets/scss/App.scss'


// USING SCSS INSTEAD OF BOOTSTRAP CDN IN INDEX.HTML
// npm i bootstrap sass --save-dev

// IMPORTING TYPES FROM INDEX.D.TS FROM THE TYPES FOLDER


function App() {
	const [todos,setTodos] = useState<TodoList>([ //SET THE TYPE AS TODOLIST OR TODO[]
		{ title: "Make coffee", completed: true },
		{ title: "Drink coffee", completed: false },
		{ title: "Drink MORE coffee", completed: false },
		{ title: "Drink ALL THE coffee", completed: false },
	])

	const [newTodoTitle, setNewTodoTitle] = useState("")


	const handleSubmit = (e: React.FormEvent) => {
		// stop form from submitting
		e.preventDefault()

		console.log("Would create a new todo", e)
		// create a new todo and set a new todos state
		const newTodo : Todo ={
			title:newTodoTitle,
			completed: false
		}

		setTodos([...todos,newTodo])

		// clear newTodoTitle state
		setNewTodoTitle("")
	}

	const deleteTodo = (todoToDelete:Todo) => {
		// set a list of todos where the clicked todo is excluded
		// const newTodos = todos.filter(todo => todo !== todoToDelete)
		// setTodos(newTodos)
		setTodos(todos.filter(todo => todo !== todoToDelete))

	}

	const toggleTodo = (todo:Todo) => {
		// if (todo.completed) {
		// 	todo.completed = false
		// } else {
		// 	todo.completed = true
		// }

		todo.completed = !todo.completed
		setTodos([...todos])

	}


	const unfinishedTodos = todos.filter(todo => !todo.completed)
	const finishedTodos = todos.filter(todo => todo.completed)

	// This will be executed when the component is mounted,
	// and only AFTER the component has been rendered. (Only once in the 1st rendering!)
	// CAN BE USED WHEN FETCHING ALL DATA FROM AN API-DATABASE FOR EXAMPLE SO IT DOES NOT RENDER CONSTANTLY
	useEffect(() => {
		console.log('Newly mounted component...');
	}, [])

	// OUR FIRST SIDE-EFFECT //FIRST IT RENDERS ALL STATE COMPONENTS FIRST THEN COMES EFFECT
	// This will only be executed if `finishedTodos.length` or `todos.length`
	// have changed since last render, and only AFTER the component has been rendered
	useEffect(() => {
		console.log("Updating page title using an effect")
		document.title = `${finishedTodos.length} of ${todos.length} completed`
	}, [finishedTodos.length, todos.length]) //DON´T FORGET TO PUT IN finishedTodos.length as a parameter too!

	console.log('Rendering...');

	return (
		<div className="container">
			<h1 className="mb-3">React Simple Todos</h1>

			<form onSubmit={handleSubmit} className="mb-3">
				<div className="input-group">
					<input
						type="text"
						className="form-control"
						placeholder="Todo title"
						onChange={e => setNewTodoTitle(e.target.value)}
						value={newTodoTitle}
					/>

					<button
						type="submit"
						className="btn btn-success"
					>Create</button>
				</div>
			</form>

			{todos.length > 0 && (
				<>
					<ul className="todolist list-unstyled">
						{unfinishedTodos.map((todo, index) => (
							<li className={todo.completed ? 'done' : ''} key={index}>
								<span className="todo-title">
									{todo.title}
								</span>

								<span className="ms-1">
									<span className="todo-toggle" onClick={() => toggleTodo(todo)} role="button">
										{todo.completed ? '☑️' : '✅'}
									</span>
									<span className="todo-delete" onClick={() => deleteTodo(todo)} role="button">
										🗑️
									</span>
								</span>
							</li>
						) )}
					</ul>

					<ul className="todolist list-unstyled">
						{finishedTodos.map((todo, index) => (
							<li className={todo.completed ? 'done' : ''} key={index}>
								<span className="todo-title">
									{todo.title}
								</span>

								<span className="ms-1">
									<span className="todo-toggle" onClick={() => toggleTodo(todo)} role="button">
										{todo.completed ? '☑️' : '✅'}
									</span>
									<span className="todo-delete" onClick={() => deleteTodo(todo)} role="button">
										🗑️
									</span>
								</span>
							</li>
						) )}
					</ul>


				</>
			)}

			{todos.length === 0 && (
				<p>Yayyy, you have 0 todos to do</p>
			)}

		</div>
	)
}

export default App
