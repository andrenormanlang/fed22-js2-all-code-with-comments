export type Todo = {
	id?: number
	title: string
	completed: boolean
}

// export type NewTodo = Omit<Todo, "id">

// export type HalfTodo = Pick<Todo, "title" | "completed">

// const todo: NewTodo = {
// }
export type NewTodo = Omit<Todo, "id">
export type PartialTodo = Partial<Todo>

export type Todos = Todo[]
