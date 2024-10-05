const API_URL = process.env.REACT_APP_API_URL

export async function registerUser(data) {
    const result = {
        body: null,
        errors: []
    }

    try {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        const res = await response.json()

        if (response.status === 201) {
            result.body = res
        } else {
            result.errors = res.errors || ['An error occurred, but no details were provided']
        }
    } catch (err) {
        result.errors.push('Network error: Unable to reach the server. Please try again later')
    }

    return result
}

export async function loginUser(data) {
    const result = {
        body: null,
        errors: []
    }

    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        const res = await response.json()

        if (response.status === 200) {
            result.body = res
        } else {
            result.errors = res.errors || ['An error occurred, but no details were provided']
        }
    } catch (err) {
        result.errors.push('Network error: Unable to reach the server. Please try again later')
    }

    return result
}
