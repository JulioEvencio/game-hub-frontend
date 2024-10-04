import { useState, createContext } from "react";

export const AuthContext = createContext()

export function AuthContextProvider({ children }) {
    const [tokenContext, setTokenContext] = useState(null)
    const [usernameContext, setUsernameContext] = useState(null)

    return (
        <AuthContext.Provider value={{ tokenContext, setTokenContext, usernameContext, setUsernameContext }}>
            {children}
        </AuthContext.Provider>
    )
}
