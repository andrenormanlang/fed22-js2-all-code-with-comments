import { Timestamp } from 'firebase/firestore'

export type Todo = {
	_id: string
	title: string
	completed: boolean
	created_at: Timestamp,
	updated_at: Timestamp,
}
export type NewTodo = Omit<Todo, "_id">
export type PartialTodo = Partial<Todo>

export type Todos = Todo[]

export type NewTodoFormData = {
	title: string
}

export type TodoFormData = {
	title: string
	completed: boolean
}

// import { Timestamp } from 'firebase/firestore'

// export type Todo = {
// 	_id: string
// 	title: string
// 	completed: boolean
// 	created_at: Timestamp,
// 	updated_at: Timestamp,
// }
// export type NewTodo = Omit<Todo, "_id">
// export type PartialTodo = Partial<Todo>

// export type Todos = Todo[]

// export type TodoFormData = {
// 	title: string
// 	completed: boolean
// }



// infer Zod for safer data checking (Check Pedro´s something video on Zod and typescript)

// export type Todo = {
// 	id: string
// 	title: string
// 	completed: boolean
// }
// export type Todo = {
// 	_id: string //_ in order to infer that this is not a part of a field of the document (metadata or private)
// 	title: string
// 	completed: boolean
// }
// export type NewTodo = Omit<Todo, "id">
// export type NewTodo = Omit<Todo, "_id">
// export type PartialTodo = Partial<Todo>

// export type Todos = Todo[]
