import styles from './HomePage.module.css'

import { useEffect, useState } from 'react'

import GameComponent from '../../components/game/GameComponent'
import { findAllGames } from '../../services/gameService'

function HomePage() {
    const [loading, setLoading] = useState(true)
    const [games, setGames] = useState([])

    useEffect(() => {
        async function loadGames() {
            setLoading(true)

            const result = await findAllGames(0, 1000)

            if (result.errors.length === 0) {
                setGames(result.body.games.content)
                setLoading(false)
            }
        }

        loadGames()
    }, [])

    return (
        <div className={styles.home}>
            <h1>Games</h1>

            {
                loading ?
                <>
                    <h1>Loading</h1>
                </>
                :
                <>
                    <section>
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
                    </section>
                </>
            }
        </div>
    )
}

export default HomePage
