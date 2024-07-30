const express = require('express');
const Leave = require('../model/leave');
const router = express.Router();

router.post('/api/user/leave/apply', async (req, res) => {
    try {
        const formData = req.body;
        if (formData) {
            const result = new Leave({
                userId: formData.userId,
                type: formData.type,
                reason: formData.reason,
                startDate: formData.startDate,
                endDate: formData.endDate,
                status: formData.status,
                createdAt: new Date(),
                updatedAt: new Date()
            });
            await result.save();
            res.send({
                status: true,
                data: result
            })
            res.json(result);
        }
    } catch (error) {
        console.log("error", error)
    }
});


router.get('/api/user/leave/:userId', async (req, res) => {
    try {
        const { userId } = req.params; // Extract userId from request parameters
        const leaves = await Leave.find({ userId }).sort({ createdAt: -1 }); // Find and sort leaves by userId in descending order

        if (leaves.length > 0) {
            res.send({
                status: true,
                data: leaves
            });
        } else {
            res.send({
                status: false,
                message: 'No leave records found '
            });
        }
    } catch (error) {
        console.log("error", error);
        res.status(500).send({
            status: false,
            message: 'An error occurred while fetching leave records'
        });
    }
});

module.exports = router;
