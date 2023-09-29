import { useState } from 'react'
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


	// if (todos.length === 4) {
	// 	return (<p>Too many todos?</p>)
	// } //HOOKS SHOULD ALWAYS BE  ON TOP WHEN YOU ARE DOING CONDITIONAL STATEMENTS!


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

					<p className="status">
						{finishedTodos.length} of {todos.length} todos completed
					</p>
				</>
			)}

			{todos.length === 0 && (
				<p>Yayyy, you have 0 todos to do</p>
			)}

		</div>
	)
}

export default App
