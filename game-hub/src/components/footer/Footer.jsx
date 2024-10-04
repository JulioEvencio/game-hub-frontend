import styles from './Footer.module.css'

import { Link } from 'react-router-dom'

function Footer() {
    return (
        <footer className={styles.footer}>
            <div>
                <p>
                    Developed by <Link to='https://github.com/JulioEvencio' target='_blank'><strong>Júlio Igreja</strong></Link>
                </p>
            </div>
        </footer>
    )
}

export default Footer
