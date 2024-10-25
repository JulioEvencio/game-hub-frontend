import { fetchAPI } from "./apiService"

export async function createNewComment({ accessToken, gameSlug, content }) {
    const result = await fetchAPI({
        method: 'POST',
        endpoint: `/api/comments/game/${gameSlug}`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
        data: { content }
    })

    return result
}
