import {configureStore} from "@reduxjs/toolkit"
import accountReducer from "../features/account/accountSlice"
import todosReducer from "../features/todos/todosSlice"

export const store = configureStore({
	reducer: {
		account:accountReducer,
		todos: todosReducer,
	},
})

// console.log(store);
// console.log(store.getState)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// why not hardcode
// type RootState = {
//     account: Account;
// } it´s because you can add more stuff on the fly in the reducer above like todos: todosReducer for example...

// ReturnType
// type Stuff = () => string instead you can use typeOf
// const doStuff = () =>{
// 	return 42
// 	return "lol"
// }
// type Stuff = doStuff X but
// type Stuff = typeof doStuff
// type Stuff = ReturnType<typeof doStuff> either number or string of the above return the type definition!




