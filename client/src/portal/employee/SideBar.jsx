import React, { useState } from 'react';
import { Box, List, ListItem, ListItemIcon, ListItemText, Collapse, Divider, IconButton } from '@mui/material';
import { Event, AttachMoney, CalendarToday, Folder, ArrowForward, ArrowBack, ExpandMore, Home } from '@mui/icons-material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import AdjustIcon from '@mui/icons-material/Adjust';


const Sidebar = ({ onSelect, collapsed, toggleCollapse, selectedMenu }) => {

    const [openAttendance, setOpenAttendance] = useState(false);
    const [openPayroll, setOpenPayroll] = useState(false);
    const [openLeaves, setOpenLeaves] = useState(false);

    const handleClickAttendance = () => setOpenAttendance(!openAttendance);
    const handleClickPayroll = () => setOpenPayroll(!openPayroll);
    const handleClickLeaves = () => setOpenLeaves(!openLeaves);

    return (
        <Box className="hover sidebarcomponent"
            sx={{
                width: collapsed ? '100px' : '300px',
                transition: 'width 0.3s',
                backgroundColor: 'background.paper',
                height: '100vh',
                position: 'relative',
            }}
        >
            <div className='sidebar_hide_show'>
                <div className='image_text'>
                    <IconButton
                        onClick={toggleCollapse}
                        sx={{
                            position: 'absolute',
                            top: 16,
                            right: collapsed ? 0 : 20,
                        }}
                        className='back_next_arrow'
                    >
                        {collapsed ? <ArrowForward /> : <ArrowBack />}
                    </IconButton>
                    {
                        !collapsed ? (
                            <>
                                <img src='images/imagelogo.png' className='menubar_image' />
                                <p>Brandclever</p>
                            </>
                        ) : (
                            <img src='images/imagelogo.png' className='menubar_image' />
                        )
                    }
                </div>
            </div>
            <List cl sx={{ marginTop: '50px' }}>
                <ListItem button onClick={() => onSelect('Home')}
                    className={selectedMenu === "Home" ? "active_sidebar_menu" : "inactive_sidebar"}
                >
                    <ListItemIcon>
                        <Home />
                    </ListItemIcon>
                    {!collapsed && <ListItemText primary="Dashboard" />}
                </ListItem>
                <ListItem button onClick={() => { handleClickAttendance(); }}
                >
                    <ListItemIcon>
                        <Event />
                    </ListItemIcon>
                    {!collapsed && <ListItemText primary="Attendance" />}
                    {openAttendance ? <ExpandMore /> : <NavigateNextIcon />}
                </ListItem>
                <Collapse in={openAttendance} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem button sx={{ pl: 4 }} onClick={() => onSelect('DailyAttendance')} className={selectedMenu === "DailyAttendance" ? "active_sidebar_menu" : "inactive_sidebar"}>
                            <ListItemIcon>
                                <AdjustIcon />
                            </ListItemIcon>
                            {!collapsed && <ListItemText primary="Daily Attendance" />}
                        </ListItem>
                        <ListItem button sx={{ pl: 4 }} onClick={() => onSelect('MonthlyAttendance')}
                            className={selectedMenu === "MonthlyAttendance" ? "active_sidebar_menu" : "inactive_sidebar"}
                        >
                            <ListItemIcon>
                                <AdjustIcon />
                            </ListItemIcon>
                            {!collapsed && <ListItemText primary="Monthly Attendance" />}
                        </ListItem>
                    </List>
                </Collapse>
                <Divider />

                <ListItem button onClick={() => { handleClickLeaves(); }}>
                    <ListItemIcon>
                        <CalendarToday />
                    </ListItemIcon>
                    {!collapsed && <ListItemText primary="Leaves" />}
                    {openLeaves ? <ExpandMore /> : <NavigateNextIcon />}
                </ListItem>
                <Collapse in={openLeaves} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem button sx={{ pl: 4 }} onClick={() => onSelect('LeaveList')}
                            className={selectedMenu === "LeaveList" ? "active_sidebar_menu" : "inactive_sidebar"}
                        >
                            <ListItemIcon>
                                <AdjustIcon />
                            </ListItemIcon>
                            {!collapsed && <ListItemText primary="Leave Record" />}
                        </ListItem>
                        {/* <ListItem button sx={{ pl: 4 }} onClick={() => onSelect('LeaveBalances')}
                            className={selectedMenu === "LeaveBalances" ? "active_sidebar_menu" : "inactive_sidebar"}
                        >
                            <ListItemIcon>
                                <AdjustIcon />
                            </ListItemIcon>
                            {!collapsed && <ListItemText primary="Leave Balances" />}
                        </ListItem> */}
                    </List>
                </Collapse>
                <ListItem button onClick={() => { handleClickPayroll(); }}>
                    <ListItemIcon>
                        <AttachMoney />
                    </ListItemIcon>
                    {!collapsed && <ListItemText primary="Payroll" />}
                    {openPayroll ? <ExpandMore /> : <NavigateNextIcon />}
                </ListItem>
                <Collapse in={openPayroll} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem button sx={{ pl: 4 }} onClick={() => onSelect('SalarySlips')}
                            className={selectedMenu === "SalarySlips" ? "active_sidebar_menu" : "inactive_sidebar"}
                        >
                            <ListItemIcon>
                                <AdjustIcon />
                            </ListItemIcon>
                            {!collapsed && <ListItemText primary="Salary Slips" />}
                        </ListItem>
                        <ListItem button sx={{ pl: 4 }} onClick={() => onSelect('PayrollReports')}
                            className={selectedMenu === "PayrollReports" ? "active_sidebar_menu" : "inactive_sidebar"}
                        >
                            <ListItemIcon>
                                <AdjustIcon />
                            </ListItemIcon>
                            {!collapsed && <ListItemText primary="Payroll Reports" />}
                        </ListItem>
                    </List>
                </Collapse>
                <Divider />
            </List>
        </Box>
    );
};

export default Sidebar;
