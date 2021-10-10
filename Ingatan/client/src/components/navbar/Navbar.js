import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { AppBar, Toolbar, Typography, Button, Avatar } from '@material-ui/core'
import { AccountCircle } from '@material-ui/icons'
import { Link, useHistory, useLocation } from 'react-router-dom'
import jwtDecode from 'jwt-decode'

// importing actionTypes
import { LOGOUT } from '../../constans/actionTypes'
// importing styles
import useStyles from './styles'
// importing image
import camera from '../../images/camera.jpg'
import memoriesText from '../../images/memoriesText.png'

const Navbar = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const history = useHistory()
    const location = useLocation()

    // state yang menampung data user yang diambil dari localStorage
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))

    // fungsi untuk user melakukan logout
    const logout = () => {
        dispatch({ type: LOGOUT })

        setUser(null)
        history.push('/')
    }

    useEffect(() => {
        const token = user?.token

        if(token) {
            const decodedToken = jwtDecode(token)

            if(decodedToken.exp * 1000 < new Date().getTime()) {
                logout()
            }
        }
        setUser(JSON.parse(localStorage.getItem('profile')))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location])

    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <Link to="/" className={classes.brandContainer}>
                <img src={memoriesText} alt="icon" height="40px" />
                <img className={classes.image} src={camera} alt="icon" height="35px" />
            </Link>
            <Toolbar className={classes.toolbar}>
                {user?.data ? (
                    <div className={classes.profile}>
                        {
                            user?.data?.imageUrl ? (
                                <Avatar alt={user?.data?.name} src={user?.data?.imageUrl} />
                            ) : (
                                <AccountCircle />
                            )
                        }
                        <Typography className={classes.userName} variant="body1">{user?.data?.name || user?.data?.username}</Typography>
                        <Button variant="outlined" className={classes.logout} size='small' onClick={logout} color="secondary">Logout</Button>
                    </div> ) : (
                        <Button component={Link} to="/user" variant="contained" size='small' color="primary">Login</Button>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default Navbar