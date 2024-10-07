import { fetchAPI } from "./apiService"

export async function registerUser({ username, email, password }) {
    const result = await fetchAPI({
        method: 'POST',
        endpoint: '/auth/register',
        headers: {
            'Content-Type': 'application/json'
        },
        data: { username, email, password }
    })

    if (result.errors.length === 0) {
        return await loginUser({ email, password })
    }

    return result
}

export async function loginUser({ email, password }) {
    return fetchAPI({
        method: 'POST',
        endpoint: '/auth/login',
        headers: {
            'Content-Type': 'application/json'
        },
        data: { email, password }
    })
}
