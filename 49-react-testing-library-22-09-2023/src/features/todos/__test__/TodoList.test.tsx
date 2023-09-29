// import userEvent from "@testing-library/user-event"
// import TodoForm from "../TodoForm"
// import { renderWithUserInteraction } from "../../../tests/helpers"
// import {useState} from 'react'
import { render, screen } from '@testing-library/react'
import TodoList from '../TodoList'
import { describe, it, expect } from 'vitest'
import { v4 as uuid } from 'uuid'
import { Todo } from '../../../types/Todo.types'

const fakeFn = async () => {
	return
}
const todoTitle = "This is my todo title"

const createTodo= (title: string): Todo => {
	return{
		id: uuid(),
		title,
		completed: false,
	}
}

const initialTodos: Todo[] = []

describe("Todo List", () => {
	it("List is initially empty", () => {
		render(<TodoList todos={initialTodos} onDelete={fakeFn} onToggle={fakeFn}/>)

		// Find any list item elements
		const listitemEls = screen.queryAllByRole("listitem")

		// Expect list to be empty
		expect(listitemEls).toHaveLength(0)
		// expect(listitemEls.length).toBe(0)
	})

	it("Displays a todo", () => {
		const todos: Todo[] = []
		todos.push(createTodo(todoTitle))

		render(<TodoList todos={todos} onDelete={fakeFn} onToggle={fakeFn} />)

		// Find any listitem elements
		const listitemEls = screen.queryAllByRole("listitem")

		// Expect list to be empty
		expect(listitemEls).toHaveLength(1)//Can cause errors since bootstrap is being used! Check TodoList.tsx fix
		// expect(listitemEls.length).toBe(0)
	})

})

// describe("Todos Page", () => {
// 	it("Can add a new Todo", () => {
// 		const [todos, setTodos] = useState<Todo[]>([]) // Cannot use the useState hook for testing

// 		renderWithUserInteraction(
// 			<>
// 				<TodoForm
// 					onSave={fakeFn}
// 				/>
// 				<TodoList
// 					todos = {todos}
// 					onDelete={fakeFn}
// 					onToggle={fakeFn}
// 				/>
// 			</>
// 		)
// 	})

// })
