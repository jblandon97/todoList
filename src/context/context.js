import { useState, createContext, useEffect } from 'react'


export const ThemeContext = createContext()

export const ThemeProvider = (props) => {

    /* Get theme value from localStorage. */
    const getThemeFromLocalStorage = () => {
        return localStorage.getItem('globalTheme') === 'true'
    }

    const [theme, setTheme] = useState(getThemeFromLocalStorage)
   

    /* Post to localStorage user preferred theme. */
    const postThemeToLocalStorage = (newTheme) => {
        localStorage.setItem('globalTheme', newTheme)
    }
    /* Click handler */
    const onChange = () => {
        postThemeToLocalStorage(!theme)
        setTheme(!theme)
    }
    
    /* Trigger useEffect only on render */
    /* Set theme state to saved theme in local storage */

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