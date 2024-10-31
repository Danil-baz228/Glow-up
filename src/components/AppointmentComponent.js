import React, {useState} from 'react';
import { format } from 'date-fns';
import "./css/ClientPage/AppointmentComponent.css";
import checkIcon from "./img/ClientPage/icon_checkmark.png";
import axios from "axios";

const AppointmentComponent = ({appointment}) => {
    const formattedDate = format(new Date(appointment.date_start), 'dd.MM.yyyy');
    const [hoverRating, setHoverRating] = useState(null);
    const rating = appointment.Review ? appointment.Review.rating : 0;

    return (
        <div className={"appointmentBox"}>
            <img src={appointment.status === "finished" ? checkIcon : checkIcon} alt=""/>
            <div className="appointmentDate">{formattedDate}</div>
            <div className={appointment.Master.gender === "male" ? "masterName masterMale" : "masterName masterFemale"}>{appointment.Master.first_name + " " + appointment.Master.last_name}</div>
            <div className="appointmentRating">
                <div className="starRating">
                    {Array.from({length: 5}, (_, index) => (
                        <svg
                            key={index}
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            fill={index < rating ? `#CCEA2E` : "#969696"}
                            stroke="#CCEA2E"
                            viewBox="0 0 24 24"
                        >
                            <path
                                d="M12 .587l3.668 7.568L24 9.748l-6 5.857L19.336 24 12 19.847 4.664 24 6 15.605 0 9.748l8.332-1.593L12 .587z"/>
                        </svg>
                    ))}
                </div>
            </div>
            <div className="masterOccupation">{appointment.Master.Occupation.name}</div>
            <div className="appointmentCategory">{appointment.Service.Category.name}</div>
            <div className="appointmentPrice">${appointment.Service.price}</div>
        </div>
    );
};

export default AppointmentComponent;