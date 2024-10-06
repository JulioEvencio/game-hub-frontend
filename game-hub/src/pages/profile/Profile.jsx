import styles from './Profile.module.css'

import { useNavigate } from 'react-router-dom'

import GameComponent from '../../components/game/GameComponent'

function Profile() {
    const games = [
        {
            username: 'username',
            name: 'Silmance',
            picture: 'https://img.itch.zone/aW1nLzE2MDM3OTM3LnBuZw==/315x250%23c/ZQl0Is.png',
            slug: 'silmance'
        },
        {
            username: 'username',
            name: 'Control Pixel',
            picture: 'https://img.itch.zone/aW1nLzE1MTYwNDUzLnBuZw==/315x250%23c/BVdcyx.png',
            slug: 'control-pixel'
        },
        {
            username: 'username',
            name: 'Dyrvania',
            picture: 'https://img.itch.zone/aW1nLzE1NDE3MzcwLnBuZw==/315x250%23c/vG4cIJ.png',
            slug: 'dyrvania'
        }
    ]

    const navigate = useNavigate()

    const handlePublishGame = () => {
        // Code
    }

    const handleSettings = () => {
        // Code
    }

    const handleLogout = () => {
        navigate('/logout')
    }

    return (
        <div className={styles.profile}>
            <section className={styles.user}>
                <figure>
                    <img src={`https://api.dicebear.com/9.x/bottts/svg?seed=${games[0].user}`} alt='Profile'></img>
                </figure>

                <h1>Username</h1>

                <button onClick={handlePublishGame}>Publish game</button>
                <button onClick={handleSettings}>Settings</button>
                <button onClick={handleLogout}>Logout</button>
            </section>

            <section className={styles.card}>
                <h2>My Games</h2>
                <hr />

                <div>
                    {
                        games.map((game, i) => (
                            <GameComponent
                                key={i}
                                username={game.username}
                                name={game.name}
                                slug={game.slug}
                                src={game.picture}
                            />
                        ))
                    }
                </div>
            </section>
        </div>
    )
}

export default Profile
