import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Container } from '@mui/material';
import { authenticatedUser } from '../service/authentication';
import { getAttendanceData } from '../service/attendance';



export default function DailyAttendance() {
    const [attendanceRecord, setAttendanceRecord] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [loading, setLoading] = React.useState(false);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    React.useEffect(() => {
        (async () => {
            setLoading(true);
            const authenticated = await authenticatedUser();
            const response = await getAttendanceData(authenticated.userId, { limit: 5 })
            if (response.status) {
                const uniqueDates = new Set(response.attendanceList.map(item => item.punch_in_date));

                // Filter data to keep only the first entry for each unique date
                const uniqueData = response.attendanceList.filter(item => {
                    if (uniqueDates.has(item.punch_in_date)) {
                        uniqueDates.delete(item.punch_in_date); // Remove the date once it has been processed
                        return true;
                    }
                    return false;
                });
                setAttendanceRecord(uniqueData);
            }

        })();
    }, [loading])

    return (
        <Container className='attendance_record'>
            <h1 className='content_title'>Daily Attendance Record</h1>
            <Paper sx={{ width: '100%', overflow: 'hidden' }} className='table_attendance'>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table" className='table_record'>
                        <TableHead>
                            <TableRow>
                                <TableCell> Date </TableCell>
                                <TableCell> Day </TableCell>
                                <TableCell> Last punch In </TableCell>
                                <TableCell> Last Punch Out </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {attendanceRecord
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((attendance) => {
                                    // const punchInTimeRecord = attendance.sessions[attendance.sessions.length - 1];
                                    // const punchOutTimeRecord = attendance.sessions[attendance.sessions.length - 1];

                                    return (
                                        <TableRow hover role="checkbox" >
                                            <TableCell >{attendance.punch_in_date}</TableCell>
                                            <TableCell >{attendance.punch_in_day}</TableCell>
                                            <TableCell >{attendance.punch_in_time}</TableCell>
                                            <TableCell >{attendance.punch_out_time}</TableCell>
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={attendanceRecord.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Container>
    );
}
