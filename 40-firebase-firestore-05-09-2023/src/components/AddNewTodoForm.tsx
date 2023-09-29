import React, { useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import { useForm, SubmitHandler } from 'react-hook-form'
import { TodoFormData } from '../types/Todo.types'

interface IProps {
	onAddTodo: (data: TodoFormData) => Promise<void>
}

const AddNewTodoForm: React.FC<IProps> = ({ onAddTodo }) => {
	const { handleSubmit, register, formState: { errors, isSubmitSuccessful }, reset } = useForm<TodoFormData>()

	const onFormSubmit: SubmitHandler<TodoFormData> = async (data: TodoFormData) => {
		// Pass form data along to parent component
		await onAddTodo(data)   // <-- calls `addTodo()` in `App.tsx`
	}

	useEffect(() => {
		// Reset form when submit is successful
		reset()
	}, [isSubmitSuccessful, reset])

	return (
		<Form onSubmit={handleSubmit(onFormSubmit)} className="mb-3">
			<InputGroup>
				<Form.Control
					type="text"
					className="form-control"
					aria-label="The title of the new Todo"
					{...register('title', {
						required: "You have to write something at least...",
						minLength: {
							value: 5,
							message: "That's too short to be a todo, better do it right now instead!"
						},
					})}
				/>

				<Button
					type="submit"
					variant="success"
				>Create</Button>
			</InputGroup>
			{errors.title && <p className="invalid">{errors.title.message ?? "Invalid value"}</p>}
		</Form>
	)
}

export default AddNewTodoForm



// import React from 'react'
// import Button from 'react-bootstrap/Button'
// import Form from 'react-bootstrap/Form'
// import InputGroup from 'react-bootstrap/InputGroup'
// import { useForm, SubmitHandler } from 'react-hook-form'
// // import { NewTodo, NewTodoFormData } from '../types/Todo.types'
// import { NewTodoFormData } from '../types/Todo.types'
// import {useEffect} from 'react'
// // import { serverTimestamp } from 'firebase/firestore'

// // eslint-disable-next-line @typescript-eslint/no-empty-interface
// interface IProps {
// 	onAddTodo: (data: NewTodoFormData) => Promise<void>
// }

// // type FormData = {
// // 	title: string
// // }

// const AddNewTodoForm: React.FC<IProps> = ({ onAddTodo }) => {
// 	const { handleSubmit, register, formState: { errors, isSubmitSuccessful }, reset } = useForm<NewTodoFormData>()

// 	const onFormSubmit: SubmitHandler<NewTodoFormData> = async (data: NewTodoFormData) => {
// 		// create a new todo and set a new todos state
// 		// const newTodo: NewTodo = {
// 		// 	title: data.title,
// 		// 	completed: false,
// 		// 	created_at: serverTimestamp(),
// 		// 	updated_at: serverTimestamp(),
// 		// }
// 		await onAddTodo(data)   // <-- calls `addTodo()` in `App.tsx`
// 	}

// 	useEffect(() => {
// 		// Reset form when submit is successful
// 		reset()
// 	}, [isSubmitSuccessful, reset])


// 	return (
// 		<Form onSubmit={handleSubmit(onFormSubmit)} className="mb-3">
// 			<InputGroup>
// 				<Form.Control
// 					type="text"
// 					className="form-control"
// 					aria-label="The title of the new Todo"
// 					{...register('title', {
// 						required: "You have to write something at least...",
// 						minLength: {
// 							value: 5,
// 							message: "That's too short to be a todo, better do it right now instead!"
// 						},
// 					})}
// 				/>

// 				<Button
// 					type="submit"
// 					variant="success"
// 				>Create</Button>
// 			</InputGroup>
// 			{errors.title && <p className="text-danger">{errors.title.message ?? "Invalid value"}</p>}
// 		</Form>
// 	)
// }

// export default AddNewTodoForm

// import React, { useEffect, useRef, useState } from 'react'
// import { NewTodo } from '../types/Todo.types'

// // eslint-disable-next-line @typescript-eslint/no-empty-interface
// interface IProps {
// 	onAddTodo: (todo: NewTodo) => void
// }

// const AddNewTodoForm: React.FC<IProps> = ({ onAddTodo }) => {
// 	const [newTodoTitle, setNewTodoTitle] = useState("")
// 	const newTodoTitleRef = useRef<HTMLInputElement>(null)

// 	const handleSubmit = (e: React.FormEvent) => {
// 		// stop form from submitting
// 		e.preventDefault()

// 		// create a new todo and set a new todos state
// 		const newTodo: NewTodo = {
// 			title: newTodoTitle,
// 			completed: false,
// 		}
// 		onAddTodo(newTodo)   // <-- calls `addTodo()` in `App.tsx`

// 		// clear newTodoTitle state
// 		setNewTodoTitle("")
// 	}

// 	// On component mount, focus on input field
// 	useEffect(() => {
// 		newTodoTitleRef.current?.focus()
// 	}, [])

// 	// console.log("AddNewTodoForm rendering...")

// 	return (
// 		<form onSubmit={handleSubmit} className="mb-3">
// 			<div className="input-group">
// 				<input
// 					ref={newTodoTitleRef}
// 					type="text"
// 					className="form-control"
// 					placeholder="Todo title"
// 					onChange={e => setNewTodoTitle(e.target.value)}
// 					value={newTodoTitle}
// 				/>

// 				<button
// 					disabled={!newTodoTitle.trim()}
// 					type="submit"
// 					className="btn btn-success"
// 				>Create</button>
// 			</div>
// 		</form>
// 	)
// }

// export default AddNewTodoForm
