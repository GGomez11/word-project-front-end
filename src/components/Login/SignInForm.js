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

function SignInForm() {
    const classes = useStyles();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [formError, setFormError] = useState({ isAuthenticated: false, message: '' })

    const handleSubmit = (e) => {
        axios.request({
            method: 'post',
            url: 'http://localhost:5000/login/authenticate',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            auth: {
                username: email,
                password: password
            }
        }).then(res => {
            setFormError(formError => ({ ...formError, isAuthenticated: !res.data.isAuthenticated, message: res.data.message }))
        })
        e.preventDefault()
    }

    return (
        <div className="form-container">
            <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit} >
                <TextField id="email" label="Email" fullWidth onChange={(e) => { setEmail(e.target.value) }} required />
                <TextField id="password" label="Password" type="password" error={formError.isAuthenticated} fullWidth onChange={(e) => { setPassword(e.target.value) }} required helperText={formError.message} />
                <Button type='submit' variant="outlined" color="primary">
                    Sign In
                </Button>
            </form>
        </div>
    )
}
export default SignInForm