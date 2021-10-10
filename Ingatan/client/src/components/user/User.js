import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { GoogleLogin } from 'react-google-login';
import { Button, Paper, Typography, Container, Avatar, Grid } from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';

// importing actions
import { login, register } from '../../actions/users';
// importing actionTypes
import { LOGIN, REGISTER } from '../../constans/actionTypes';
// importing image
import Icon from './Icon';
// importing styles
import useStyles from './styles';
// importing components
import Input from './Input';

const User = () => {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    // const { message, status, isLoading } = useSelector((state) => state?.users)

    const [formData, setformData] = useState({ username: '', email: '', password: '', confirmPassword: '' });
    const [isSignup, setisSignup] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    // melakukan submit data pada state
    const handleSubmit = (event) => {
        event.preventDefault();
        if (isSignup) {
            if (formData.password !== formData.confirmPassword) {
                return console.log('Password Must Be Equals To Confirm Password');
            };
            dispatch(register({ username: formData.username, email: formData.email, password: formData.password }, history));
        } else {
            dispatch(login({ email: formData.email, password: formData.password }, history));
        };
    };

    // menampung data yang diinput kedalam state
    const handleChange = (event) => {
        setformData({ ...formData, [event.target.name]: event.target.value });
    };

    // melakukan toggle untuk menampilkan atau menyembunyikan password
    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    // fungsi apabila sukses melakukan login dengan akun google
    const googleSuccess = async (response) => {
        const value = response?.profileObj;
        const token = response?.tokenId;

        if (isSignup) {
            try {
                dispatch({ type: REGISTER, payload: { value, token } });
                history.push('/');
            } catch (error) {
                console.log(error);
            };
        } else {
            try {
                dispatch({ type: LOGIN, payload: { value, token } });
                history.push('/');
            } catch (error) {
                console.log(error);
            };
        };
    };

    // fungsi apabila gagal melakukan login dengan akun google
    const googleError = async (response) => {
        console.log('Google Login Was Unsuccessfull. Try Again Later..');
    };

    // fungsi untuk switch form login dan form register
    const switchMode = () => {
        setformData({ username: '', email: '', password: '', confirmPassword: '' });
        setisSignup((prevSignUp) => !prevSignUp);
        setShowPassword(false);
    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={6}>
                <Avatar className={classes.avatar}>
                    <LockOutlined />
                </Avatar>
                <Typography component="h1" variant="h5">{isSignup ? 'Register' : 'Login'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {isSignup && (
                            <>
                                <Input name="username" label="Username" value={formData?.username} handleChange={handleChange} autoFocus />
                            </>
                        )}
                        <Input name="email" label="Email Address" value={formData?.email} handleChange={handleChange} type="email" />
                        <Input name="password" label="Password" value={formData?.password} handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                        {isSignup && <Input name="confirmPassword" value={formData?.confirmPassword} label="Repeat Password" handleChange={handleChange} type="password" />}
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" size='small' color="secondary" className={classes.submit}>
                        {isSignup ? 'Register' : 'Login'}
                    </Button>
                    <GoogleLogin
                        clientId={process.env.REACT_APP_GOOGLE_LOGIN_API_KEY}
                        render={(renderProps) => (
                            <Button className={classes.googleButton} color="primary" size='small' fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                                Login With Google
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleError}
                        cookiePolicy="single_host_origin"
                    />
                    <Button onClick={switchMode} variant='outlined' size='small' fullWidth>
                        {isSignup ? 'Already have an account? Login' : "Don't have an account? Register"}
                    </Button>
                </form>
            </Paper>
        </Container>
    )
};

export default User;