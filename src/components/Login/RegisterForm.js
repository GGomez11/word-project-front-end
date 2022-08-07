import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import '../../css/GetStartedModal.css'
import Button from '@material-ui/core/Button';
import { useState } from 'react'

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

    const handleSubmit = (e) => {
        e.preventDefault()

    }

    return (
        <div className="form-container">
            <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit} >
                <TextField id="email" label="Email" fullWidth onChange={(e) => { setEmail(e.target.value) }} />
                <TextField id="password" label="Password" type="password" fullWidth onChange={(e) => { setPassword(e.target.value) }} />
                <TextField id="confirmPassword" label="Confirm Password" type="password" fullWidth onChange={(e) => { setConfirmPassword(e.target.value) }} />
                <Button type='submit' variant="outlined" color="primary">
                    Sign Up
                </Button>
            </form>
        </div>
    )
}
export default RegisterForm