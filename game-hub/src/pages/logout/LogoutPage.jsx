import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAuthContext } from '../../hooks/useAuthContext'

function LogoutPage() {
    const navigate = useNavigate()
    const { setAuthContext } = useAuthContext()

    useEffect(() => {
        setAuthContext(null)
        navigate('/login')
    })

    return (
        <div>
            <p>loading</p>
        </div>
    )
}

export default LogoutPage
