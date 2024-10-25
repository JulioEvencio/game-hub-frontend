import styles from './PasswordUpdate.module.css'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAuthContext } from '../../hooks/useAuthContext'
import { passwordUpdate } from '../../services/authService'

function PasswordUpdatePage() {
    const [loading, setLoading] = useState(false)

    const { authContext, setAuthContext } = useAuthContext()

    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [hasErrors, setHasErrors] = useState(false)
    const [errors, setErrors] = useState([])

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        setLoading(true)
        setHasErrors(false)

        if (password === confirmPassword) {
            const response = await passwordUpdate(authContext.accessToken, password)

            if (response.errors.length === 0) {
                const auth = {
                    accessToken: response.body.accessToken
                }
    
                setAuthContext(auth)
                alert("Password updated successfully!");
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
        <div className={styles.password_update}>
            <h1>Password Update</h1>
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
                    Password:<br />
                    <input type='password' placeholder='Password' required onChange={(e) => setPassword(e.target.value)} value={password || ''}></input>
                </label>

                <label>
                    Confirm Password:<br />
                    <input type='password' placeholder='Password' required onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword || ''}></input>
                </label>

                {
                    loading ?
                        <button type='submit' disabled>Wait a moment...</button>
                        :
                        <button type='submit'>Update</button>
                }
            </form>
        </div>
    )
}

export default PasswordUpdatePage
