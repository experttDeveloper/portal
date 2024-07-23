const jwt = require('jsonwebtoken');
const SECRET_KEY = "brandclever_secret"; // Replace with your secret key

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).send({ message: 'No token provided' });
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).send({ message: 'Invalid token' });
        }
        req.user = user;
        next();
    });
};

module.exports = authenticateToken;
