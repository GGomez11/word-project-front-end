import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import '../../css/GetStartedModal.css'
import Button from '@material-ui/core/Button';
import { useState } from 'react'
import axios from 'axios'

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
            setFormError(formError => ({ ...formError, isError: true, message: 'Password don\'t match' }))
            return false
        } else {
            return true
        }
    }

    const handleSubmit = (e) => {
        if (passwordsMatch(password, confirmPassword)) {
            axios.request({
                method: 'post',
                url: 'http://localhost:5000/login/register',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                auth: {
                    username: email,
                    password: password
                }
            })
            setFormError(formError => ({ ...formError, isError: false, message: '' }))
        }

        console.log(formError)
        e.preventDefault()
    }

    return (
        <div className="form-container">
            <form className={classes.root} autoComplete="off" onSubmit={handleSubmit} >
                <TextField id="email" label="Email" fullWidth onChange={(e) => { setEmail(e.target.value) }} required />
                <TextField id="password" label="Password" type="password" error={formError.isError} fullWidth onChange={(e) => { setPassword(e.target.value) }} required helperText={formError.message} />
                <TextField id="confirmPassword" label="Confirm Password" type="password" error={formError.isError} fullWidth onChange={(e) => { setConfirmPassword(e.target.value) }} required />
                <Button type='submit' variant="outlined" color="primary">
                    Sign Up
                </Button>
            </form>
        </div>
    )
}
export default RegisterForm