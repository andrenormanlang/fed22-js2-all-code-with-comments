import Button from "react-bootstrap/Button"
import ButtonGroup from "react-bootstrap/ButtonGroup"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"

const HomePage = () => {

	const navigate = useNavigate();


	return (
		<>
			<h1>Firebase Todos</h1>
			<h2>Because when you're life is on fire, you need a todo list</h2>

			<ButtonGroup>
				<Button
					variant="danger"
					size="lg"
					onClick={() => {
						toast.error(
							"🚂 CHOO-CHOO, GET ON DA HYPE TRAIINNNN!!111"
						)
						navigate("/login");
					}}
				>
					HYPE ME 🔥
				</Button>
			</ButtonGroup>
		</>
	)
}

export default HomePage
