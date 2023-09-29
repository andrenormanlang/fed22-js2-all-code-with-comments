import { orderBy, where } from 'firebase/firestore'
import { todosCol } from '../services/firebase'
import { Todo } from '../types/Todo.types'
import useStreamCollection from './useStreamCollection'

const useGetTodos = (uid: string) => {
	return useStreamCollection<Todo>(todosCol, where('uid', '==', uid), orderBy('completed'), orderBy('title'))
}

export default useGetTodos

// import { orderBy, where } from 'firebase/firestore'
// import { auth, todosCol } from '../services/firebase'
// import { Todo } from '../types/Todo.types'
// import useStreamCollection from './useStreamCollection'

// const useGetTodos = () => {
// 	const user = auth.currentUser;
// 	const uid = user ? user.uid : null;

// 	return useStreamCollection<Todo>(todosCol, where('ownerUid', '==', uid), orderBy('completed'), orderBy('title'))
// }

// export default useGetTodos
