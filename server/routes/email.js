const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const cors = require('cors');

router.use(cors());
router.use(express.json());

// Create a route to handle sending emails
router.post('/api/send-email', async (req, res) => {
    const { to, subject, text } = req.body;

    // Create a transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail', // or another SMTP service
        auth: {
            user: 'brandclever.deepak2@gmail.com',
            pass: 'deepak@19121998',
        },
    });

    const mailOptions = {
        from: 'your-email@gmail.com',
        to,
        subject,
        text,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send('Email sent successfully');
    } catch (error) {
        res.status(500).send('Error sending email');
    }
});

module.exports = router;
