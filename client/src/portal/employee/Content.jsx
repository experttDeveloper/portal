
import React from 'react';
import Header from './Header';
import Attandance from './Attendance'
import Home from './Home';

const Content = ({ selectedItem, onLogout }) => {
    const renderContent = () => {
        switch (selectedItem) {
            case 'Home':
                return <Home />;
            case 'DailyAttendance':
                return <Attandance />
            default:
                return "test"; // Default content
        }
    };

    return (
        <>
            <Header onLogout={onLogout} />
            <div style={{ padding: 16 }}>
                {renderContent()}
            </div>
        </>
    );
};

export default Content;
