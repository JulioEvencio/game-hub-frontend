import styles from './ProfilePage.module.css'

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import GameComponent from '../../components/game/GameComponent'
import { useAuthContext } from '../../hooks/useAuthContext'
import { getLoggedUser } from './../../services/userService'

function ProfilePage() {
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState()
    const [games, setGames] = useState([])
    const { authContext, setAuthContext } = useAuthContext()
    const navigate = useNavigate()

    useEffect(() => {
        async function loadUser() {
            setLoading(true)

            const result = await getLoggedUser({ accessToken: authContext.accessToken })

            if (result.errors.length === 0) {
                setUser(result.body.user)
                setGames(result.body.games)
            } else {
                setAuthContext(null)
            }

            setLoading(false)
        }

        loadUser()
    }, [authContext, setAuthContext])

    const handlePublishGame = () => {
        navigate('/publish-game')
    }

    const handleUpdatePassword = () => {
        navigate('/profile/password-update')
    }

    const handleLogout = () => {
        navigate('/logout')
    }

    return (
        <div className={styles.profile}>
            {
                loading ?
                    <>
                        <h1>Loading</h1>
                    </>
                    :
                    <>
                        <section className={styles.user}>
                            <figure>
                                <img src={user.pictureURL} alt='Profile'></img>
                            </figure>

                            <h1>{user.username}</h1>

                            <button onClick={handlePublishGame}>Publish game</button>
                            <button onClick={handleUpdatePassword}>Update password</button>
                            <button onClick={handleLogout}>Logout</button>
                        </section>

                        <section className={styles.card}>
                            <h2>My Games</h2>
                            <hr />

                            <div>
                                {
                                    games.map((game) => (
                                        <GameComponent
                                            key={game.id}
                                            name={game.name}
                                            slug={game.slug}
                                            src={game.coverImageUrl}
                                        />
                                    ))
                                }
                            </div>
                        </section>
                    </>
            }
        </div>
    )
}

export default ProfilePage
