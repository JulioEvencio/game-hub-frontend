import styles from './PublishGamePage.module.css'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAuthContext } from '../../../hooks/useAuthContext'
import { publishGame } from '../../../services/gameService'

function PublishGamePage() {
    const { authContext } = useAuthContext()

    const [loading, setLoading] = useState(false)

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [coverImage, setCoverImage] = useState(null)
    const [file, setFile] = useState(null)
    const [screenshots, setScreenshots] = useState([])

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
            description: description,
            coverImage: coverImage,
            file: file,
            screenshots: screenshots
        })

        if (response.errors.length === 0) {
            navigate('/profile')
        } else {
            setHasErrors(true)
            setErrors(response.errors)
            setLoading(false)
        }
    }

    const transformName = (value) => {
        return value
            .toLowerCase()
            .replace(/[^a-z0-9_ ]/g, '_')
            .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    };

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
                    <input
                        type='text'
                        placeholder='Name'
                        required
                        onChange={(e) => setName(transformName(e.target.value))}
                        value={name || ''}
                    />
                </label>

                <label>
                    Description:<br />
                    <textarea
                        placeholder='Description'
                        required
                        onChange={(e) => setDescription(e.target.value)}
                        value={description || ''}
                        maxLength={10000}
                    />
                </label>

                <label>
                    Cover Image:<br />
                    <input type='file' accept='image/png, image/jpeg, image/jpg' required onChange={(e) => setCoverImage(e.target.files[0])} />
                </label>

                <label>
                    File (.zip):<br />
                    <input type='file' accept='.zip' required onChange={(e) => setFile(e.target.files[0])} />
                </label>

                <label>
                    Screenshots:<br />
                    <input type='file' accept='image/png, image/jpeg, image/jpg' multiple required onChange={(e) => setScreenshots(e.target.files)} />
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
