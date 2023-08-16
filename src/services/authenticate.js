import axios from 'axios'

export async function verifyToken(token) {
    const encodedString = Buffer.from(`Bearer ${token}`).toString('base64')
    const apiURL = process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL + '/login/verify' : 'http://localhost:5000/login/verify'

    const val = await axios.request({
        method: 'POST',
        url: apiURL,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': encodedString
        },
    }).then(res => {
        const isAuthenticated = res.data.isValid
        if (isAuthenticated) {
            return true
        } else {
            return false
        }
    })

    return val
}