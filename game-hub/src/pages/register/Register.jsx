import styles from './Register.module.css'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAuthContext } from '../../hooks/useAuthContext'

import { registerUser } from '../../services/authService.js'

function Register() {
    const { setAuthContext } = useAuthContext()

    const [loading, setLoading] = useState(false)

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')

    const [hasErrors, setHasErrors] = useState(false)
    const [errors, setErrors] = useState([])

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        setLoading(true)
        setHasErrors(false)

        if (password === repeatPassword) {
            const data = { username, email, password }
            const response = await registerUser(data)

            if (response.errors.length === 0) {
                const auth = {
                    accessToken: response.body.accessToken
                }

                setAuthContext(auth)
                navigate('/profile')
            } else {
                showErrors(response.errors)
            }
        } else {
            showErrors(['the passwords are different'])
        }
    }

    function showErrors(err) {
        setHasErrors(true)
        setErrors(err)
        setLoading(false)
    }

    return (
        <div className={styles.register}>
            <h1>Create an account</h1>
            <hr />

            <div>
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
                        Username:<br />
                        <input type='text' placeholder='Username' required onChange={(e) => setUsername(e.target.value)} value={username || ''}></input>
                    </label>

                    <label>
                        E-mail:<br />
                        <input type='email' placeholder='E-mail' required onChange={(e) => setEmail(e.target.value)} value={email || ''}></input>
                    </label>

                    <label>
                        Password:<br />
                        <input type='password' placeholder='Password' required onChange={(e) => setPassword(e.target.value)} value={password || ''}></input>
                    </label>

                    <label>
                        Repeat password:<br />
                        <input type='password' placeholder='Repeat password' required onChange={(e) => setRepeatPassword(e.target.value)} value={repeatPassword || ''}></input>
                    </label>

                    {
                        loading ?
                        <button type='submit' disabled>Wait a moment...</button>
                        :
                        <button type='submit'>Create account</button>
                    }
                </form>

                <div>
                    <h2>Lorem Ipsum?</h2>

                    <p>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veritatis ipsam qui tempora veniam sint vero autem animi magnam! Consequuntur sequi nulla quod placeat autem consequatur ipsum, illo optio repellendus esse!
                    </p>

                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi dolorem enim facere aliquam, temporibus voluptates! Voluptate fugit non ad, minus pariatur necessitatibus animi provident explicabo, perferendis eligendi totam sed. Doloribus.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Register
