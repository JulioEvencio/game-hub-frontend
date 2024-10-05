import { useAuthContext } from '../../hooks/useAuthContext'

function Profile() {
    const { authContext } = useAuthContext()
    
    return (
        <div>
            <h1>Profile</h1>
            <p>{authContext.accessToken}</p>
        </div>
    )
}

export default Profile
