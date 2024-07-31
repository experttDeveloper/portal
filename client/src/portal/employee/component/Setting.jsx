import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Container } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { authenticatedUser } from '../../../service/authentication';
import { getUser, updateUser } from '../../../service/user';
import { toast } from 'react-toastify';

const Setting = () => {
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});

    useEffect(() => {
        (async () => {
            const authenticated = await authenticatedUser();
            if (authenticated.status) {
                const response = await getUser(authenticated.user.userId);
                if (response.status) {
                    const userData = response.data;
                    setFormData({
                        ...userData,
                        dob: userData.dob ? new Date(userData.dob) : null
                    });
                }
            }
        })();
    }, []);

    const validate = () => {
        const newErrors = {};
        if (!formData.firstName) newErrors.firstName = 'First Name is required';
        if (!formData.lastName) newErrors.lastName = 'Last Name is required';
        if (!formData.gender) newErrors.gender = 'Gender is required';
        if (!formData.email) newErrors.email = 'Email is required';
        if (formData.phoneNumber && !/^[0-9]{10}$/.test(formData.phoneNumber)) newErrors.phoneNumber = 'Phone Number must be exactly 10 digits';
        if (!formData.dob) newErrors.dob = 'Date of Birth is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleFormChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
        // Clear error for the specific field
        setErrors(prevErrors => ({ ...prevErrors, [field]: '' }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        try {
            const response = await updateUser(formData._id, formData);
            if (response.status) {
                toast.success(response.message);
            } else {
                toast.error('Something went wrong');
            }
        } catch (error) {
            toast.error('An error occurred');
        }
    };

    return (
        <Container className='setting_main_section'>
            <h1 className='content_title'>Profile Setting</h1>
            <Card>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={5}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    label='First Name'
                                    value={formData.firstName || ""}
                                    placeholder='First Name'
                                    onChange={e => handleFormChange('firstName', e.target.value)}
                                    error={!!errors.firstName}
                                    helperText={errors.firstName}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label='Last Name'
                                    value={formData.lastName || ""}
                                    placeholder='Last Name'
                                    onChange={e => handleFormChange('lastName', e.target.value)}
                                    error={!!errors.lastName}
                                    helperText={errors.lastName}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth error={!!errors.gender}>
                                    <InputLabel>Gender</InputLabel>
                                    <Select
                                        label='Gender'
                                        value={formData.gender || ''}
                                        onChange={e => handleFormChange('gender', e.target.value)}
                                    >
                                        <MenuItem value='male'>Male</MenuItem>
                                        <MenuItem value='female'>Female</MenuItem>
                                        <MenuItem value='other'>Other</MenuItem>
                                    </Select>
                                    {errors.gender && <div className="error-message">{errors.gender}</div>}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label='Email'
                                    value={formData.email || ""}
                                    placeholder='Email'
                                    disabled
                                    onChange={e => handleFormChange('email', e.target.value)}
                                    error={!!errors.email}
                                    helperText={errors.email}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label='Profile'
                                    value={formData.profile || ""}
                                    placeholder='Profile'
                                    onChange={e => handleFormChange('profile', e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label='Phone Number'
                                    value={formData.phoneNumber || ""}
                                    placeholder='Phone Number'
                                    onChange={e => handleFormChange('phoneNumber', e.target.value)}
                                    error={!!errors.phoneNumber}
                                    helperText={errors.phoneNumber}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label='Address'
                                    value={formData.address || ""}
                                    placeholder='Address'
                                    onChange={e => handleFormChange('address', e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth error={!!errors.dob}>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DatePicker
                                            label="Date of Birth"
                                            value={formData.dob || null}
                                            maxDate={new Date()}
                                            onChange={(date) => handleFormChange('dob', date)}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </LocalizationProvider>
                                    {errors.dob && <div className="error-message">{errors.dob}</div>}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} className='flex gap-4 flex-wrap'>
                                <Button variant='contained' type='submit' className='apply_leave'>
                                    Save Changes
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </CardContent>
            </Card>
        </Container>
    );
};

export default Setting;
