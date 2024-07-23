import { AppBar, CssBaseline, Toolbar, Typography } from '@mui/material';
import React from 'react';
import Header from './Header';
// import Attendance from './Attendance';
// import Payroll from './Payroll';
// import Leaves from './Leaves';
// import DailyAttendance from './DailyAttendance'; // New components
// import MonthlyAttendance from './MonthlyAttendance'; // New components
// import SalarySlips from './SalarySlips'; // New components
// import PayrollReports from './PayrollReports'; // New components
// import LeaveRequests from './LeaveRequests'; // New components
// import LeaveBalances from './LeaveBalances'; // New components

const Content = ({ selectedItem }) => {
    const renderContent = () => {
        switch (selectedItem) {
            case 'DailyAttendance':
                return "daily attandance";
            // case 'Payroll':
            //     return <Payroll />;
            // case 'Leaves':
            //     return <Leaves />;
            // case 'DailyAttendance':
            //     return <DailyAttendance />;
            // case 'MonthlyAttendance':
            //     return <MonthlyAttendance />;
            // case 'SalarySlips':
            //     return <SalarySlips />;
            // case 'PayrollReports':
            //     return <PayrollReports />;
            // case 'LeaveRequests':
            //     return <LeaveRequests />;
            // case 'LeaveBalances':
            //     return <LeaveBalances />;
            default:
                return "test"; // Default content
        }
    };

    return (
        <>
            <Header />
            <div style={{ padding: 16 }}>
                {renderContent()}
            </div>
        </>
    );
};

export default Content;
