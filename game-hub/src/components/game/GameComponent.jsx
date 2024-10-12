import styles from './GameComponent.module.css'

import { Link } from 'react-router-dom'

function GameComponent({ name, slug, src }) {
    return (
        <div className={styles.game}>
            <Link to={`/games/${slug}`}>
                <figure>
                    <img src={src} alt='Game' />
                </figure>

                <h3>{name}</h3>
            </Link>
        </div>
    )
}

export default GameComponent
