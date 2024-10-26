import styles from './PasswordRecoveryPage.module.css'

import { useState } from 'react'

import { passwordRecovery } from '../../services/authService'

function PasswordRecoveryPage() {
    const [loading, setLoading] = useState(false)

    const [email, setEmail] = useState('')

    const [hasErrors, setHasErrors] = useState(false)
    const [errors, setErrors] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        setLoading(true)
        setHasErrors(false)

        const response = await passwordRecovery(email)

        if (response.errors.length === 0) {
            alert(response.body.message)

            setEmail('')
        } else {
            setHasErrors(true)
            setErrors(response.errors)
        }

        setLoading(false)
    }

    return (
        <div className={styles.password_recovery}>
            <h1>Password Recovery</h1>
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
                    Email:<br />
                    <input
                        type='email'
                        placeholder='E-mail'
                        required
                        onChange={(e) => setEmail(e.target.value)}
                        value={email || ''}
                    ></input>
                </label>

                {
                    loading ?
                        <button type='submit' disabled>Wait a moment...</button>
                        :
                        <button type='submit'>Send</button>
                }
            </form>
        </div>
    )
}

export default PasswordRecoveryPage
