import { useContext } from "react"
import { ThemeContext } from "../contexts/ThemeContextProvider"

const useThemeContext = () => {
	const themeContext = useContext(ThemeContext)

	if(!themeContext) {
		throw new Error("Trying to use ThemeContext outside of ThemeContextProvider")
	}

	return themeContext

	// return useContext(ThemeContext)
}

export default useThemeContext
