
import React from 'react';
import Header from './Header';
import DailyAttendance from './component/DailyAttendance'
import AttendancePortal from './component/AttendancePortal';
import MonthlyAttendance from './component/MonthlyAttendance';
import Leave from './component/Leave';

const Content = ({ selectedItem, onLogout }) => {
    const renderContent = () => {
        switch (selectedItem) {
            case 'Home':
                return <AttendancePortal />;
            case 'DailyAttendance':
                return <DailyAttendance />
            case 'MonthlyAttendance':
                return <MonthlyAttendance />
            case 'LeaveList':
                return <Leave />
            default:
                return "test"; // Default content
        }
    };

    return (
        <>
            <Header onLogout={onLogout} />
            <div className='content_rendor '>
                {renderContent()}
            </div>
        </>
    );
};

export default Content;
