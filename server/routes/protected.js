const express = require('express');
const authenticateToken = require('../middleware/authenticateToken');

const router = express.Router();

router.get('/api/protected', authenticateToken, (req, res) => {
    res.send({ message: 'This is a protected route', user: req.user });
});

module.exports = router;
