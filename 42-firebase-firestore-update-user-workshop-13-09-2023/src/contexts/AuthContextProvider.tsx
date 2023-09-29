import {
	UserCredential,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	onAuthStateChanged,
	User,
	signOut,
	sendPasswordResetEmail,
	reload,
	updatePassword,
	updateEmail,
	updateProfile,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import SyncLoader from "react-spinners/SyncLoader";
import { auth } from "../services/firebase";

type AuthContextType = {
	currentUser: User | null;
	login: (email: string, password: string) => Promise<UserCredential>;
	logout: () => Promise<void>;
	signup: (email: string, password: string) => Promise<UserCredential>;
	reloadUser: () => Promise<void>;
	resetPassword: (email: string, password: string) => Promise<void>;
	setEmail: ( newEmail: string) => Promise<void>;
	setDisplayName: (name: string) => Promise<void>;
	setPassword: ( newPassword: string) => Promise<void>;
	setPhotoUrl: (name: string) => Promise<void>;
	userEmail: string | null
	userName: string | null
	userPhotoUrl: string | null
};

// This creates the actual context and sets the context's initial/default value
export const AuthContext = createContext<AuthContextType | null>(null);

type AuthContextProps = {
	children: React.ReactNode;
};

const AuthContextProvider: React.FC<AuthContextProps> = ({ children }) => {
	const [currentUser, setCurrentUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);
	const [userEmail, setUserEmail] = useState<string | null>(null)
	const [userName, setUserName] = useState<string | null>(null)
	const [userPhotoUrl, setUserPhotoUrl] = useState<string | null>(null)

	const login = (email: string, password: string) => {
		return signInWithEmailAndPassword(auth, email, password);
	};

	const logout = () => {
		return signOut(auth);
	};

	const signup = (email: string, password: string) => {
		return createUserWithEmailAndPassword(auth, email, password);
	};

	const reloadUser = async () => {
		const user = auth.currentUser;
		if (user) {
			await reload(user);
			setCurrentUser(user);
		}
	};

	const resetPassword = async (email: string) => {
		return sendPasswordResetEmail(auth, email);
	};

	const setPassword = async (newPassword: string) => {
		if (!currentUser) {
			return;
		}
		return updatePassword(currentUser, newPassword);
	};

	const setEmail = async (newEmail: string) => {
		if (!currentUser) {
			return;
		}
		return updateEmail( currentUser, newEmail);
	};

	const setDisplayName = async (displayName: string) => {
        if (!currentUser) {
            return
        }
        return await updateProfile(currentUser, { displayName })
    }

    const setPhotoUrl = async (photoURL: string) => {
        if (!currentUser) {
            return
        }
        return await updateProfile(currentUser, { photoURL })
    }

	// add auth-state observer here (somehow... 😈)
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, user => {
			console.log("Auth state changed:", user)
			setCurrentUser(user);

			if (user) {
				// User is logged in
				setUserEmail(user.email);
				setUserName(user.displayName);
				setUserPhotoUrl(user.photoURL);
			} else {
				// No user is logged in
				setUserEmail(null);
				setUserName(null);
				setUserPhotoUrl(null);
			}
			setLoading(false);
		});

		return unsubscribe;
	}, []);

	return (
		<AuthContext.Provider
			value={{
				currentUser,
				login,
				logout,
				signup,
				reloadUser,
				resetPassword,
				userEmail,
				userName,
				userPhotoUrl,
				setEmail,
				setDisplayName,
				setPhotoUrl,
				setPassword
			}}
		>
			{loading ? (
				<div id="initial-loader">
					<SyncLoader
						color={"#888"}
						size={15}
						speedMultiplier={1.1}
					/>
				</div>
			) : (
				<>{children}</>
			)}
		</AuthContext.Provider>
	);
};

export default AuthContextProvider;
