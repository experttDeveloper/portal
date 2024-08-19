import React, { useEffect, useState } from 'react';
import moment from 'moment'
import { authenticatedUser } from '../service/authentication';
import { Button, Container } from '@mui/material';
import { attendancePunchin, attendancePunchout, fetchPunchInData, getAttendanceData } from '../service/attendance';

import { toast } from 'react-toastify'

export default function AttendancePortal() {

    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [loading, setLoading] = useState(false);
    const [totalHours, setTotalHours] = useState();

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

    const calculateTotalTime = (sessions) => {
        let totalHours = 0;
        let totalMinutes = 0;

        sessions.forEach(session => {
            if (session.punch_out_time) {
                const punchInMoment = moment(`${session.punch_in_date} ${session.punch_in_time}`, 'YYYY-MM-DD h:mm:ss a');
                const punchOutMoment = moment(`${session.punch_out_date} ${session.punch_out_time}`, 'YYYY-MM-DD h:mm:ss a');
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

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const authenticated = await authenticatedUser();
                const response = await getAttendanceData(authenticated.userId);
                if (response.status) {
                    const resutlt = calculateTotalTime(response.attendanceList)
                    if (resutlt) {
                        setTotalHours(resutlt);
                    }
                }
            } catch (error) {
                console.log("error", error)
            }

        })();
    }, [loading])

    useEffect(() => {
        const fetchData = async () => {
            const authenticated = await authenticatedUser();
            try {
                const response = await fetchPunchInData(authenticated.userId);
                if (response.status) {
                    setFormData(prevState => ({
                        ...prevState,
                        punchIn: response.attendnaceData
                    }));
                    if (!response.attendnaceData.punch_out_time) {
                        const punchInDate = moment(`${response.attendnaceData.punch_in_date} ${response.attendnaceData.punch_in_time}`, 'YYYY-MM-DD h:mm:ss a');
                        const now = moment();
                        const timeDifference = now.diff(punchInDate, 'seconds');
                        setElapsedTime(timeDifference);
                        setIsTimerRunning(true);
                    }
                }
            } catch (error) {
                console.error('Error fetching punch-in data:', error);
            }
        };

        fetchData();
    }, []);

    // Timer effect
    useEffect(() => {
        let interval;
        if (isTimerRunning) {
            interval = setInterval(() => {
                setElapsedTime(prevElapsedTime => prevElapsedTime + 1);
            }, 1000);
        } else if (!isTimerRunning && elapsedTime !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isTimerRunning, elapsedTime]);



    const handlePunchIn = async () => {

        const authenticated = await authenticatedUser();
        if (authenticated) {
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
            setFormData(newFormData);

            try {
                const newDataForm = {
                    attendance_id: authenticated.userId,
                    loginDate: newFormData.punchIn.date,
                    loginTime: newFormData.punchIn.time,
                    loginDay: newFormData.punchIn.day,
                }
                const response = await attendancePunchin(newDataForm);
                if (response.status) {
                    toast.success(response.message)
                    setElapsedTime(0);
                    setIsTimerRunning(true);
                    return
                } else {
                    toast.error(response.message)
                    return
                }

            } catch (error) {
                toast.error(error)
                console.error('Error punching in:', error);

            }
        }

    };

    // Function to handle punch-out
    const handlePunchOut = async () => {
        const currentTime = moment();
        if (formData.punchIn.punch_in_time || formData.punchIn.time) {
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
                const newDataForm = {
                    attendance_id: authenticated.userId,
                    logoutDate: newFormData.punchOut.date,
                    logoutTime: newFormData.punchOut.time,
                    logoutDay: newFormData.punchOut.day
                }
                const response = await attendancePunchout(newDataForm);
                if (response.status) {
                    toast.success(response.message)
                    setIsTimerRunning(false);
                    setLoading(false)
                    return
                } else {
                    toast.error(response.message);
                    return
                }

            } catch (error) {
                toast.error("Something went wrong!")
                console.error('Error punching out:', error);

            }
        }
    };

    const formatElapsedTime = (elapsedTime) => {
        const hours = Math.floor(elapsedTime / 360000);
        const minutes = Math.floor((elapsedTime % 3600) / 60);
        const seconds = elapsedTime % 60;
        return `
            <span class="time-part"><span class="count_text">${hours < 10 ? "0" : ""}${hours}</span> <span class="label">Hours</span></span >
            <span class="time-part "><span class="count_text">${minutes < 10 ? "0" : ""}${minutes}</span> <span class="label">Mins</span></span>
            <span class="time-part"><span class="count_text">${seconds < 10 ? "0" : ""}${seconds}</span> <span class="label">Secs</span></span>
    `;
    };

    return (
        <div className='attendance_component'>
            <Container>
                <div className='attendanve_main_sec'>
                    <h1 className='top_main_heading content_title'>Attendance Monitor</h1>
                    <div className='punch_in_punchout'>
                        <Button onClick={handlePunchIn} variant="contained">Punch In</Button>
                        <Button onClick={handlePunchOut} variant="contained">Punch Out</Button>
                    </div>
                </div>
                <div className='timer_sec'>
                    <p>
                        <span className='elapsed_time' dangerouslySetInnerHTML={{ __html: formatElapsedTime(elapsedTime) }}></span>
                    </p>
                </div>
                {/* <p className='total_hoirs'>{`Total Hours : ${totalHours ? totalHours : "0"} h`}</p> */}
                {/* {formData.punchIn.time && (
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
                )} */}

            </Container>
        </div>
    )
}
