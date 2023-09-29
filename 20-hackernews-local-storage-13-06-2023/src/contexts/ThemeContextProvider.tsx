/* eslint-disable react-refresh/only-export-components */
// import { createContext, useContext, useState} from 'react'
import { createContext} from 'react'
import useLocalStorage from '../hooks/useLocalStorage'


// type ThemeContextType = "light" | "dark"
// type ThemeContextTypeStr = string

// const a: ThemeContextTypeStr = "lol"
// const b: ThemeContextTypeStr = "dark"
// const c: ThemeContextTypeStr = "medium"

// const d: ThemeContextTypeStr = "dark"
// const e: ThemeContextTypeStr = "light"
// const f: ThemeContextTypeStr = "42"


type ThemeContextType = {
	isDarkMode: boolean
	// toggleTheme?: () => void => Not correct
	toggleTheme: () => void
}

// This creates the actual context and sets the context's initial/default value
// export const ThemeContext = createContext<ThemeContextType | null>({
// 	isDarkMode: false,
// 	toggleTheme: () =>{
// 		// we can provide a "default" implementation that throws an error if
// 		// trying to use `toggleTheme()` outside of the context
// 		throw new Error("Trying to use toggleTheme outside of context")
// 	}
// })

export const ThemeContext = createContext<ThemeContextType | null>(null)


// Custom hook!
// export const useThemeContext = () =>{
// 	return useContext(ThemeContext)
// }


interface IProps {
	children: React.ReactNode
}

// This allows us to wrap <App /> and provide the theme to our children and grandchildren etc.
// const ThemeContextProvider: React.FC<IProps> = ({ children }) => {
// 	const [isDarkMode, setIsDarkMode] = useState<boolean>(false)

// 	const toggleTheme = () => {
// 		setIsDarkMode(!isDarkMode)
// 	}

// 	return (
// 		<ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
// 			{children}
// 		</ThemeContext.Provider>
// 	)
// }

// export default ThemeContextProvider

const ThemeContextProvider: React.FC<IProps> = ({ children }) => {
	// const [isDarkMode, setIsDarkMode] = useLocalStorage<boolean>('hn_darkmode', false);
	const [ isDarkMode,setIsDarkMode]= useLocalStorage<boolean>('hn_darkmode', false);
	// const [isDarkMode, setIsDarkMode] = useState<boolean>(() =>{
	// 	const hn_darkmode = window.localStorage.getItem('hn_darkmode') ?? ""

	// 	return hn_darkmode === "true"
	// })


	const toggleTheme = () => {
		setIsDarkMode(!isDarkMode)
		window.localStorage.setItem('hn_darkmode', String(!isDarkMode))
	}

	return (
		<ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	)
}

export default ThemeContextProvider

