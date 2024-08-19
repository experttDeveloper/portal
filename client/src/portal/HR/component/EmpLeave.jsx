// src/components/Leave.js
import React, { useEffect, useState } from 'react';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, IconButton, Chip } from '@mui/material';

import moment from "moment"
import { authenticatedUser } from '../../../service/authentication';
import { getEmpLeave, leaveApprovedUnApproved } from '../../../service/leave';

const EmpLeave = () => {


    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [type, setType] = useState("")

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    useEffect(() => {
        (async () => {
            try {
                setLoading(true)
                const authenticated = await authenticatedUser();
                if (authenticated) {
                    const response = await getEmpLeave();
                    if (response.status) {
                        setData(response.data)
                        setLoading(false)
                    }
                }
                setLoading(false)
            } catch (error) {
                console.log("error", error)
            }
        })();
    }, [loading])


    const handleApproved = async (leaveId, type) => {
        try {
            const authenticated = await authenticatedUser();
            if (authenticated) {
                setType(type)
                const { userId } = authenticated.user;
                setLoading(true)
                const result = await leaveApprovedUnApproved(leaveId, { status: type, userBy: userId })
                if (result.status) {
                    setLoading(false)
                }
            }
        } catch (error) {
            setLoading(false)
        }
    }


    return (
        <>
            <Container>
                <div className='leave_main'>
                    <h1 className='content_title'> employee Leaves</h1>
                </div>
                <div className='parent_table'>
                    <div className='attendance_record'>
                        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                            <TableContainer sx={{ maxHeight: 440 }}>
                                <Table stickyHeader aria-label="sticky table" className='table_record'>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Applied At</TableCell>
                                            <TableCell>Full Name</TableCell>
                                            <TableCell>Profile</TableCell>
                                            <TableCell>type</TableCell>
                                            <TableCell>reason</TableCell>
                                            <TableCell>from to</TableCell>
                                            <TableCell>to</TableCell>
                                            <TableCell>Status</TableCell>
                                            <TableCell>Action</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {data
                                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .map((ele) => {
                                                const user = ele.user || {}
                                                const endDate = moment(ele.leave_end_at).format('DD-MM-YYYY HH:mm a');
                                                const startDate = moment(ele.leave_start_at).format('DD-MM-YYYY HH:mm a');
                                                const appliedAt = moment(ele.leave_created_at).format('DD-MM-YYYY HH:mm a');
                                                return (
                                                    <TableRow key={ele._id}>
                                                        <TableCell>{appliedAt}</TableCell>
                                                        <TableCell>{user.firstName} {user.lastName}</TableCell>
                                                        <TableCell>{user.profile}</TableCell>
                                                        <TableCell>{ele.leave_type}</TableCell>
                                                        <TableCell>{ele.leave_reason}</TableCell>
                                                        <TableCell>{startDate}</TableCell>
                                                        <TableCell>{endDate}</TableCell>
                                                        <TableCell>
                                                            <Chip className='leave_status' label={ele.status} color={
                                                                ele.status === "approved" ? "success" :
                                                                    ele.status === "pending" ? "warning" :
                                                                        ele.status === "unapproved" ? "error" :
                                                                            "default" // Default color if none of the conditions match
                                                            } />
                                                        </TableCell>
                                                        <TableCell>
                                                            {ele.status === "approved" ? (
                                                                <IconButton onClick={() => handleApproved(ele._id, "unapproved")}>
                                                                    <Chip className='ele_status' label="Unapproved" color='error' />
                                                                </IconButton>
                                                            ) : (
                                                                <IconButton onClick={() => handleApproved(ele._id, "approved")}>
                                                                    <Chip className='leave_status' label="Approved" color='success' />
                                                                </IconButton>
                                                            )}
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            })}
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

        </>
    );
};

export default EmpLeave;
