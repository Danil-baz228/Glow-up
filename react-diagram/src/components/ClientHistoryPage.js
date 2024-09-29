import React, {useState} from 'react';
import "./css/ClientPage/ClientHistoryPage.css";
import AppointmentComponent from "./AppointmentComponent";

const ClientHistoryPage = () => {
    const [appointments, setAppointments] = useState([
        {
            "appointment_id": 1,
            "date": "2023-10-01T10:00:00Z",
            "Master": {
                "first_name": "John",
                "last_name": "Doe",
                "gender": "male",
                "Occupation": {
                    "name": "Hair Stylist"
                }
            },
            "Review": {
                "rating": 4
            },
            "Service": {
                "Category": {
                    "name": "Haircut"
                },
                "price": "50.00"
            }
        },
        {
            "appointment_id": 2,
            "date": "2023-10-02T14:00:00Z",
            "Master": {
                "first_name": "Jane",
                "last_name": "Smith",
                "gender": "female",
                "Occupation": {
                    "name": "Nail Technician"
                }
            },
            "Review": {
                "rating": 5
            },
            "Service": {
                "Category": {
                    "name": "Manicure"
                },
                "price": "30.00"
            }
        }
    ]);

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