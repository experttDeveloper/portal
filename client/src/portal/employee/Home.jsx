import React, { useEffect, useState } from 'react';
import moment from 'moment'
import { authenticatedUser } from '../../service/authentication';
import { Button, Container } from '@mui/material';
import Countdown from 'react-countdown';

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

    // Function to handle punch-in
    const handlePunchIn = () => {
        const currentTime = moment();
        setFormData({
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
        });
        setCountdownTime(null); // Reset countdown time
        startCountdown(); // Start the countdown
    };

    // Function to handle punch-out
    const handlePunchOut = () => {
        const currentTime = moment();
        if (formData.punchIn.time) {
            const punchInTime = moment(formData.punchIn.date + ' ' + formData.punchIn.time, 'YYYY-MM-DD h:mm:ss a');
            const timeDifference = currentTime.diff(punchInTime);
            const duration = moment.duration(timeDifference);
            const hours = Math.floor(duration.asHours());
            const minutes = duration.minutes();

            setFormData({
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
            });
            setCountdownTime(null); // Reset countdown time
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
