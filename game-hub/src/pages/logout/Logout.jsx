import { useNavigate } from "react-router-dom"

import { useAuthContext } from "../../hooks/useAuthContext"

function Logout() {
    const navigate = useNavigate()
    const { setTokenContext } = useAuthContext()

    setTokenContext(null)
    navigate('/login')

    return (
        <div>
            <p>loading</p>
        </div>
    )
}

export default Logout
