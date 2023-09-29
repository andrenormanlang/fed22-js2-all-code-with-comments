import React, { createContext, useEffect, useState } from "react";
import { auth } from "../services/firebase";
import {
	User,
	UserCredential,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	onAuthStateChanged,
	signOut,
} from "firebase/auth";
import LoadingSpinner from "../components/LoadingSpinner";

type AuthContextType = {
	currentUser: User | null;
	login: (email: string, password: string) => Promise<UserCredential>;
	logout: () => Promise<void>;
	signup: (email: string, password: string) => Promise<UserCredential>;
	userEmail: string | null;
	authChecked: boolean;
};
export const AuthContext = createContext<AuthContextType | null>(null);

type AuthContextProps = {
	children: React.ReactNode;
};

const AuthContextProvider: React.FC<AuthContextProps> = ({ children }) => {
	const [currentUser, setCurrentUser] = useState<User | null>(null);
	const [userEmail, setUserEmail] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const [authChecked, setAuthChecked] = useState(false);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, user => {
			if (user) {
				setCurrentUser(user);
				setUserEmail(user.email);
			} else {
				setCurrentUser(null);
				setUserEmail(null);
			}
			setLoading(false);
			setAuthChecked(true); // Authentication check completed
		});

		return () => {
			unsubscribe();
		};
	}, []);

	const signup = async (email: string, password: string) => {
		try {
			setLoading(true); // Set loading to true when signing up

			// Simulate a delay of 3 seconds (3000 milliseconds) before continuing
			await new Promise(resolve => setTimeout(resolve, 3000));

			const userCredentials = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);

			return userCredentials;
		} finally {
			setLoading(false); // Reset loading when signup is finished (success or failure)
		}
	};

	const login = async (email: string, password: string) => {
		try {
			setLoading(true); // Set loading to true when logging in

			// Simulate a delay of 3 seconds (3000 milliseconds) before continuing
			await new Promise(resolve => setTimeout(resolve, 3000));

			const userLogin = await signInWithEmailAndPassword(
				auth,
				email,
				password
			);

			return userLogin;
		} finally {
			setLoading(false); // Reset loading when login is finished (success or failure)
		}
	};

	const logout = async () => {
		try {
			setLoading(true); // Set loading to true when logging out

			// Simulate a delay of 1 second (1000 milliseconds) before continuing
			await new Promise(resolve => setTimeout(resolve, 1000));

			await signOut(auth);
		} finally {
			setLoading(false); // Reset loading when logout is finished (success or failure)
		}
	};

	return (
		<AuthContext.Provider
			value={{
				currentUser,
				login,
				logout,
				signup,
				userEmail,
				authChecked,
			}}
		>
			{loading ? <LoadingSpinner /> : children}
		</AuthContext.Provider>
	);
};

export default AuthContextProvider;
