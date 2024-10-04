import { useAuthContext } from "../../hooks/useAuthContext"

function Profile() {
    const { tokenContext, usernameContext } = useAuthContext()
    
    return (
        <div>
            <h1>Profile</h1>
            <p>{usernameContext}</p>
            <p>{tokenContext}</p>
        </div>
    )
}

export default Profile
