import styles from './Header.module.css'

import { useState } from 'react'
import { NavLink } from 'react-router-dom'

function Header() {
    const [menuMobileActivated, setMenuMobileActivated] = useState(false)

    const handlerMenuMobileButton = (value) => {
        setMenuMobileActivated(value)
    }

    return (
        <header className={styles.header}>
            <div>
                <h1>
                    <NavLink to='/' onClick={() => handlerMenuMobileButton(false)}>Game Hub</NavLink>
                </h1>

                <nav>
                    <button onClick={() => handlerMenuMobileButton(!menuMobileActivated)}>&#9776;</button>

                    <ul className={menuMobileActivated ? styles.activated : styles.disabled}>
                        <li>
                            <NavLink to='/' onClick={() => handlerMenuMobileButton(false)}>Home</NavLink>
                        </li>

                        <li>
                            <NavLink to='/login' onClick={() => handlerMenuMobileButton(false)}>Login</NavLink>
                        </li>

                        <li>
                            <NavLink to='/register' onClick={() => handlerMenuMobileButton(false)}>Register</NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header
