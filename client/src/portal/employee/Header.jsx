import React from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Tooltip, Container, Avatar, MenuItem, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LanguageIcon from '@mui/icons-material/Language';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import NotificationsIcon from '@mui/icons-material/Notifications';
import StarBorderIcon from '@mui/icons-material/StarBorder';


export default function Header({ onLogout }) {
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogout = () => {
        try {
            localStorage.removeItem("token");
        } catch (error) {

        }
    }

    return (
        <AppBar className="heder_none" position="static">
            <Container className="top_header" maxWidth="xl">
                <Toolbar disableGutters>
                    <div className="search">
                        <div className="search-icon">
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{ root: 'input-root', input: 'input-input' }}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </div>

                    <Box sx={{ flexGrow: 1 }} />

                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton color="inherit">
                            <LanguageIcon />
                        </IconButton>
                        <IconButton color="inherit">
                            <Brightness4Icon />
                        </IconButton>
                        <IconButton color="inherit">
                            <StarBorderIcon />
                        </IconButton>
                        <IconButton color="inherit">
                            <NotificationsIcon />
                        </IconButton>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="John Doe" src="/static/images/avatar/2.jpg" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >

                            <MenuItem>My Profile</MenuItem>
                            <MenuItem>Setting</MenuItem>
                            <MenuItem onClick={onLogout}>Log Out</MenuItem>

                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}
