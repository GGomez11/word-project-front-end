import axios from 'axios'

export async function verifyToken(token) {
    const encodedString = Buffer.from(`Bearer ${token}`).toString('base64')
    const val = await axios.request({
        method: 'post',
        url: 'http://localhost:5000/login/verify',
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