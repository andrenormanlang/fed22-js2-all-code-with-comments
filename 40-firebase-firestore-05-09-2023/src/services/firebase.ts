// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {CollectionReference, DocumentData, collection, getFirestore} from "firebase/firestore"
import { NewTodo, Todo } from "../types/Todo.types";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration

const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
	projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
	storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: import.meta.env.FIREBASE_MESSAGING_SENDER_ID,
	appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Auth instance
export const auth = getAuth(app);

// Get Firestore instance
export const db = getFirestore(app)

// const colRef = collection(db, "todos") as CollectionReference<Todo>
const createCollection = <T = DocumentData>(collectionName: string) => {
	return collection(db, collectionName) as CollectionReference<T>
}

export const todosCol = createCollection<Todo>("todos")
export const newTodosCol = createCollection<NewTodo>("todos")

export default app
// export const usersCol = createCollection<User>("users")
// in case of other instances do the following:
// export default app

// // CHECK RULES IN FIREBASE FIRESTORE!
// // rules_version = '2';

// // service cloud.firestore {
// //   match /databases/{database}/documents {

// //     // This rule allows anyone with your Firestore database reference to view, edit,
// //     // and delete all data in your Firestore database. It is useful for getting
// //     // started, but it is configured to expire after 30 days because it
// //     // leaves your app open to attackers. At that time, all client
// //     // requests to your Firestore database will be denied.
// //     //
// //     // Make sure to write security rules for your app before that time, or else
// //     // all client requests to your Firestore database will be denied until you Update
// //     // your rules
// //     match /{document=**} {
// //       allow read, write: if request.time < timestamp.date(2023, 9, 30);
// //     }
// //   }
// // }
