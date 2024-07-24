const express = require('express');
const router = express.Router();
const Attandance = require('../model/attandance');



router.post('/api/user/attandance', async (req, res) => {
    try {
        const formData = req.body;

        const result = new Attandance({
            role: formData.role,
            userId: formData.userId,
            loginTime: formData.loginTime,
            loginDay: formData.loginDay,
            loginDate: formData.loginDate,
            logoutTime: formData.logoutTime,
            logoutDay: formData.logoutDay,
            logoutDate: formData.logoutDate,
            totalTime: formData.totalTime,
            updatedAt: new Date(),
            createdAt: new Date()
        });
        if (result) {
            await result.save();
            res.send({
                status: true,
                data: result,
                message: "success"
            })
            res.json(result);
        } else {
            res.send({
                status: false,
                data: "",
                message: "Something went wrong"
            })
        }
    } catch (error) {
        console.log("error", error)
    }
});

module.exports = router;