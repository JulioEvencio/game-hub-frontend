import styles from './Header.module.css'

import { useState } from 'react'
import { NavLink } from 'react-router-dom'

import { useAuthContext } from '../../hooks/useAuthContext'

function Header() {
    const { tokenContext } = useAuthContext()
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

                        {
                            tokenContext != null &&
                            <>
                                <li>
                                    <NavLink to='/profile' onClick={() => handlerMenuMobileButton(false)}>Profile</NavLink>
                                </li>

                                <li>
                                    <NavLink to='/logout' onClick={() => handlerMenuMobileButton(false)}>Logout</NavLink>
                                </li>
                            </>
                        }

                        {
                            tokenContext == null &&
                            <>
                                <li>
                                    <NavLink to='/login' onClick={() => handlerMenuMobileButton(false)}>Login</NavLink>
                                </li>

                                <li>
                                    <NavLink to='/register' onClick={() => handlerMenuMobileButton(false)}>Register</NavLink>
                                </li>
                            </>
                        }
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header
