import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'

import { useAuthContext } from '../../hooks/useAuthContext'

function PasswordRecoveryTokenPage() {
    const { setAuthContext } = useAuthContext()

    const { token } = useParams()

    const navigate = useNavigate()

    useEffect(() => {
        if (validateToken(token)) {
            const auth = {
                accessToken: token
            }

            setAuthContext(auth)
            navigate('/profile/password-update')
        } else {
            alert('expired link')
            navigate('/login')
        }
    })

    function validateToken(token) {
        try {
            const decoded = jwtDecode(token)
            const currentTime = Date.now() / 1000

            return decoded.exp > currentTime
        } catch (e) {
            return false
        }
    }

    return (
        <div></div>
    )
}

export default PasswordRecoveryTokenPage
