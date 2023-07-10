import React, { useEffect, useState } from 'react'
import Styles from '../styles/Login.css'
import { Box, FormControl, Grid, InputLabel, OutlinedInput, Paper, Typography, Checkbox, Button } from '@mui/material';
import SignInImage from '../assets/login.png'
import { Link, useNavigate } from 'react-router-dom';
import { getUserInfo, loginUser } from '../api/userAuthApi';
import { useDispatch } from 'react-redux';
import { loggedinUserdata, loginSuccess } from '../redux/slice/userAuthSlice';
import toast from 'react-hot-toast'
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

function Item(props) {
    const { sx, ...other } = props;
    return (
        <Box
            sx={{
                p: 0,
                m: 1,
                width: 450,
                textAlign: "center",
                ...sx,
            }}
            {...other}
        />
    );
}

const Login = () => {
    const [emailid, setEmailid] = useState("");
    const [password, setPassword] = useState("");

    const [authToken, setAuthToken] = useState('')
    const [userInfo, setUserInfo] = useState([])

    const [errorFlag, setErrorFlag] = useState(false);
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const emailRegex =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    const handleSignin = async (e) => {
        e.preventDefault()
        setErrorFlag(true);

        const data = await loginUser(emailid, password)
        console.log('Data', data.data)
        setAuthToken(data.data.authtoken)
        localStorage.setItem('token', data.data.authtoken)
        dispatch(loginSuccess(data))
        setUserInfo(data.data.user)
        if (data.data.user.role === 'admin') {
            navigate('/dashboard-admin')
            toast.success('Logged in successfully')
        }
        else if (data.data.user.role === 'user') {
            navigate('/dashboard')
            toast.success('Logged in successfully')
        }
    }

    return (
        <>
            <div className="container-area">
                <Grid
                    item
                    xs={12}
                    sm={6}
                    md={6}
                    component={Paper}
                    square
                    className="container-info"
                    sx={{
                        justify: "space-between",
                        alignItems: "100%",
                        overflowY: "auto",
                    }}
                >
                    <div className="brand-and-toggler d-flex align-items-center justify-content-between" style={{ marginTop: '5%' }}>
                        <a className="navbar-brand d-flex align-items-center" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
                            <span className="brand-shape d-inline-block">&nbsp;</span>
                            <span className="brand-text fw-7" style={{ marginLeft: "10%", fontFamily: 'Halant', fontSize: '24px', fontWeight: 600, color: '#00AFB9' }}>Task Management System</span>
                        </a>

                    </div>
                    <div
                        style={{
                            alignItems: "center",
                            justifyContent: "center",
                            textAlign: "center",
                        }}
                    >
                        <div
                            style={{
                                alignItems: "center",
                                justifyContent: "center",
                                textAlign: "center",
                            }}
                        >

                            <Box
                                component="form"
                                noValidate
                                sx={{
                                    marginTop: "6%",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                }}
                            >
                                <Item sx={{ marginTop: "7%" }}>
                                    <Typography
                                        component="h1"
                                        className="heading"
                                        fontWeight={700}
                                        fontSize={34}
                                        fontFamily={"Nunito Sans"}
                                    >
                                        Sign In
                                    </Typography>
                                </Item>

                                <Item>
                                    <FormControl variant="outlined" sx={{ width: "100%" }}>
                                        <InputLabel
                                            sx={{ color: "#9CA3AF" }}
                                            required
                                            htmlFor="outlined-adornment-email"
                                        >
                                            Email
                                        </InputLabel>

                                        <OutlinedInput
                                            id="email"
                                            name="email"
                                            autoComplete="off"
                                            sx={Styles.text}
                                            value={emailid}
                                            onChange={(e) => setEmailid(e.target.value)}
                                            label="Email"
                                            type="email"
                                        />
                                    </FormControl>
                                    {!emailid.trim() && errorFlag && (
                                        <Typography sx={{
                                            color: "red",
                                            fontFamily: "Roboto",
                                            textAlign: "left",
                                            fontSize: "12px",
                                            marginTop: "2px"
                                        }}>
                                            Email required
                                        </Typography>
                                    )}
                                    {!emailRegex.test(emailid.trim()) &&
                                        errorFlag &&
                                        emailid.trim() && (
                                            <Typography sx={{
                                                color: "red",
                                                fontFamily: "Roboto",
                                                textAlign: "left",
                                                fontSize: "12px",
                                                marginTop: "2px"
                                            }}>
                                                Invalid Email
                                            </Typography>
                                        )}


                                </Item>

                                <Item>

                                    <FormControl
                                        variant="outlined"
                                        sx={{ width: "100%", marginTop: "6%" }}
                                    >
                                        <InputLabel
                                            sx={{
                                                color: "#9CA3AF",
                                                fontWeight: 500,
                                                fontSize: "18px",
                                            }}
                                            htmlFor="outlined-adornment-password"
                                        >
                                            Password
                                        </InputLabel>
                                        <OutlinedInput

                                            sx={{
                                                fontFamily: "Poppins",
                                                fontWeight: 500,
                                                fontSize: "18px",
                                            }}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            id="outlined-adornment-password"
                                            type={showPassword ? "text" : "password"}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                        edge="end"
                                                    >
                                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            label="Password"
                                        />
                                    </FormControl>
                                    {!password.trim() && errorFlag && (
                                        <Typography sx={{
                                            color: "red",
                                            fontFamily: "Roboto",
                                            textAlign: "left",
                                            fontSize: "12px",
                                            marginTop: "2px"
                                        }}>
                                            Password required
                                        </Typography>
                                    )}

                                </Item>

                                <Item sx={{ marginTop: "2%" }}>

                                    <Button
                                        onClick={handleSignin}
                                        type="submit"
                                        sx={{ borderRadius: 3, marginTop: 3, backgroundColor: '#00AFB9', boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;', width: '150px' }}
                                        variant="contained">
                                        Sign In
                                    </Button>
                                </Item>


                            </Box>

                        </div>
                    </div>
                </Grid >

                <Grid
                    className="container-main"
                    item
                    xs={false}
                    sm={6}
                    md={6}
                    sx={{
                        backgroundColor: "#E5E5E5",
                        height: '100vh',
                        overflow: 'hidden',

                    }}
                >
                    <img
                        src={SignInImage}
                        alt="SignUpImage"

                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "contain",
                        }}
                    />

                </Grid>
            </div >

        </>
    )
}

export default Login

