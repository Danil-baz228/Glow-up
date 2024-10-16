import React, {useEffect, useState} from 'react';
import "./css/ClientPage/ClientHistoryPage.css";
import AppointmentComponent from "./AppointmentComponent";
import axios from "axios";
import {useOutletContext} from "react-router-dom";

const ClientHistoryPage = () => {
    const [appointments, setAppointments] = useState([]);
    const {currentClient} = useOutletContext();

    useEffect(() => {
        if(currentClient) {
            axios.get(`http://localhost:5000/api/appointments/client/${currentClient.client_id}`)
                .then(response => {
                    setAppointments(response.data);
                    console.log(response.data);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }, []);

    return (
        <div className={"clientHistoryPage"}>
            {
                appointments && appointments.length > 0 ? (
                    <div className={"appointmentList"}>
                        {
                            appointments.map((appointment, index) => {
                                return (
                                    <AppointmentComponent key={index} appointment={appointment}/>
                                );
                            })
                        }
                    </div>
                ) : (
                    <h1>Your history is empty.</h1>
                )
            }
        </div>
    );
};

export default ClientHistoryPage;