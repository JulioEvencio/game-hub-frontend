import { fetchAPI } from "./apiService"

export async function findAllGames() {
    return await fetchAPI({
        method: 'GET',
        endpoint: '/games',
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export async function publishGame({ accessToken, name, picture, file }) {
    const formData = new FormData()

    formData.append('name', name)
    formData.append('picture', picture)
    formData.append('file', file)

    const result = await fetchAPI({
        method: 'POST',
        endpoint: '/games',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        },
        data: formData
    }, true)

    return result
}
