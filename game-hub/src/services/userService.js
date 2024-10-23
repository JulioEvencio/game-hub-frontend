import { fetchAPI } from "./apiService"

export async function getLoggedUser({ accessToken }) {
    return await fetchAPI({
        method: 'GET',
        endpoint: '/users/me',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        }
    })
}
