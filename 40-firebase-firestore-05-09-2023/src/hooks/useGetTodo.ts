import { todosCol } from '../services/firebase'
import { Todo } from '../types/Todo.types'
// import useGetDocument from './useGetDocument'
import useStreamDocument from './useStreamDocument';

const useGetTodo = (documentId: string) => {
	// return useGetDocument<Todo>(todosCol, documentId)
	return useStreamDocument<Todo>(todosCol, documentId)

	// const [data, setData] = useState<Todo | null>(null);
	// const [error, setError] = useState(false);
	// const [loading, setLoading] = useState(true);

	// // Get todo
	// const getData = async (documentId: string) => {
	// 	setError(false);
	// 	setLoading(true);

	// 	// get reference to document in `todos` collection
	// 	const docRef = doc(todosCol, documentId);
	// 	const docSnapShot = await getDoc(docRef);

	// 	if (!docSnapShot.exists()) {
	// 		setData(null);
	// 		setError(true);
	// 		setLoading(false);
	// 		return;
	// 	}

	// 	const data: Todo = {
	// 		...docSnapShot.data(),
	// 		_id: docSnapShot.id,
	// 	};

	// 	setData(data);
	// 	setLoading(false);
	// };

	// useEffect(() => {
	// 	getData(documentId);
	// }, [documentId]);

	// return {
	// 	data,
	// 	error,
	// 	getData,
	// 	loading
	// };
};

export default useGetTodo;
