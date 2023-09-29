/* eslint-disable @typescript-eslint/no-empty-function */
import { User, UserCredential, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { createContext, useEffect, useState } from 'react'
import { auth } from '../services/firebase'
import { SyncLoader } from 'react-spinners'

type AuthContextType = {
	currentUser: User | null
	login: (email: string, password: string) => Promise<UserCredential>
	logout: () => Promise<void>
	signup: (email: string, password: string) => Promise<UserCredential>
	// reloadUser: ?
	// resetPassword: ?
	// setEmail: ?
	// setDisplayName: ?
	// setPassword: ?
	// setPhotoUrl: ?
	userEmail: string | null
	userName: string | null
	userPhotoUrl: string | null
}

// This creates the actual context and sets the context's initial/default value
export const AuthContext = createContext<AuthContextType | null>(null)

type AuthContextProps = {
	children: React.ReactNode
}

const AuthContextProvider: React.FC<AuthContextProps> = ({ children }) => {
	const [currentUser, setCurrentUser] = useState<User | null>(null)
	const [loading, setLoading] = useState(true)
	const [userEmail, setUserEmail] = useState<string | null>(null)
	const [userName, setUserName] = useState<string | null>(null)
	const [userPhotoUrl, setUserPhotoUrl] = useState<string | null>(null)

	const login = (email: string, password: string) => {
		return signInWithEmailAndPassword(auth, email, password)
	}

	const logout = () => {
		return signOut(auth)
	}

	const signup = (email: string, password: string) => {
		return createUserWithEmailAndPassword(auth, email, password)
	}

	// const reloadUser = async () => {
	// }

	// const resetPassword = (email: string) => {
	// }

	// const setEmail = (email: string) => {
	// }

	// const setPassword = (password: string) => {
	// }

	// const setDisplayName = (name: string) => {
	// }


	// add auth-state observer here (somehow... 😈)
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			console.log("Auth state changed:", user)
			setCurrentUser(user)

			// setUserEmail(user?.email ?? null) or below with setCurrentUser()
			if (user){
				// User is logged in
				// setCurrentUser(user)
				setUserEmail(user.email)
			} else{
				// No user is logged in
				// setCurrentUser(null)
				setUserEmail(null)

			}
			setLoading(false)
		})
		return unsubscribe
		// return onAuthStateChanged(auth, (user) => {
		// 	setCurrentUser(user)
		// })
	}, [])

	console.log('current user:',currentUser);


	return (
		<AuthContext.Provider value={{
			currentUser,
			login,
			logout,
			signup,
			userEmail,
			userName,
			userPhotoUrl
		}}>
			{loading ? (
				<div id="initial-loader">
					<SyncLoader color={'#888'} size={15} speedMultiplier={1.1} />
				</div>
			) : (
				<>{children}</>
			)}
		</AuthContext.Provider>
	)
}

export default AuthContextProvider
