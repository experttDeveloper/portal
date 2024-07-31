import React from 'react';
import Header from './Header';
import DailyAttendance from './component/DailyAttendance';
import AttendancePortal from './component/AttendancePortal';
import MonthlyAttendance from './component/MonthlyAttendance';
import Leave from './component/Leave';
import Setting from './component/Setting';
import ChangePassword from './component/ChangePassword';

const Content = ({ selectedItem, onLogout, onMenuItemClick }) => {


    const renderContent = () => {
        switch (selectedItem) {
            case 'Home':
                return <AttendancePortal />;
            case 'DailyAttendance':
                return <DailyAttendance />;
            case 'MonthlyAttendance':
                return <MonthlyAttendance />;
            case 'LeaveList':
                return <Leave />;
            case 'Profile':
                return "Profile";
            case 'ChangePassword':
                return <ChangePassword />;
            case 'Settings':
                return <Setting />;
            default:
                return "test"; // Default content
        }
    };

    return (
        <>
            <Header onLogout={onLogout} onMenuItemClick={onMenuItemClick} />
            <div className='content_rendor'>
                {renderContent()}
            </div>
        </>
    );
};

export default Content;
