import styles from './LoginPage.module.css'

import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useAuthContext } from '../../hooks/useAuthContext'
import { loginUser } from '../../services/authService'

function LoginPage() {
    const { setAuthContext } = useAuthContext()

    const [loading, setLoading] = useState(false)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [hasErrors, setHasErrors] = useState(false)
    const [errors, setErrors] = useState([])

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        setLoading(true)
        setHasErrors(false)

        const response = await loginUser({ email, password })

        if (response.errors.length === 0) {
            const auth = {
                accessToken: response.body.accessToken
            }

            setAuthContext(auth)
            navigate('/profile')
        } else {
            setHasErrors(true)
            setErrors(response.errors)
            setLoading(false)
        }
    }

    return (
        <div className={styles.login}>
            <h1>Login to your Game Hub account</h1>
            <hr />

            <form onSubmit={handleSubmit}>
                {
                    hasErrors &&
                    <div>
                        <h3>Errors</h3>

                        <ul>
                            {
                                errors.map((error, i) => (
                                    <li key={i}>{error}</li>
                                ))
                            }
                        </ul>
                    </div>
                }

                <label>
                    E-mail:<br />
                    <input type='email' placeholder='E-mail' required onChange={(e) => setEmail(e.target.value)} value={email || ''}></input>
                </label>

                <label>
                    Password:<br />
                    <input type='password' placeholder='Password' required onChange={(e) => setPassword(e.target.value)} value={password || ''}></input>
                </label>

                {
                    loading ?
                        <button type='submit' disabled>Wait a moment...</button>
                        :
                        <button type='submit'>Login</button>
                }

                <Link to='/password-recovery' target='_self'>Forgot password?</Link>
            </form>
        </div>
    )
}

export default LoginPage
