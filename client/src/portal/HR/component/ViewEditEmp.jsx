// src/components/ViewEditEmp.js
import React, { useState, useEffect } from 'react';
import { Typography, Paper, Grid, TextField, Button, MenuItem, Container, FormControl } from '@mui/material';
import moment from 'moment';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const ViewEditEmp = ({ employee, onClose, onSave, viewMode }) => {
    const [formData, setFormData] = useState({});
    const [isEditing, setIsEditing] = useState(viewMode === 'edit');

    useEffect(() => {
        if (employee) {
            setFormData({
                firstName: employee.firstName || '',
                lastName: employee.lastName || '',
                email: employee.email || '',
                password: employee.password || '', // Default empty, as you might want to handle password separately
                phoneNumber: employee.phoneNumber || '',
                currentAddress: employee.address?.currentAddress || '', // Safely access nested property
                permanentAddress: employee.address?.permanentAddress || '', 
                profile: employee.profile || '',
                joiningDate: employee.joiningDate ? moment(employee.joiningDate).format('YYYY-MM-DD') : '',
                role: employee.role || '',
                gender: employee.gender || '',
                dob: employee.dob ? moment(employee.dob).format('YYYY-MM-DD') : '',
            });
        }
    }, [employee]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleDateChange = (field) => (date) => {
        setFormData({ ...formData, [field]: date ? moment(date).format('YYYY-MM-DD') : '' });
    };
    const handleSave = () => {
        if (onSave) {
            onSave(formData);
        }
    };



    if (!employee) return null;


    return (
        <Container>
            <div className='leave_main'>
                <h1 className='content_title'>{isEditing ? 'Edit Employee' : 'Employee Details'}</h1>
                <Button
                    variant="contained"
                    onClick={onClose}
                    style={{ marginLeft: '1rem' }}
                    className='apply_leave'
                >
                    Close
                </Button>
            </div>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Paper style={{ padding: '1rem', marginTop: '1rem' }}>
                {/* <Typography variant="h6" gutterBottom>{viewMode === 'edit' ? 'Edit Employee' : 'Employee Details'}</Typography> */}
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="First Name"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            fullWidth
                            disabled={!isEditing}

                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Last Name"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            fullWidth
                            disabled={!isEditing}

                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            fullWidth
                            disabled={!isEditing}

                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            fullWidth
                            disabled={!isEditing}

                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Phone Number"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            fullWidth
                            disabled={!isEditing}

                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Current Address"
                            name="currentAddress"
                            value={formData.currentAddress}
                            onChange={handleChange}
                            fullWidth
                            disabled={!isEditing}

                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Permanent Address"
                            name="permanentAddress"
                            value={formData.permanentAddress}
                            onChange={handleChange}
                            fullWidth
                            disabled={!isEditing}

                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Profile"
                            name="profile"
                            value={formData.profile}
                            onChange={handleChange}
                            fullWidth
                            disabled={!isEditing}

                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth margin="normal" >
                            <DatePicker
                                label="Joining Date"
                                value={formData.joiningDate ? new Date(formData.joiningDate) : null}
                                onChange={handleDateChange('joiningDate')}
                                disabled={!isEditing}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        margin="normal"
                                        fullWidth
                                        disabled={!isEditing}
                                    />
                                )}
                                minDate={new Date()}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth margin="normal" >
                            <DatePicker
                                label="Date of Birth"
                                value={formData.dob ? new Date(formData.dob) : null}
                                onChange={handleDateChange('dob')}
                                disabled={!isEditing}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        margin="normal"
                                        fullWidth
                                        disabled={!isEditing}
                                    />
                                )}
                                maxDate={new Date()}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Gender"
                            name="gender"
                            select
                            value={formData.gender}
                            onChange={handleChange}
                            fullWidth
                            disabled={!isEditing}

                        >
                            <MenuItem value="Male">Male</MenuItem>
                            <MenuItem value="Female">Female</MenuItem>
                            <MenuItem value="Other">Other</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Date of Birth"
                            name="dob"
                            type="date"
                            value={formData.dob}
                            onChange={handleChange}
                            fullWidth
                            disabled={!isEditing}

                        />
                    </Grid>
                </Grid>
                <div style={{ marginTop: '1rem' }}>
                    {isEditing ? (
                        <>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleSave}
                                style={{ marginRight: '1rem' }}
                                className='apply_leave'
                            >
                                Save
                            </Button>
                            <Button
                                variant="contained"
                                onClick={() => setIsEditing(false)}
                                className='apply_leave'
                            >
                                Cancel
                            </Button>
                        </>
                    ) : (
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => setIsEditing(true)}
                            className='apply_leave'
                        >
                            Edit
                        </Button>
                    )}

                </div>
            </Paper>
            </LocalizationProvider>
        </Container>
    );
};

export default ViewEditEmp;
