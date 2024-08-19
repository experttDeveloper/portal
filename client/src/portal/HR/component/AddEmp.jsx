import React, { useState } from 'react'
import { authenticatedUser } from '../../../service/authentication';
import { TextField, Box, Button, Select, MenuItem, InputLabel, FormControl, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid, FormHelperText, TablePagination, Chip } from '@mui/material';
import { toast } from 'react-toastify';
import { DatePicker, DateTimePicker } from '@mui/x-date-pickers';
import { addEmployee } from '../../../service/user';

export default function AddEmp({ useOpen, useLoading }) {

    const [loading, setLoading] = useLoading()
    const [showForm, setShowForm] = useOpen();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phoneNumber: '',
        currentAddress: '',
        permanentAddress: '',
        profile: '',
        joiningDate: null,
        role: '',        // New field
        gender: '',      // New field
        dob: null        // New field
    });


    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phoneNumber: '',
        currentAddress: '',
        permanentAddress: '',
        profile: '',
        joiningDate: '',
        role: '',        // New field
        gender: '',      // New field
        dob: null        // New field
    });


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


    const validate = () => {
        let valid = true;
        const newErrors = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            phoneNumber: '',
            currentAddress: '',
            permanentAddress: '',
            profile: '',
            joiningDate: '',
            role: '',        // New field
            gender: '',      // New field
            dob: null        // New field
        };

        if (!formData.firstName) {
            newErrors.firstName = 'First name is required.';
            valid = false;
        }

        // Validate Last Name
        if (!formData.lastName) {
            newErrors.lastName = 'Last name is required.';
            valid = false;
        }

        // Validate Email
        if (!formData.email) {
            newErrors.email = 'Email is required.';
            valid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email address is invalid.';
            valid = false;
        }

        // Validate Password
        if (!formData.password) {
            newErrors.password = 'Password is required.';
            valid = false;
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters long.';
            valid = false;
        }

        // Validate Phone Number
        if (!formData.phoneNumber) {
            newErrors.phoneNumber = 'Phone number is required.';
            valid = false;
        } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
            newErrors.phoneNumber = 'Phone number must be 10 digits long.';
            valid = false;
        }

        // Validate Current Address
        if (!formData.currentAddress) {
            newErrors.currentAddress = 'Current address is required.';
            valid = false;
        }

        // Validate Permanent Address
        if (!formData.permanentAddress) {
            newErrors.permanentAddress = 'Permanent address is required.';
            valid = false;
        }

        // Validate Profile
        if (!formData.profile) {
            newErrors.profile = 'Profile is required.';
            valid = false;
        }

        // Validate Joining Date
        if (!formData.joiningDate) {
            newErrors.joiningDate = 'Joining date is required.';
            valid = false;
        }

        // Validate Role
        if (!formData.role) {
            newErrors.role = 'Role is required.';
            valid = false;
        }

        // Validate Gender
        if (!formData.gender) {
            newErrors.gender = 'Gender is required.';
            valid = false;
        }

        // Validate Date of Birth
        if (!formData.dob) {
            newErrors.dob = 'Date of Birth is required.';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleResetForm = () => {
        setFormData({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            phoneNumber: '',
            currentAddress: '',
            permanentAddress: '',
            profile: '',
            joiningDate: '',
            role: '',        // New field
            gender: '',      // New field
            dob: null
        })
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!validate()) return

            const authenticated = await authenticatedUser();

            if (authenticated) {
                const newEmp = {
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    password: formData.password,
                    phoneNumber: formData.phoneNumber,
                    profile: formData.profile,
                    role: formData.role,
                    gender: formData.gender,
                    dob: formData.dob,
                    joiningDate: formData.joiningDate,
                    currentAddress: formData.currentAddress,
                    username: formData.email,
                    permanentAddress: formData.permanentAddress,
                };
                setLoading(true);
                const result = await addEmployee(newEmp);
                if (result.status==="success") {
                    toast.success(result.message);
                    handleResetForm();
                    setShowForm(false)
                    setLoading(false);
                } else {
                    toast.error(result.message);
                    setLoading(false);
                }

            } else {
                toast.error("Please login!");
                setLoading(false);
                return
            }
        } catch (error) {
            toast.error("Something went wrong!");;
            setLoading(false);
        }
    };

    return (
        <div>
            <Paper style={{ padding: '1rem', marginTop: '1rem' }}>
                <Box component="form" onSubmit={handleSubmit} sx={{ marginBottom: '2rem' }} className='add_team_member_form'>
                    <Grid container spacing={2}>
                        <Grid item md={6}>
                            <TextField
                                label="First Name"
                                fullWidth
                                margin="normal"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                error={!!errors.firstName}
                                helperText={errors.firstName}
                            />
                        </Grid>
                        <Grid item md={6}>
                            <TextField
                                label="Last Name"
                                fullWidth
                                margin="normal"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                error={!!errors.lastName}
                                helperText={errors.lastName}
                            />
                        </Grid>
                        <Grid item md={6}>
                            <TextField
                                label="Email"
                                type="email"
                                fullWidth
                                margin="normal"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                error={!!errors.email}
                                helperText={errors.email}
                            />
                        </Grid>
                        <Grid item md={6}>
                            <TextField
                                label="Password"
                                type="password"
                                fullWidth
                                margin="normal"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                error={!!errors.password}
                                helperText={errors.password}
                            />
                        </Grid>
                        <Grid item md={6}>
                            <TextField
                                label="Phone Number"
                                fullWidth
                                margin="normal"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleInputChange}
                                error={!!errors.phoneNumber}
                                helperText={errors.phoneNumber}
                            />
                        </Grid>
                        <Grid item md={6}>
                            <TextField
                                label="Current Address"
                                fullWidth
                                margin="normal"
                                name="currentAddress"
                                value={formData.currentAddress}
                                onChange={handleInputChange}
                                error={!!errors.currentAddress}
                                helperText={errors.currentAddress}
                            />
                        </Grid>
                        <Grid item md={6}>
                            <TextField
                                label="Permanent Address"
                                fullWidth
                                margin="normal"
                                name="permanentAddress"
                                value={formData.permanentAddress}
                                onChange={handleInputChange}
                                error={!!errors.permanentAddress}
                                helperText={errors.permanentAddress}
                            />
                        </Grid>
                        <Grid item md={6}>
                            <TextField
                                label="Profile"
                                fullWidth
                                margin="normal"
                                name="profile"
                                value={formData.profile}
                                onChange={handleInputChange}
                                error={!!errors.profile}
                                helperText={errors.profile}
                            />
                        </Grid>
                        <Grid item md={6}>
                            <FormControl fullWidth margin="normal" >
                                <DatePicker
                                    label="Joining Date"
                                    value={formData.joiningDate}
                                    onChange={handleDateChange('joiningDate')}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            margin="normal"
                                            error={!!errors.joiningDate}
                                            helperText={errors.joiningDate}
                                        />
                                    )}
                                    minDate={new Date()}
                                />
                                {errors.joiningDate && <FormHelperText>{errors.joiningDate}</FormHelperText>}
                            </FormControl>
                        </Grid>
                        <Grid item md={6}>
                            <FormControl fullWidth margin="normal" error={!!errors.role}>
                                <InputLabel>Role</InputLabel>
                                <Select
                                    label="Role"
                                    name="role"
                                    value={formData.role}
                                    onChange={handleInputChange}
                                >
                                    <MenuItem value="emp">Employee</MenuItem>
                                    <MenuItem value="HR">HR</MenuItem>
                                    <MenuItem value="manager">Manager</MenuItem>
                                    {/* Add more roles if needed */}
                                </Select>
                                {errors.role && <FormHelperText>{errors.role}</FormHelperText>}
                            </FormControl>
                        </Grid>

                        <Grid item md={6}>
                            <FormControl fullWidth margin="normal">
                                <InputLabel>Gender</InputLabel>
                                <Select
                                    label="Gender"
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleInputChange}
                                >
                                    <MenuItem value="Male">Male</MenuItem>
                                    <MenuItem value="Female">Female</MenuItem>
                                    <MenuItem value="Other">Other</MenuItem>
                                    {/* Add more gender options if needed */}
                                </Select>
                                {errors.gender && <FormHelperText>{errors.gender}</FormHelperText>}
                            </FormControl>
                        </Grid>

                        <Grid item md={6}>
                            <FormControl fullWidth margin="normal" >
                                <DatePicker
                                    label="Date of Birth"
                                    value={formData.dob}
                                    onChange={handleDateChange('dob')}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            margin="normal"
                                            error={!!errors.dob}
                                            helperText={errors.dob}
                                        />
                                    )}
                                    maxDate={new Date()}
                                />
                                {errors.dob && <FormHelperText>{errors.dob}</FormHelperText>}
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Button type="submit" variant="contained" color="primary" className='apply_leave' fullWidth disabled={loading}>
                        Add Team Member
                    </Button>
                </Box>
            </Paper>
        </div>
    )
}
