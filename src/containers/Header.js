import React, { useContext } from 'react'
import { ThemeContext } from '../context/context'
import ThemeImgMoon from '../imgs/icon-moon.svg'
import ThemeImgSun from '../imgs/icon-sun.svg'

function Header() {

    const { theme, onChange } = useContext(ThemeContext)

    return (
        <header className='header'>
            <nav className="flex nav">
                <h1 className='main-title'>Todo</h1>
                <button className='btn btn-theme-control'
                    aria-pressed={theme}
                    onClick={onChange}>
                    <span className='sr-only'>{"light theme"}</span>
                    <img className={`light-theme-img ${theme ? "hide-theme-img" : ""}`} src={ThemeImgMoon} alt="" />
                    <img className={`dark-theme-img ${theme ? "" : "hide-theme-img"}`} src={ThemeImgSun} alt="" />
                </button>
            </nav>
        </header>
    )
}

export default Header