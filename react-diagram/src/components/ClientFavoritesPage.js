import React, {useState} from 'react';
import "./css/ClientPage/ClientFavoritesPage.css";
import MasterDetailsComponent from "./MasterDetailsComponent";

const ClientFavoritesPage = () => {
    const [favorites, setFavorites] = useState([
        {
            id: 1,
            first_name: "John",
            last_name: "Doe",
            gender: "male",
            Occupation: {
                id: 1,
                name: "Carpenter"
            },
            categories: [
                {
                    id: 1,
                    name: "Furniture"
                },
                {
                    id: 2,
                    name: "Doors"
                }
            ],
            avgRating: 4.5,
            reviewsCount: 10,
            Salon: {
                City: {
                    name: "Los Angeles"
                },
                address: "123 Main St"
            }
        },
        {
            id: 2,
            first_name: "Jane",
            last_name: "Smith",
            gender: "female",
            Occupation: {
                id: 2,
                name: "Electrician"
            },
            categories: [
                {
                    id: 3,
                    name: "Wiring"
                },
                {
                    id: 4,
                    name: "Lighting"
                }
            ],
            avgRating: 4.7,
            reviewsCount: 15,
            Salon: {
                City: {
                    name: "Los Angeles"
                },
                address: "456 Elm St"
            }
        }
    ]);


    return (
        <div className={"clientFavoritesPage"}>
            {
                favorites && favorites.length > 0 ? (
                    <div className={"specialistList"}>
                            {
                                favorites.map((favorite, index) => {
                                    return (
                                        <MasterDetailsComponent id={index} master={favorite}/>
                                    );
                                })
                            }
                    </div>
                ) : (
                    <h1>You have no favorite specialists.</h1>
                )
            }
        </div>
    );
};

export default ClientFavoritesPage;