import {  Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";


export function ProtectedRoute ({ children }: { children: React.ReactNode }){
	const {currentUser} = useAuth()

	if(!currentUser){

		return <Navigate to="/login"/>
	}else{
		return <>{children}</>;
	}
}
