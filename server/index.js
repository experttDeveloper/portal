const express = require('express');
const cors = require('cors');
const db = require('./config/db');
const protectedRoute = require('./routes/protected');
const userRouter = require('./routes/userRoute');
const attendanceRouter = require('./routes/attendance');
const leaveRouter = require('./routes/leave');
const emailRouter = require('./routes/email');

const app = express();
app.use(express.json());
app.use(cors());


// Define API routes
app.use('/', userRouter);
app.use(protectedRoute);
app.use('/', attendanceRouter);
app.use('/', leaveRouter);
app.use('/', emailRouter);



// app listen port
app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
