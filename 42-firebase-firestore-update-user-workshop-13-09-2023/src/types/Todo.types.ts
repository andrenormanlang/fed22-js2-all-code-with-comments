// import { Timestamp } from 'firebase/firestore'

// export type Todo = {
// 	_id: string
// 	title: string
// 	completed: boolean
// 	created_at: Timestamp,
// 	updated_at: Timestamp,
// }
// // export type NewTodo = Omit<Todo, "_id">
// export type PartialTodo = Partial<Todo>

// export type Todos = Todo[]

// export type TodoFormData = {
// 	title: string
// 	completed: boolean
// 	created_at: Timestamp
// 	updated_at: Timestamp
// }

// Todo.types.ts
import { Timestamp } from 'firebase/firestore'

export type Todo = {
    _id: string
    title: string
    completed: boolean
    uid: string // add this line
    created_at: Timestamp,
    updated_at: Timestamp,
}

export type PartialTodo = Partial<Todo>

export type Todos = Todo[]

export type TodoFormData = {
    title: string
    completed: boolean
}
