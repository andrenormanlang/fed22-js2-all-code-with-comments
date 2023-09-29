// import { useCallback, useEffect, useState } from "react";
import { useEffect, useState } from "react";
// import { CollectionReference, doc, getDoc, onSnapshot } from "firebase/firestore";
import { CollectionReference, doc, onSnapshot } from "firebase/firestore";

const useStreamDocument = <T>(colRef: CollectionReference<T>, documentId: string) => {
	const [data, setData] = useState< T | null>(null);
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(true);

	// Get data on component mount
	useEffect(() => {
		// get reference to document in collection
		const docRef = doc(colRef, documentId);

		// Subscribe to changes in the document
		const unsubscribe = onSnapshot(docRef, (snapshot) => {
			if (!snapshot.exists()) {
			setData(null)
			setError(true);
			setLoading(false);
			return;
		}

		const data: T = {
			...snapshot.data(),
			_id: snapshot.id,
		};

		// data.sort((a,b)=>{})

		setData(data);
		setLoading(false);

		})

		// Return unsubscribe function as cleanup
		return unsubscribe
		// return () =>{
		// 	console.log('Oh noooo, I´m being unmounted, better unsubscribe from that document');
		// 	unsubscribe();
		// }


	}, [colRef, documentId]);

	return {
		data,
		error,
		// getData,
		loading,
	};
};

	// const getData = useCallback(async () => {
	// 	setLoading(true);
	// 	setError(false);

	// 	// get reference to document in `todos` collection
	// 	const docRef = doc(colRef, documentId);
	// 	const docSnapshot = await getDoc(docRef);

	// 	if (!docSnapshot.exists()) {
	// 		setData(null)
	// 		setError(true);
	// 		setLoading(false);
	// 		return;
	// 	}

	// 	const data: T = {
	// 		...docSnapshot.data(),
	// 		_id: docSnapshot.id,
	// 	};

	// 	setData(data);
	// 	setLoading(false);

	// }, [colRef, documentId]);



export default useStreamDocument;

