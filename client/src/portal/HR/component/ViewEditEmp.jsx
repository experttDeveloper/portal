// src/components/ViewEditEmp.js
import React, { useState, useEffect } from 'react';
import { Typography, Paper, Grid, TextField, Button, MenuItem, Container, FormControl } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const ViewEditEmp = ({ employee, onClose, onSave, viewMode }) => {
    const [formData, setFormData] = useState({});
    const [isEditing, setIsEditing] = useState(viewMode === 'edit');

    useEffect(() => {
        console.log('Employee:', employee);
        if (employee) {
            setFormData({
                firstName: employee.firstName || '',
                lastName: employee.lastName || '',
                email: employee.email || '',
                password: '', // Default empty, as you might want to handle password separately
                phoneNumber: employee.phoneNumber || '',
                currentAddress: employee.currentAddress || '',
                permanentAddress: employee.permanentAddress || '',
                profile: employee.profile || '',
                joiningDate: employee.joiningDate ? new Date(employee.joiningDate) : null,
                role: employee.role || '',
                gender: employee.gender || '',
                dob: employee.dob ? new Date(employee.dob) : null,
            });
        }
    }, [employee]);

    useEffect(() => {
        console.log('ViewMode:', viewMode);
        setIsEditing(viewMode === 'edit');
    }, [viewMode]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleDateChange = (field) => (date) => {
        setFormData({ ...formData, [field]: date });
    };

    const handleSave = () => {
        const dataToSave = {
            ...formData,
            id: employee.id // Make sure `id` is included
        };
        onSave(dataToSave);
    }
    

    if (!employee) return null;

    return (
        <Container>
            <div className='leave_main'>
                <Typography variant="h4" className='content_title'>
                    {isEditing ? 'Edit Employee' : 'Employee Details'}
                </Typography>
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
                            <FormControl fullWidth margin="normal">
                                <DatePicker
                                    label="Joining Date"
                                    value={formData.joiningDate}
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
                            <FormControl fullWidth margin="normal">
                                <DatePicker
                                    label="Date of Birth"
                                    value={formData.dob}
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
