// routes/products.js
const express = require('express');
const router = express.Router();
const User = require('../model/user');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'brandclever_secret';


// Genearate verification code

function generateVerificationCode() {
    return Math.random().toString(36).substring(2, 8).toUpperCase(); // Example code generation
}

// Define routes related to products
router.get('/api/users', async (req, res) => {
    const users = await User.find();
    res.json(users);
});


router.get('/api/user/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        // Find the item by ID
        const userData = await User.findById(userId);
        if (userData) {
            return res.send(
                {
                    status: true,
                    data: userData
                }
            );
        } else {
            return res.send(
                {
                    status: false,
                    error: 'userData not found'
                }
            );
        }
    } catch (error) {
        console.log("error", error);
    }
});

router.post('/api/user/register', async (req, res) => {
    try {
        const formData = req.body;
        const userModal = await User.findOne({ email: formData.email });
        if (userModal) {
            return res.send({
                status: false,
                message: "User already Register"
            })
        } else {
            const users = new User({
                firstname: formData.firstName,
                lastname: formData.lastName,
                email: formData.email,
                password: formData.password,
                createdAt: new Date(),
                updatedAt: new Date()
            });
            await users.save();
            res.send({
                status: true,
                data: users
            })
            res.json(users);
        }
    } catch (error) {
        console.log("error", error)
    }
});


router.post('/api/user/login', async (req, res) => {
    try {
        const formData = req.body;
        const userModal = await User.findOne({ email: formData.email });
        if (!userModal) {
            return res.send({ message: 'Invalid credential!' });
        } else {
            if (userModal.password !== formData.password) {
                return res.send(
                    {
                        status: false,
                        message: 'Wrong Password'
                    }
                );
            } else {
                const token = jwt.sign({ userId: userModal._id, role: userModal.role }, SECRET_KEY, { expiresIn: '2h' });
                return res.status(200).send({
                    status: true,
                    token,
                    data: userModal
                })
            }
        }
    } catch (error) {
        console.log(error)
    }
});


router.put('/api/user/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const updatedData = req.body; // Extract updated data from the request body
        // Find and update the user by ID
        const updatedUser = await User.findByIdAndUpdate(userId,
            {
                ...updatedData,
                updatedAt: new Date(),
                createdAt: new Date()
            }, {
            new: true, // Return the updated document
            runValidators: true // Run schema validators

        });

        if (updatedUser) {
            res.send({
                status: true,
                data: updatedUser,
                message: "Updated Successfully"
            }); // Respond with the updated user data
        } else {
            res.send({ status: false, error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
});


router.delete('/api/user/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        if (userId) {
            await User.deleteOne({ _id: userId });
            return {
                status: true,
            }
        }
    } catch (error) {
        console.log(error)
    }
});


router.put('/api/user/update/password/:id', async (req, res) => {
    try {
        // Find the user by ID
        const userId = req.params.id;
        console.log("userId", userId)
        // Find the item by ID
        const { newPassword, currentPassword } = req.body;
        console.log("req.body", req.body)
        const user = await User.findById(userId);
        console.log("user", user)
        // if (!user) {
        //     return { status: false, message: 'User not found' };
        // }

        // Check if the current password matches (plain text comparison)
        if (user.password !== currentPassword) {
            return res.send({ status: false, message: 'Current password is incorrect' });
        }

        const result = await User.findByIdAndUpdate(userId,
            {
                password: newPassword,
                updatedAt: new Date(),
                createdAt: new Date()
            }, {
            new: true, // Return the updated document
            runValidators: true // Run schema validators

        });
        if (result) {
            return res.send({ status: true, message: 'Password updated successfully' });
        } else {
            return res.send({ status: false, message: 'Something went wrong' });
        }
    } catch (error) {
        console.error('Error updating password:', error);
        return { status: false, message: 'Failed to update password' };
    }

});


module.exports = router;
