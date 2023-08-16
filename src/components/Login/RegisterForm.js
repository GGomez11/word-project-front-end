import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import '../../css/GetStartedModal.css'
import Button from '@material-ui/core/Button';
import { useState } from 'react'
import axios from 'axios'
import { validateEmail, validatePassword } from '../../services/validateInput'

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '50ch',
            marginTop: '35px',
        },
    },
}));

function RegisterForm() {
    const classes = useStyles();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [formError, setFormError] = useState({ isError: false, message: '' })

    const passwordsMatch = () => {
        if (password !== confirmPassword) {
            setFormError(formError => ({passwordError: true, passwordMessage: 'Password don\'t match' }))
            return false
        } else {
            return true
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(!validateEmail(email)) {
            setFormError({ isAuthenticated: false, emailError: true, emailMessage: 'Invalid email'})
        }
        else if(!validatePassword(password)) {
            setFormError({ isAuthenticated: false, passwordError: true, passwordMessage: 'Invalid password'})
        } else {
            if (passwordsMatch(password, confirmPassword)) {
                const apiURL = process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL + '/login/register' : 'http://localhost:5000/login/register'
                axios.request({
                    method: 'post',
                    url: apiURL,
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    auth: {
                        username: email,
                        password: password
                    }
                }).then(res => {
                    let didCreate = !res.data.createdUser
                    setFormError(formError => ({passwordError: didCreate, passwordMessage: res.data.message,
                                                emailError: didCreate, emailMessage: res.data.message }))
                })
            }
        }
    }

    return (
        <div className="form-container">
            <form className={classes.root} autoComplete="off" onSubmit={handleSubmit} >
                <TextField id="email" label="Email" fullWidth onChange={(e) => { setEmail(e.target.value) }} error={formError.emailError} helperText={formError.emailMessage} required />
                <TextField id="password" label="Password" type="password" fullWidth error={formError.passwordError} onChange={(e) => { setPassword(e.target.value) }} required  />
                <TextField id="confirmPassword" label="Confirm Password" type="password" fullWidth error={formError.passwordError} onChange={(e) => { setConfirmPassword(e.target.value) }} helperText={formError.passwordMessage} required />
                <Button type='submit' variant="outlined" color="primary">
                    Sign Up
                </Button>
            </form>
        </div>
    )
}
export default RegisterForm