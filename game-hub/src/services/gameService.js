import { fetchAPI } from "./apiService"

export async function findGameBySlug(slug) {
    return await fetchAPI({
        method: 'GET',
        endpoint: `/games/slug/${slug}`,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export async function findAllGames(page = 0, size = 10) {
    return await fetchAPI({
        method: 'GET',
        endpoint: `/games?page=${page}&size=${size}&sort=createdAt,desc`,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export async function publishGame({ accessToken, name, description, coverImage, file, screenshots }) {
    const formData = new FormData()

    formData.append('name', name)
    formData.append('description', description)
    formData.append('coverImage', coverImage)
    formData.append('file', file)

    for (let i = 0; i < screenshots.length; i++) {
        formData.append('screenshots', screenshots[i]);
    }

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
