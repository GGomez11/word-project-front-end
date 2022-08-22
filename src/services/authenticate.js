import axios from 'axios'

export function verifyToken(token) {
    axios.request({
        method: 'post',
        url: 'http://localhost:5000/login/verify',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    }).then(res => {
        const isAuthenticated = res.data.isValid
        if (isAuthenticated) {
            return true
        } else {
            return false
        }
    })
}