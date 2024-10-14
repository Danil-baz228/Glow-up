import React from 'react';
import eyeIcon from "./img/AuthController/icon_eye.png";
import './css/ClientPage/ClientDetailsPage.css';

const ClientDetailsPage = () => {
    const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    }

    return (
        <div className={"clientDetailsPage"}>
            <form action="">
                <div className="clientFormLabel">Your First Name and Last name</div>
                <input name={"clientName"} type="text" placeholder="Name"/>
                <div className="clientFormLabel">Your Email and Password</div>
                <input name={"clientEmail"} type="email" placeholder="Email"/>
                <div className="clientFormLabel">New password</div>
                <div className="password-input-wrapper">
                    <input name={"clientPassword"} type={isPasswordVisible ? "text" : "password"} required/>
                    <img src={eyeIcon} alt="Show Password" onClick={togglePasswordVisibility} className="eye-icon"/>
                </div>
                <div className={"clientFormLabel"}>Repeat new password</div>
                <div className="password-input-wrapper">
                    <input name={"clientPasswordRepeat"} type={isPasswordVisible ? "text" : "password"} required/>
                    <img src={eyeIcon} alt="Show Password" onClick={togglePasswordVisibility} className="eye-icon"/>
                </div>
                <div className="clientFormLabel">Your phone number</div>
                <input name={"clientPhone"} type="tel" placeholder="Phone"/>
                <div className="clientFormLabel">Your address</div>
                <input name={"clientAddress"} type="text" placeholder="Address"/>
                <div className="clientDetailsFormButtons">
                    <button type="reset">Cancel</button>
                    <button type="submit">Save</button>
                </div>
            </form>
        </div>
    );
};

export default ClientDetailsPage;