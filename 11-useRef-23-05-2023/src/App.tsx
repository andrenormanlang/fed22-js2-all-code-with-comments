import { useEffect, useState } from 'react'
import { Todo, Todos } from './types'
import './assets/scss/App.scss'
import TodoCounter from './components/TodoCounter'
import TodoList from './components/TodoList'
import AddNewTodoForm from './components/AddNewTodoForm'
import * as TodosAPI from './services/TodosAPIClient'

function App() {
	const [todos, setTodos] = useState<Todos>([])

	const getTodos = async () => {
		const data = await TodosAPI.getTodos()
		setTodos(data)
	}

	const addTodo = async (todo: Todo) => {
		// const newTodo = await TodosAPI.createTodo(todo)
		// setTodos([...todos, newTodo])
		await TodosAPI.createTodo(todo)
		getTodos()
	}

	// Delete a todo in the api
	const deleteTodo = async (todo:Todo) /* (todoToDelete: Todo) */ => {
		// await TodosAPI.deleteTodo(Number(todoToDelete.id))
		// setTodos(todos.filter(todo => todo !== todoToDelete))

		// if( typeof todo.id === 'undefined'){
		// 	return
		// }

		if( !todo.id){
			return
		}

		// Delete todo from the api
		await TodosAPI.deleteTodo(todo.id)

		// Get all todos from the api
		getTodos()
	}

	const toggleTodo = async (todo: Todo) => {
		// todo.completed = !todo.completed

		// Toggle todo in the api
		// await TodosAPI.toggleTodo(todo)


		if( !todo.id){
			return
		}


		// Update a todo in the api
		await TodosAPI.updateTodo(todo.id,{
			completed: !todo.completed
		})

		// setTodos(await TodosAPI.getTodos())

		// Get all the todos from the api
		getTodos()
	}

	// fetch todos when App is being mounted
	useEffect(() => {
		console.log('I am mounted');
		getTodos()
	}, [])

	const unfinishedTodos = todos.filter(todo => !todo.completed)
	const finishedTodos = todos.filter(todo => todo.completed)

	// console.log("App rendering...")

	return (
		<div className="container">
			<h1 className="mb-3">React Simple Todos</h1>

			<AddNewTodoForm onAddTodo={addTodo} />

			{todos.length > 0 && (
				<>
					<TodoList
						onToggle={toggleTodo}
						onDelete={deleteTodo}
						todos={unfinishedTodos}
					/>

					<TodoList
						onToggle={toggleTodo}
						onDelete={deleteTodo}
						todos={finishedTodos}
					/>

					<TodoCounter finished={finishedTodos.length} total={todos.length} />
				</>
			)}

			{todos.length === 0 && (
				<p>Yayyy, you have 0 todos to do</p>
			)}

		</div>
	)
}

export default App
