import { useState, createContext, useEffect } from 'react'


export const ThemeContext = createContext()

export const ThemeProvider = (props) => {

    const getThemeFromLocalStorage = () => {
        return localStorage.getItem('globalTheme') === 'true'
    }

    const [theme, setTheme] = useState(getThemeFromLocalStorage)
   

    const postThemeToLocalStorage = (newTheme) => {
        localStorage.setItem('globalTheme', newTheme)
    }
    const onChange = () => {
        postThemeToLocalStorage(!theme)
        setTheme(!theme)
    }
    
    useEffect(() => {
        const app = document.querySelector('.app')
        setTheme(getThemeFromLocalStorage())
        theme ? app.classList.remove("dark-theme") : app.classList.add("dark-theme")
    }, [theme])  
   

    return (
        <ThemeContext.Provider value={{ theme, onChange }}>
            {props.children}
        </ThemeContext.Provider>
    )
}