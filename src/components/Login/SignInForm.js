import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import '../../css/GetStartedModal.css'
import Button from '@material-ui/core/Button';
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
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

function SignInForm({setIsLoggedIn}) {
    const classes = useStyles();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [formError, setFormError] = useState({ isAuthenticated: false, message: '' })
    let navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        if(!validateEmail(email)) {
            setFormError({isAuthenticated: false, emailError: true, emailMessage: 'Invalid email'})
        }
        else if(!validatePassword(password)) {
            setFormError({isAuthenticated: false, passwordError: true, passwordMessage: 'Invalid password'})    
        } else {
            axios.request({
                method: 'post',
                url: 'http://localhost:5000/login/login',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                auth: {
                    username: email,
                    password: password
                }
            }).then(res => {
                const isError = !res.data.isAuthenticated
                setFormError({passwordError: isError, emailError: isError, 
                              passwordMessage: 'Try Again', emailMessage: 'Try Again'})
                if (!isError) {
                    // Load token into local memory
                    localStorage.setItem('jwt', res.data.accessToken)
                    setIsLoggedIn(true)
                    navigate('/home')
                }
            })   
        }
    }

    return (
        <div className="form-container">
            <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
                <TextField id="email" label="Email" fullWidth onChange={(e) => { setEmail(e.target.value) }} error={formError.emailError} helperText={formError.emailMessage} required />
                <TextField id="password" label="Password" type="password" fullWidth onChange={(e) => { setPassword(e.target.value) }} error={formError.passwordError} helperText={formError.passwordMessage} required />
                <Button type='submit' variant="outlined" color="primary">
                    Sign In
                </Button>
            </form>
        </div>
    )
}
export default SignInForm