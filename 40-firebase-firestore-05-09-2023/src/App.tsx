import Container from "react-bootstrap/Container";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navigation from "./pages/partials/Navigation";
import EditTodoPage from "./pages/EditTodoPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound";
import SignupPage from "./pages/SignupPage";
import TodoPage from "./pages/TodoPage";
import TodosPage from "./pages/TodosPage";
import "./assets/scss/App.scss";
import LogoutPage from "./pages/LogOutPage";
import { ProtectedRoute } from "./pages/ProtectedRoute";
import useAuth from "./hooks/useAuth";

const App = () => {
	const { currentUser, authChecked } = useAuth();

	return (
		<div id="App">
			<Navigation />

			<Container className="py-3">
				<Routes>
					<Route path="/" element={<HomePage />} />
					{authChecked && (
						<>
							<Route
								path="/login"
								element={
									currentUser ? (
										<Navigate to="/todos" />
									) : (
										<LoginPage />
									)
								}
							/>
							<Route
								path="/signup"
								element={
									currentUser ? (
										<Navigate to="/todos" />
									) : (
										<SignupPage />
									)
								}
							/>
							<Route
								path="/logout"
								element={
									currentUser ? (
										<LogoutPage />
									) : (
										<Navigate to="/login" />
									)
								}
							/>
							<Route
								path="*"
								element={
									<ProtectedRoute>
										<NotFound />
									</ProtectedRoute>
								}
							/>
						</>
					)}
					<Route path="/todos">
						{currentUser ? (
							<>
								<Route
									path=""
									element={
										<ProtectedRoute>
											<TodosPage />
										</ProtectedRoute>
									}
								/>
								<Route
									path=":id"
									element={
										<ProtectedRoute>
											<TodoPage />
										</ProtectedRoute>
									}
								/>
								<Route
									path=":id/edit"
									element={
										<ProtectedRoute>
											<EditTodoPage />
										</ProtectedRoute>
									}
								/>

								<Route
									path="*"
									element={
										<ProtectedRoute>
											<NotFound />
										</ProtectedRoute>
									}
								/>
							</>
						) : (
							<Route
								path=""
								element={
									currentUser ? null : (
										<Navigate to="/login" />
									)
								}
							/>
						)}
					</Route>
				</Routes>
			</Container>

			<ToastContainer theme="colored" />
		</div>
	);
};

export default App;
