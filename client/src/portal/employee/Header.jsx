import React, { useEffect, useState } from 'react';
import { AppBar, Box, Toolbar, IconButton, Menu, Tooltip, Container, Avatar, MenuItem, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LanguageIcon from '@mui/icons-material/Language';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import NotificationsIcon from '@mui/icons-material/Notifications';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { authenticatedUser } from '../../service/authentication';
import { getUser } from '../../service/user';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import KeyIcon from '@mui/icons-material/Key';

const Header = ({ onLogout, onMenuItemClick }) => {
    const [user, setUser] = useState({});
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleMenuItemSelect = (item) => {
        onMenuItemClick(item);
        handleCloseUserMenu();
    };

    useEffect(() => {
        (async () => {
            const authenticated = await authenticatedUser();
            if (authenticated.status) {
                const response = await getUser(authenticated.user.userId);
                if (response.status) {
                    setUser(response.data);
                }
            }
        })();
    }, []);

    const firstLetter = user && user.email ? user.email.charAt(0) : '';

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
                        <Tooltip title={user.email}>
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt={firstLetter} className='avtar_design'>
                                    {firstLetter}
                                </Avatar>
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                            PaperProps={{
                                className: "pornhub_brandclever"
                            }}
                        >
                            <div className='main_section_account'>
                                <div className='first_sec'>
                                    <div className='avtar'>
                                        <Avatar alt={firstLetter} className='avtar_design' >
                                            {firstLetter}
                                        </Avatar>
                                    </div>
                                    <div className='name_email'>
                                        <p className='name'>{user.name ? user.name : "John sinha"}</p>
                                        <p className='email'>{user.email && user.email}</p>
                                    </div>
                                </div>
                                <MenuItem className='menu_item' onClick={() => handleMenuItemSelect('Home')}><PersonOutlineIcon /> Go to Dashboard</MenuItem>
                                <MenuItem className='menu_item' onClick={() => handleMenuItemSelect('ChangePassword')}><KeyIcon /> Change password</MenuItem>
                                <MenuItem className='menu_item' onClick={() => handleMenuItemSelect('Settings')}><SettingsIcon /> Setting</MenuItem>
                                <MenuItem className='logout' onClick={onLogout}>Logout <LogoutIcon /></MenuItem>
                            </div>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Header;
