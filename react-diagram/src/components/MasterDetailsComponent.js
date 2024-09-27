import React from 'react';
import "./css/ClientPage/MasterDetailsComponent.css";

const MasterDetailsComponent = ({master}) => {
    return (
        <div className={"masterDetailsBox"}>
            <img className={"masterImage"} src="" alt=""/>
            <div className="favoriteButton"></div>
            <div className="masterInfo">
                <div className="masterName"></div>
                <div className="masterOccupation"></div>
                <div className="materCategories"></div>
            </div>
            <div className="masterAdditionalInfo">
                <div className="masterRating"></div>
                <div className="masterAddress"></div>
            </div>
        </div>
    );
};

export default MasterDetailsComponent;