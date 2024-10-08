import React, { useState } from 'react';
import { CssBaseline, Grid } from '@mui/material';
import Sidebar from './SideBar';
import Content from './Content';

const EmployeePortal = ({ onLogout }) => {
    const [selectedItem, setSelectedItem] = useState('Home');
    const [collapsed, setCollapsed] = useState(false);

    const toggleCollapse = () => {
        setCollapsed(!collapsed);
    };

    const handleMenuItemClick = (item) => {
        setSelectedItem(item);
    };

    return (
        <div className='sidebar_content'>
            <Sidebar onSelect={setSelectedItem} collapsed={collapsed} toggleCollapse={toggleCollapse} selectedMenu={selectedItem} />
            <main style={{
                flexGrow: 1,
                marginLeft: collapsed ? 80 : 0,
                transition: 'margin 0.3s'
            }}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Content selectedItem={selectedItem} onLogout={onLogout} onMenuItemClick={handleMenuItemClick} />
                    </Grid>
                </Grid>
            </main>
        </div>
    );
};

export default EmployeePortal;
