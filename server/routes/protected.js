const express = require('express');
const authenticateToken = require('../middleware/authenticateToken');

const router = express.Router();

router.get('/api/protected', authenticateToken, (req, res) => {
    res.send({ message: 'authenticated', status: true, user: req.user });
});

module.exports = router;
