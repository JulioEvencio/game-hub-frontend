import { useContext } from "react";

import { AuthContext } from "../contexts/AuthContext";

export function useAuthContext() {
    const context = useContext(AuthContext)

    if (!context) {
        console.log('Error - Context not found...')
    }

    return context
}
