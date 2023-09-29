import React from 'react'
import { Todo } from '../types'
import TodoListItem from './TodoListItem'

interface IProps {
	onDelete: (todoToDelete: Todo) => void
	onToggle: (todo: Todo) => void
	todos: Todo[]
}

const TodoList: React.FC<IProps> = ({ onDelete, onToggle, todos }) => {
	return (
		<ul className="todolist">
			{todos.map((todo, index) => (
				<TodoListItem
					onDelete={onDelete}
					onToggle={onToggle}
					todo={todo}
					key={index}
				/>
			) )}
		</ul>
	)
}

export default TodoList

