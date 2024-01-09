import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SideBar from './SideBar';
import Logo from "../images/logo.svg"
import Icon from '@mui/material/Icon';
import { useNavigate } from 'react-router-dom';
export default function TopBar() {
    let [open, setOpen] = useState(false)
    let navigate = useNavigate()
    return (
        <AppBar position="static" sx={{ zIndex: 1000, bgcolor: "primary.dark" }}>
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                    onClick={() => setOpen(true)}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Play With Python
                </Typography>
                <IconButton
                    size="large"
                    edge="end"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                    onClick={() => navigate("/")}
                >
                    <Icon sx={{ textAlign: "center" }} fontSize="large">
                        <img src={Logo} style={{ display: 'flex', height: 'inherit', width: 'inherit' }} />
                    </Icon>
                </IconButton>
            </Toolbar>
            <SideBar open={open} toggle={() => setOpen(false)} />
        </AppBar>
    );
}