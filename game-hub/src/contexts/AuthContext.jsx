import { createContext, useState } from 'react'

export const AuthContext = createContext()

export function AuthContextProvider({ children }) {
    const [authContext, setAuthContext] = useState(null)

    return (
        <AuthContext.Provider value={{ authContext, setAuthContext }}>
            {children}
        </AuthContext.Provider>
    )
}
