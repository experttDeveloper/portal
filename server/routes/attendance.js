const express = require('express');
const router = express.Router();
const Attendance = require('../model/attendance');
const moment = require('moment');

const calculateTotalTime = (sessions) => {
    let totalHours = 0;
    let totalMinutes = 0;

    sessions.forEach(session => {
        if (session.punchOutTime) {
            const punchInMoment = moment(`${session.punchInDate} ${session.punchInTime}`, 'YYYY-MM-DD h:mm:ss a');
            const punchOutMoment = moment(`${session.punchOutDate} ${session.punchOutTime}`, 'YYYY-MM-DD h:mm:ss a');
            const duration = moment.duration(punchOutMoment.diff(punchInMoment));
            totalHours += duration.hours();
            totalMinutes += duration.minutes();
        }
    });

    // Convert total minutes to hours and minutes
    totalHours += Math.floor(totalMinutes / 60);
    totalMinutes = totalMinutes % 60;

    return `${totalHours}:${totalMinutes}`;
}

// Punch In
router.post('/api/user/attendance/punchin', async (req, res) => {
    try {
        const { userId, role, loginTime, loginDate, loginDay } = req.body;
        let attendance = await Attendance.findOne({ userId, date: loginDate });

        if (attendance) {
            const activeSession = attendance.sessions.find(session => !session.punchOutTime);
            if (activeSession) {
                return res.send({
                    status: false,
                    message: "Already punched in"
                });
            }
        } else {
            attendance = new Attendance({ userId, role, date: loginDate, sessions: [] });
        }

        attendance.sessions.push({
            punchInDate: loginDate,
            punchInDay: loginDay,
            punchInTime: loginTime
        });

        attendance.updatedAt = new Date();
        await attendance.save();

        res.send({
            status: true,
            message: "Punch in successful",
            data: attendance
        });
    } catch (error) {
        console.error("Error punching in:", error);
        res.status(500).send({
            status: false,
            message: "Error punching in"
        });
    }
});

// Punch Out
router.post('/api/user/attendance/punchout', async (req, res) => {
    try {
        const { userId, logoutTime, logoutDate, logoutDay } = req.body;
        const attendance = await Attendance.findOne({ userId, date: logoutDate });

        if (attendance) {
            const session = attendance.sessions.find(session => !session.punchOutTime && moment(`${session.punchInDate} ${session.punchInTime}`).isBefore(moment(`${logoutDate} ${logoutTime}`)));
            if (session) {
                session.punchOutDate = logoutDate;
                session.punchOutDay = logoutDay;
                session.punchOutTime = logoutTime;

                // Calculate the total hours and minutes for the day
                attendance.totalHours = calculateTotalTime(attendance.sessions);

                attendance.updatedAt = new Date();
                await attendance.save();

                res.send({
                    status: true,
                    message: "Punch out successful",
                    data: attendance
                });
            } else {
                res.send({
                    status: false,
                    message: "No active punch in session found"
                });
            }
        } else {
            res.send({
                status: false,
                message: "No punch in record found for today"
            });
        }
    } catch (error) {
        console.error("Error punching out:", error);
        res.status(500).send({
            status: false,
            message: "Error punching out"
        });
    }
});

router.get('/api/user/attendance/punchin/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const attendance = await Attendance.findOne({ userId }).sort({ date: -1 }).limit(1);

        if (attendance) {
            const latestSession = attendance.sessions.find(session => !session.punchOutTime);
            res.send({
                status: true,
                data: latestSession ? latestSession : null,
            });
        } else {
            res.send({
                status: true,
                data: null
            });
        }
    } catch (error) {
        console.error("Error fetching punch-in data:", error);
        res.status(500).send({
            status: false,
            message: "Error fetching punch-in data"
        });
    }
});


router.get('/api/user/attendance/list/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const { limit } = req.query;
        const attendances = await Attendance.find({ userId }).sort({ date: -1 }).limit(limit);;

        if (attendances && attendances.length > 0) {
            const formattedData = attendances.map(attendance => ({
                date: attendance.date,
                day: moment(attendance.date, 'YYYY-MM-DD').format('dddd'),
                totalHours: attendance.totalHours,
                sessions: attendance.sessions
            }));

            res.send({
                status: true,
                data: formattedData
            });
        } else {
            res.send({
                status: true,
                data: []
            });
        }
    } catch (error) {
        console.error("Error fetching attendance list:", error);
        res.status(500).send({
            status: false,
            message: "Error fetching attendance list"
        });
    }
});

module.exports = router;
