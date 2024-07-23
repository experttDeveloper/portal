const express = require('express');
const cors = require('cors');
const db = require('./config/db');
const protectedRoute = require('./routes/protected');
const userRouter = require('./routes/userRoute');

const app = express();
app.use(express.json());
app.use(cors());


// Define API routes
app.use('/', userRouter);
app.use(protectedRoute);



// app listen port
app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
