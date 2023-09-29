import { AppBar, Box, IconButton, Toolbar, Typography, Backdrop } from "@mui/material";
import { Link } from 'react-router-dom';
import SignUpForm from "./SignUp";
import LoginForm from "./Login";

import logo from "../assets/misis.svg";
import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';

const pages = [['Главная', '/'], ['Статьи', '/allArticles'], ['Мои Видео', '/myVideos']];

function ResponsiveAppBar() {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const [buttonType, setButtonType] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = (type: string) => {
        setButtonType(type);
        setOpen(true);
    };

    return (
        <div className="appBarDiv">
            <AppBar position="relative" style={{
                background: 'transparent',
                boxShadow: 'none',

            }} >
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >
                                {pages.map((page) => (
                                    <MenuItem key={page[0]} onClick={handleCloseNavMenu}>
                                        <Typography textAlign="center">{page}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                        {/* end of mobile */}

                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            href="/"
                            sx={{ mr: 2 }}
                        >
                            <img width="239px" height="40px" src={logo} alt="logo" style={{ width: '239px', height: '77px' }} />
                        </IconButton>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end' }}>
                            {
                                pages.map((page) => (
                                    <Link to={page[1]}>
                                        <Button
                                            key={page[0]}
                                            onClick={handleCloseNavMenu}
                                            sx={{
                                                my: 2, color: 'white', display: 'block', fontFamily: 'PT Sans Caption',
                                                fontWeight: 700,
                                            }}
                                        >
                                            {page[0]}
                                        </Button>
                                    </Link>
                                ))
                            }
                            <Backdrop
                                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                                open={open}
                                onClick={handleClose}
                            >
                            </Backdrop>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </div>
    );
}
export default ResponsiveAppBar;