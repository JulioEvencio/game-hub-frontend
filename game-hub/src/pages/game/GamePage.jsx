import styles from './GamePage.module.css'

import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import ButtonDownloadComponent from '../../components/buttons/download/ButtonDownloadComponent'
import CommentComponent from '../../components/comment/CommentComponent'

import { findGameBySlug } from '../../services/gameService'
import { useAuthContext } from '../../hooks/useAuthContext'
import { createNewComment } from '../../services/commentService'

function GamePage() {
    const { authContext } = useAuthContext()

    const [loading, setLoading] = useState(true)
    const { slug } = useParams()

    const [game, setGame] = useState(null)
    const [comments, setComments] = useState([])

    const [newComment, setNewComment] = useState(null)
    const [loadingNewComment, setLoadingNewComment] = useState(false)

    const [hasErrors, setHasErrors] = useState(false)
    const [errors, setErrors] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        async function loadGame() {
            setLoading(true)
    
            const result = await findGameBySlug(slug)
    
            if (result.errors.length === 0) {
                setGame(result.body.game)
                setComments(result.body.comments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)))
            } else {
                navigate('/not-found')
            }
    
            setLoading(false)
        }

        loadGame()
    }, [slug, navigate])

    const handleSubmit = async (e) => {
        e.preventDefault()

        setLoadingNewComment(true)
        setHasErrors(false)
        setErrors([])

        const response = await createNewComment({
            accessToken: authContext.accessToken,
            content: newComment,
            gameSlug: slug
        })

        if (response.errors.length === 0) {
            await loadComments()
            setNewComment('')
        } else {
            setHasErrors(true)
            setErrors(response.errors)
        }

        setLoadingNewComment(false)
    }

    async function loadComments() {
        const result = await findGameBySlug(slug)

        if (result.errors.length === 0) {
            setGame(result.body.game)
            setComments(result.body.comments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)))
        } else {
            navigate('/not-found')
        }
    }

    return (
        <div className={styles.game}>
            {
                loading ?
                    <>
                        <h1>Loading</h1>
                    </>
                    :
                    <>
                        <div>
                            <h1>{game.name}</h1>
                            <hr />

                            <section className={styles.info}>
                                <p>{game.description}</p>
                                <br />
                                <ButtonDownloadComponent url={game.fileUrl} downloadInfo='file.zip' />
                            </section>

                            <section className={styles.comments}>
                                <h2>Comments ({comments.length})</h2>
                                <hr />

                                {
                                    authContext != null &&
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
                                            New comment:<br />
                                            <textarea
                                                placeholder='Description'
                                                required
                                                onChange={(e) => setNewComment(e.target.value)}
                                                value={newComment || ''}
                                                maxLength={100}
                                            />
                                        </label>

                                        {
                                            loadingNewComment ?
                                                <button type='submit' disabled>Wait a moment...</button>
                                                :
                                                <button type='submit'>New Comment</button>
                                        }
                                    </form>
                                }

                                {
                                    comments.map((comment) => (
                                        <CommentComponent
                                            key={comment.id}
                                            content={comment.content}
                                            createdAt={comment.createdAt}
                                            user={comment.user}
                                        />
                                    ))
                                }
                            </section>
                        </div>

                        <section className={styles.screenshots}>
                            {
                                game.screenshotsUrl.map((screenshot, i) => (
                                    <img key={i} src={screenshot} alt='screenshot' />
                                ))
                            }
                        </section>
                    </>
            }
        </div>
    )
}

export default GamePage
