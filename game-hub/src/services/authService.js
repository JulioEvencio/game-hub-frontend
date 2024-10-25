import { fetchAPI } from "./apiService"

export async function registerUser({ username, email, password }) {
    const result = await fetchAPI({
        method: 'POST',
        endpoint: '/api/auth/register',
        headers: {
            'Content-Type': 'application/json'
        },
        data: { username, email, password }
    })

    return result
}

export async function loginUser({ email, password }) {
    return fetchAPI({
        method: 'POST',
        endpoint: '/api/auth/login',
        headers: {
            'Content-Type': 'application/json'
        },
        data: { email, password }
    })
}

export async function passwordUpdate(accessToken, newPassword) {
    return await fetchAPI({
        method: 'PATCH',
        endpoint: '/api/auth/password',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
        data: { newPassword }
    })
}
