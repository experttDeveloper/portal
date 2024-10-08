import React from 'react';
import Header from './Header';
import Leave from './component/Leave';
import AttendancePortal from '../../components/AttendancePortal';
import DailyAttendance from '../../components/DailyAttendance';
import MonthlyAttendance from '../../components/MonthlyAttendance';
import ChangePassword from '../../components/ChangePassword';
import Setting from '../../components/Setting';

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
