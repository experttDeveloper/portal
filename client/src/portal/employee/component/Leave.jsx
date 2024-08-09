// src/components/Leave.js
import React, { useEffect, useState } from 'react';
import { Container, TextField, Box, Button, Select, MenuItem, InputLabel, FormControl, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid, FormHelperText, TablePagination, Chip } from '@mui/material';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import moment from "moment"
import { authenticatedUser } from '../../../service/authentication';
import { toast } from 'react-toastify';
import { applyLeave, getLeave } from '../../../service/leave';

const Leave = () => {


  const [loading, setLoading] = useState(false)
  const [showForm, setShowForm] = useState(false);
  const [leaveHistory, setLeaveHistory] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [formData, setFormData] = useState({
    leaveType: '',
    startDate: null,
    endDate: null,
    reason: '',
  });

  const [errors, setErrors] = useState({
    leaveType: '',
    startDate: '',
    endDate: '',
    reason: '',
  });


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
          const response = await getLeave(authenticated.user.userId);
          if (response.status) {
            setLeaveHistory(response.data)
            setLoading(false)
          }
        }

      } catch (error) {
        console.log("error", error)
      }
    })();
  }, [loading])

  const validate = () => {
    let valid = true;
    const newErrors = { leaveType: '', startDate: '', endDate: '', reason: '' };

    if (!formData.leaveType) {
      newErrors.leaveType = 'Leave type is required.';
      valid = false;
    }

    if (!formData.startDate) {
      newErrors.startDate = 'Start date and time are required.';
      valid = false;
    }

    if (!formData.endDate) {
      newErrors.endDate = 'End date and time are required.';
      valid = false;
    } else if (formData.endDate <= formData.startDate) {
      newErrors.endDate = 'End date must be after start date.';
      valid = false;
    }

    if (!formData.reason) {
      newErrors.reason = 'Reason is required.';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleDateChange = (name) => (newValue) => {
    setFormData((prev) => ({ ...prev, [name]: newValue }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const emailData = {
      //   to: "tushar.brandclever@gmail.com",
      //   subject: "test",
      //   text: "test description"
      // }
      // const res =await  sendEmail(emailData)
      // console.log("res", res)
      // return;
      if (!validate()) return;
      const authenticated = await authenticatedUser();

      if (authenticated) {
        const newLeave = {
          id: leaveHistory.length + 1,
          type: formData.leaveType,
          startDate: formData.startDate,
          reason: formData.reason,
          endDate: formData.endDate,
          status: "pending",
          userId: authenticated.user.userId
        };
        const result = await applyLeave(newLeave);
        if (result.status) {
          toast.success("Leave submitted successfully!");
          setLoading(true)
          setFormData({
            leaveType: '',
            startDate: null,
            endDate: null,
            reason: '',
          });
          setErrors({
            leaveType: '',
            startDate: '',
            endDate: '',
            reason: '',
          });

          setShowForm(false);
        }
      } else {
        toast.error("Please login!");
        return
      }
    } catch (error) {
      toast.error("Something went wrong!")
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Container>
        <div className='leave_main'>
          <h1 className='content_title'>Leave Record</h1>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setShowForm((prev) => !prev)}
            style={{ marginBottom: '1rem' }}
            className='apply_leave'
          >
            {showForm ? 'Cancel' : 'Apply for Leave'}
          </Button>

        </div>

        {showForm ? (
          <Box component="form" onSubmit={handleSubmit} sx={{ marginBottom: '2rem' }} className='leave_form'>
            <Grid container spacing={2}>
              <Grid item md={12}>
                <FormControl fullWidth margin="normal" error={!!errors.leaveType}>
                  <InputLabel>Select Type</InputLabel>
                  <Select
                    label="select type"
                    variant="outlined"
                    name="leaveType"
                    value={formData.leaveType}
                    onChange={handleInputChange}
                  >
                    <MenuItem value="Sick">Sick</MenuItem>
                    <MenuItem value="Casual">Casual</MenuItem>
                    <MenuItem value="Short">Short </MenuItem>
                    <MenuItem value="Emergency">Emergency </MenuItem>
                    <MenuItem value="Half">Half </MenuItem>
                  </Select>
                  {errors.leaveType && <FormHelperText>{errors.leaveType}</FormHelperText>}
                </FormControl>
              </Grid>
              <Grid item md={6}>
                <FormControl fullWidth error={!!errors.startDate}>
                  <DateTimePicker
                    label="Start Date and Time"
                    value={formData.startDate}
                    onChange={handleDateChange('startDate')}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        margin="normal"
                        error={!!errors.startDate} // Apply error styling
                        helperText={errors.startDate} // Display error message
                      />
                    )}
                    minDate={new Date()}
                  />
                  {errors.startDate && <FormHelperText>{errors.startDate}</FormHelperText>}
                </FormControl>
              </Grid>
              <Grid item md={6}>
                <FormControl fullWidth error={!!errors.endDate}>
                  <DateTimePicker
                    label="End Date and Time"
                    value={formData.endDate}
                    onChange={handleDateChange('endDate')}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        margin="normal"
                        error={!!errors.endDate} // Apply error styling
                        helperText={errors.endDate} // Display error message
                      />
                    )}
                    minDate={new Date()}
                  />
                  {errors.endDate && <FormHelperText>{errors.endDate}</FormHelperText>}
                </FormControl>
              </Grid>
              <Grid item md={12}>
                <TextField
                  label="Reason"
                  multiline
                  rows={4}
                  fullWidth
                  margin="normal"
                  name="reason"
                  value={formData.reason}
                  onChange={handleInputChange}
                  error={!!errors.reason}
                  helperText={errors.reason}
                />
              </Grid>
            </Grid>
            <Button type="submit" variant="contained" color="primary" className='apply_leave' fullWidth>
              Apply
            </Button>

          </Box>
        ) : (
          <div className='parent_table'>

            <div className='attendance_record'>
              <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                  <Table stickyHeader aria-label="sticky table" className='table_record'>
                    <TableHead>
                      <TableRow>
                        <TableCell>Applied At</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Start Date and Time</TableCell>
                        <TableCell>End Date and Time</TableCell>
                        <TableCell>Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {leaveHistory
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((leave) => {
                          const startDate = moment(leave.startDate).format('DD-MM-YYYY HH:mm a');
                          const endDate = moment(leave.endDate).format('DD-MM-YYYY HH:mm a');
                          const appliedAt = moment(leave.createdAt).format('DD-MM-YYYY HH:mm a');
                          return (
                            <TableRow key={leave._id}>
                              <TableCell>{appliedAt}</TableCell>
                              <TableCell>{leave.type}</TableCell>
                              <TableCell>{startDate}</TableCell>
                              <TableCell>{endDate}</TableCell>
                              <TableCell>
                                <Chip className='leave_status' label={`${leave.status}`} variant="filled" color={`${leave.status === "pending" ? "warning" : "success"}`} />

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
                  count={leaveHistory.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Paper>
            </div>
          </div>
        )}
      </Container>
    </LocalizationProvider>
  );
};

export default Leave;
