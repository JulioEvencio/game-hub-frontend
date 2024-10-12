import styles from './PublishGamePage.module.css'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAuthContext } from '../../../hooks/useAuthContext'
import { publishGame } from '../../../services/gameService'

function PublishGamePage() {
    const { authContext } = useAuthContext()

    const [loading, setLoading] = useState(false)

    const [name, setName] = useState('')
    const [picture, setPicture] = useState(null)
    const [file, setFile] = useState(null)

    const [hasErrors, setHasErrors] = useState(false)
    const [errors, setErrors] = useState([])

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        setLoading(true)
        setHasErrors(false)

        const response = await publishGame({
            accessToken: authContext.accessToken,
            name: name,
            picture: picture,
            file: file
        })

        if (response.errors.length === 0) {
            navigate('/profile')
        } else {
            setHasErrors(true)
            setErrors(response.errors)
            setLoading(false)
        }
    }

    return (
        <div className={styles.publish_game}>
            <h1>Publish Game</h1>
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
                    Name:<br />
                    <input type='text' placeholder='Name' required onChange={(e) => setName(e.target.value)} value={name || ''} />
                </label>

                <label>
                    Picture:<br />
                    <input type='file' accept='image/png, image/jpeg, image/jpg' required onChange={(e) => setPicture(e.target.files[0])} />
                </label>

                <label>
                    File:<br />
                    <input type='file' accept='.zip' required onChange={(e) => setFile(e.target.files[0])} />
                </label>

                {
                    loading ?
                        <button type='submit' disabled>Wait a moment...</button>
                        :
                        <button type='submit'>Publish Game</button>
                }
            </form>
        </div>
    )
}

export default PublishGamePage
