import { CollectionReference, QueryConstraint, onSnapshot, query } from 'firebase/firestore'
import { useEffect, useState } from 'react'

const useStreamCollection = <T>(
	colRef: CollectionReference<T>,
	...queryConstraints: QueryConstraint[]
) => {
	const [data, setData] = useState<T[]|null>(null)
	const [loading, setLoading] = useState(true)

	// Get data on component mount
	useEffect(() => {
		// Construct a query reference
		const queryRef = query(colRef, ...queryConstraints)

		// Subscribe to changes in the collection
		const unsubscribe = onSnapshot(queryRef, (snapshot) => {
			console.log("Got me some data 🤑")
			// loop over all docs
			const data: T[] = snapshot.docs.map(doc => {
				return {
					...doc.data(),
					_id: doc.id,
				}
			})

			setData(data)
			setLoading(false)
		})

		// Return unsubscribe function as cleanup
		return unsubscribe
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [colRef])

	return {
		data,
		loading,
	}
}

export default useStreamCollection

// /* eslint-disable react-hooks/exhaustive-deps */
// import {
// 	CollectionReference,
// 	QueryConstraint,
// 	onSnapshot,
// 	query,
// } from "firebase/firestore";
// // import { useEffect, useMemo, useState } from "react";
// import { useEffect, useState } from "react";

// const useStreamCollection = <T>(
// 	colRef: CollectionReference<T>,
// 	...queryConstraints: QueryConstraint[] // check difference btw spread and rest!!
// 	// where: QueryFieldFilterConstraint[],
// 	// order: QueryOrderByConstraint[]
// ) => {
// 	const [data, setData] = useState<T[] | null>(null);
// 	const [loading, setLoading] = useState(true);

// 	//

// 	// const memoizedQueryConstraints = useMemo(() => queryConstraints, [queryConstraints]) ???
// 	// const queryRef = query(colRef, orderBy('title'))

// 	// Get data on component mount
// 	useEffect(() => {
// 		// Construct a query reference
// 		const queryRef = query(colRef, ...queryConstraints)

// 		// Subscribe to changes in the collection
// 		const unsubscribe = onSnapshot(queryRef, snapshot => {
// 			// console.log("Got me some data 🤑")
// 			// loop over all docs
// 			const data: T[] = snapshot.docs.map(doc => {
// 				return {
// 					...doc.data(),
// 					_id: doc.id,
// 				};
// 			});

// 			setData(data);
// 			setLoading(false);
// 		});

// 		// Return unsubscribe function as cleanup
// 		return unsubscribe;
// 	}, [colRef] /* [colRef, memoizedQueryConstraints] */);

// 	return {
// 		data,
// 		loading,
// 	};
// };

// export default useStreamCollection;
