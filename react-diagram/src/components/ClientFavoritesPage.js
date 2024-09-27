import React, {useState} from 'react';
import "./css/ClientPage/ClientFavoritesPage.css";
import MasterDetailsComponent from "./MasterDetailsComponent";

const ClientFavoritesPage = () => {
    const [favorites, setFavorites] = useState([]);

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