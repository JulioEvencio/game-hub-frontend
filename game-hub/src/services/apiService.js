const API_URL = process.env.REACT_APP_API_URL

export async function fetchAPI({ method, endpoint, headers, data }, multipartFile = false) {
    const result = {
        body: null,
        errors: []
    };

    try {
        const options = {
            method: method,
            headers: headers
        }

        if (method !== 'GET' && data) {
            options.body = multipartFile ? data : JSON.stringify(data)
        }

        const response = await fetch(API_URL + endpoint, options)
        const res = await response.json()

        if (response.ok) {
            result.body = res
        } else {
            result.errors = res.errors || ['An error occurred, but no details were provided']
        }
    } catch (err) {
        result.errors.push('Network error: Unable to reach the server. Please try again later')
    }

    return result
}
