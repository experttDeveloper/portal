import React from 'react';
import Header from './Header';
import AttendancePortal from '../../components/AttendancePortal';
import DailyAttendance from '../../components/DailyAttendance';
import MonthlyAttendance from '../../components/MonthlyAttendance';
import ChangePassword from '../../components/ChangePassword';
import Setting from '../../components/Setting';
import EmployeeList from './component/EmpList';
import EmpLeave from './component/EmpLeave';
import EmpAttendance from './component/EmpAttendance';

const Content = ({ selectedItem, onLogout, onMenuItemClick }) => {


    const renderContent = () => {
        switch (selectedItem) {
            case 'Home':
                return <AttendancePortal />;
            case 'DailyAttendance':
                return <DailyAttendance />;
            case 'MonthlyAttendance':
                return <MonthlyAttendance />;
            case 'ChangePassword':
                return <ChangePassword />;
            case 'Settings':
                return <Setting />;
            case 'employee':
                return <EmployeeList />;
            case 'empleave':
                return <EmpLeave />;
            case 'empattendance':
                return <EmpAttendance/>;

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
