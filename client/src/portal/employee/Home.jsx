import React, { useEffect, useState } from 'react';
import moment from 'moment'
import { authenticatedUser } from '../../service/authentication';
import { Button, Container } from '@mui/material';
import Countdown from 'react-countdown';
import axios from 'axios';
import { attendancePunchin, attendancePunchout } from '../../service/attendance';

export default function Home() {

    const [formData, setFormData] = useState({
        punchIn: {
            date: null,
            day: null,
            time: null,
        },
        punchOut: {
            date: null,
            day: null,
            time: null,
        },
        totalTime: {
            hours: null,
            minutes: null,
        },
    });


    const [countdownTime, setCountdownTime] = useState(null); // Timer countdown duration in milliseconds

    const handlePunchIn = async () => {

        const authenticated = await authenticatedUser();

        const currentTime = moment();
        const newFormData = {
            ...formData,
            punchIn: {
                date: currentTime.format('YYYY-MM-DD'),
                day: currentTime.format('dddd'),
                time: currentTime.format('h:mm:ss a'),
            },
            punchOut: {
                date: null,
                day: null,
                time: null,
            },
            totalTime: {
                hours: null,
                minutes: null,
            },
        };
        setFormData({
            ...formData,
            punchIn: {
                date: newFormData.punchIn.date,
                day: newFormData.punchIn.day,
                time: newFormData.punchIn.time,
            }
        });

        try {
            const response = await attendancePunchin({
                role: authenticated.user.role,
                userId: authenticated.user.userId,
                loginTime: newFormData.punchIn.time,
                loginDay: newFormData.punchIn.day,
                loginDate: newFormData.punchIn.date,
            });
            console.log("respose", response)

        } catch (error) {
            console.error('Error punching in:', error);

        }
    };

    // Function to handle punch-out
    const handlePunchOut = async () => {
        const currentTime = moment();
        if (formData.punchIn.time) {
            const punchInTime = moment(formData.punchIn.date + ' ' + formData.punchIn.time, 'YYYY-MM-DD h:mm:ss a');
            const timeDifference = currentTime.diff(punchInTime);
            const duration = moment.duration(timeDifference);
            const hours = Math.floor(duration.asHours());
            const minutes = duration.minutes();

            const newFormData = {
                ...formData,
                punchOut: {
                    date: currentTime.format('YYYY-MM-DD'),
                    day: currentTime.format('dddd'),
                    time: currentTime.format('h:mm:ss a'),
                },
                totalTime: {
                    hours,
                    minutes,
                },
            };
            setFormData({
                ...formData,
                punchOut: {
                    date: newFormData.punchOut.date,
                    day: newFormData.punchOut.day,
                    time: newFormData.punchOut.time,
                },
                totalTime: {
                    hours,
                    minutes,
                },
            });

            const authenticated = await authenticatedUser();
            try {
                const response = await attendancePunchout({
                    userId: authenticated.user.userId,
                    logoutTime: newFormData.punchOut.time,
                    logoutDay: newFormData.punchOut.day,
                    logoutDate: newFormData.punchOut.date,
                });
                console.log("respondeeepunchout", response)
            } catch (error) {
                console.error('Error punching out:', error);

            }
        }
    };

    // Function to start the countdown
    const startCountdown = () => {
        const endTime = moment().add(1, 'hour'); // Set duration (e.g., 1 hour) for the countdown
        setCountdownTime(endTime.diff(moment())); // Calculate duration from now to end time
    };

    return (
        <div>
            <Container>
                <h1>Attendance System</h1>
                <Button onClick={handlePunchIn} variant="contained">Punch In</Button>
                <Button onClick={handlePunchOut} variant="contained">Punch Out</Button>

                {formData.punchIn.time && (
                    <div>
                        <p>Punch In Date: {formData.punchIn.date}</p>
                        <p>Punch In Day: {formData.punchIn.day}</p>
                        <p>Punch In Time: {formData.punchIn.time}</p>
                    </div>
                )}
                {formData.punchOut.time && (
                    <div>
                        <p>Punch Out Date: {formData.punchOut.date}</p>
                        <p>Punch Out Day: {formData.punchOut.day}</p>
                        <p>Punch Out Time: {formData.punchOut.time}</p>
                    </div>
                )}
                {formData.totalTime.hours !== null && (
                    <p>Total Time: {formData.totalTime.hours} hours and {formData.totalTime.minutes} minutes</p>
                )}
                {/* {countdownTime !== null && (
                    <div>
                        <Countdown
                            date={moment().add(countdownTime, 'milliseconds').toDate()}
                            renderer={({ hours, minutes, seconds, completed }) => (
                                <div>
                                    {completed ? (
                                        <span>Timer Ended</span>
                                    ) : (
                                        <span>
                                            {String(hours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}:
                                            {String(seconds).padStart(2, '0')}
                                        </span>
                                    )}
                                </div>
                            )}
                        />
                    </div>
                )} */}
            </Container>
        </div>
    )
}
