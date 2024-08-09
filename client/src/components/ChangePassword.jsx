import { useState } from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Container } from '@mui/material';
import { toast } from 'react-toastify';
import { authenticatedUser } from '../service/authentication';
import { updatePassword } from '../service/user';

const ChangePassword = () => {
    const [formData, setFormData] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        if (!formData.currentPassword) newErrors.currentPassword = 'Current Password is required';
        if (!formData.newPassword) newErrors.newPassword = 'New Password is required';
        if (formData.newPassword && formData.newPassword.length < 6) newErrors.newPassword = 'New Password must be at least 6 characters';
        if (formData.newPassword === formData.currentPassword) newErrors.newPassword = 'New Password cannot be the same as the current password';
        if (formData.newPassword !== formData.confirmPassword) newErrors.confirmPassword = 'New Password and Confirm Password do not match';
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
            const authenticated = await authenticatedUser();
            if (authenticated) {
                const newFormData = {
                    id: authenticated.userId,
                    current_password: formData.currentPassword,
                    new_password: formData.newPassword,
                }
                const response = await updatePassword(newFormData);
                if (response.status) {
                    toast.success(response.message);
                    setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
                    return // Clear form data
                } else {
                    toast.error(response.message);
                    return
                }
            }
        } catch (error) {
            toast.error('An error occurred');
        }
    };

    return (
        <Container className='change_password_section'>
            <h1 className='content_title'>Change Password</h1>
            <Card>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={5}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    type='password'
                                    variant="outlined"
                                    label='Current Password'
                                    value={formData.currentPassword}
                                    placeholder='Current Password'
                                    onChange={e => handleFormChange('currentPassword', e.target.value)}
                                    error={!!errors.currentPassword}
                                    helperText={errors.currentPassword}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    type='password'
                                    variant="outlined"
                                    label='New Password'
                                    value={formData.newPassword}
                                    placeholder='New Password'
                                    onChange={e => handleFormChange('newPassword', e.target.value)}
                                    error={!!errors.newPassword}
                                    helperText={errors.newPassword}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    type='password'
                                    variant="outlined"
                                    label='Confirm New Password'
                                    value={formData.confirmPassword}
                                    placeholder='Confirm New Password'
                                    onChange={e => handleFormChange('confirmPassword', e.target.value)}
                                    error={!!errors.confirmPassword}
                                    helperText={errors.confirmPassword}
                                />
                            </Grid>
                            <Grid item xs={12} className='flex gap-4 flex-wrap'>
                                <Button variant='contained' type='submit' className='apply_leave'>
                                    Change Password
                                </Button>
                                {/* <Button
                                    variant='contained'
                                    type='button'
                                    className='apply_leave'
                                    sx={{ marginLeft: '20px !important' }}
                                >
                                    cancle
                                </Button> */}
                            </Grid>
                        </Grid>
                    </form>
                </CardContent>
            </Card>
        </Container>
    );
};

export default ChangePassword;
