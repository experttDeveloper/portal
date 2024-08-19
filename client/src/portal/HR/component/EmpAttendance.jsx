import React, { useEffect, useState } from 'react';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, IconButton, Chip, Collapse, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import moment from "moment";
import { getEmpAttendance } from '../../../service/attendance';
import { authenticatedUser } from '../../../service/authentication';

export default function EmpAttendance() {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [expandedRow, setExpandedRow] = useState(null);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleRowClick = (rowId) => {
        setExpandedRow(expandedRow === rowId ? null : rowId);
    };

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const authenticated = await authenticatedUser();
                if (authenticated) {
                    const response = await getEmpAttendance();
                    if (response.status) {
                        const uniqueDates = new Set(response.data.map(item => item.punch_in_date));
                        
                        // Filter data to keep only the first entry for each unique date
                        const uniqueData = response.data.filter(item => {
                            if (uniqueDates.has(item.punch_in_date)) {
                                uniqueDates.delete(item.punch_in_date); // Remove the date once it has been processed
                                return true;
                            }
                            return false;
                        });
                        console.log("response",uniqueData)
                        setData(uniqueData);
                    }
                }
                setLoading(false);
            } catch (error) {
                console.log("error", error);
                setLoading(false);
            }
        })();
    }, []);

    return (
        <Container>
            <div className='leave_main'>
                <h1 className='content_title'>Employee Attendance</h1>
            </div>
            <div className='parent_table'>
                <div className='attendance_record'>
                    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                        <TableContainer sx={{ maxHeight: 440 }}>
                            <Table stickyHeader aria-label="sticky table" className='table_record'>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Attendance</TableCell>
                                        <TableCell>Full Name</TableCell>
                                        <TableCell>Profile</TableCell>
                                        <TableCell>Email</TableCell>
                                        <TableCell>phone number</TableCell>
                                        <TableCell>role</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data.length > 0 ? (
                                        data
                                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .map((ele) => {
                                                // const user = ele.userDetails || {};
                                                const rowId = ele.id;
                                                // const session = ele.sessions[ele.sessions.length - 1];
                                                return (
                                                    <React.Fragment key={rowId}>
                                                        <TableRow>
                                                            <TableCell>
                                                                <IconButton onClick={() => handleRowClick(rowId)}>
                                                                    {expandedRow === rowId ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                                                </IconButton>
                                                            </TableCell>
                                                            <TableCell>{ele.firstName} {ele.lastName}</TableCell>
                                                            <TableCell>{ele.profile}</TableCell>
                                                            <TableCell>{ele.email}</TableCell>
                                                            <TableCell>{ele.phoneNumber}</TableCell>
                                                            <TableCell>{ele.role}</TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell colSpan={9}>
                                                                <Collapse in={expandedRow === rowId} timeout="auto" unmountOnExit>
                                                                    <Table>
                                                                        <TableHead>
                                                                            <TableCell>Login time</TableCell>
                                                                            <TableCell>Login day</TableCell>
                                                                            <TableCell>Login date</TableCell>
                                                                            <TableCell>logout time</TableCell>
                                                                            <TableCell>logout day</TableCell>
                                                                            <TableCell>logout date</TableCell>
                                                                            <TableCell>Total Hours</TableCell>
                                                                        </TableHead>
                                                                        <TableBody>
                                                                            <TableCell>{ele.punch_in_time}</TableCell>
                                                                            <TableCell>{ele.punch_in_day}</TableCell>
                                                                            <TableCell>{ele.punch_in_date}</TableCell>
                                                                            <TableCell>{ele.punch_out_time}</TableCell>
                                                                            <TableCell>{ele.punch_out_day}</TableCell>
                                                                            <TableCell>{ele.punch_out_date}</TableCell>
                                                                            <TableCell>{ele.totalHours}</TableCell>

                                                                        </TableBody>
                                                                    </Table>
                                                                </Collapse>
                                                            </TableCell>
                                                        </TableRow>
                                                    </React.Fragment>
                                                );
                                            })
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={9}>No data found.</TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 100]}
                            component="div"
                            count={data.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Paper>
                </div>
            </div>
        </Container>
    );
}
