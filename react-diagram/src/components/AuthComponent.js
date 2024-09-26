import React, {useState} from 'react';
import './css/AuthComponent/AuthComponent.css';
import appleIcon from './img/AuthController/icon_apple.png';
import facebookIcon from './img/AuthController/icon_facebook.png';
import googleIcon from './img/AuthController/icon_google.png';
import emailIcon from './img/AuthController/icon_email.png';


const AuthComponent = () => {
    const [authState, setAuthState] = useState('socialNetworksRegistration'); // Can be 'signup', 'login', or 'passwordRecovery'
    const [isModalOpen, setIsModalOpen] = useState(true);

    const renderForm = () => {
        switch (authState) {
            case 'socialNetworksRegistration':
                return (
                    <div className="social-networks">
                        <div className="auth-header">
                            <h2 className={"inactive"} onClick={() => setAuthState("socialNetworksLogin")}>Log in</h2>
                            <h2>Sign up</h2>
                        </div>
                        <button className="google-btn">
                            <img src={googleIcon} alt="Google"/>
                            <h2>Continue with Google</h2>
                        </button>
                        <button className="facebook-btn">
                            <img src={facebookIcon} alt="Facebook"/>
                            <h2>Continue with Facebook</h2>
                        </button>
                        <button className="apple-btn">
                            <img src={appleIcon} alt="Apple"/>
                            <h2>Continue with Apple</h2>
                        </button>
                        <button className="email-btn" onClick={() => setAuthState("signup")}>
                            <img src={emailIcon} alt="E-mail"/>
                            <h2>Continue by e-mail</h2>
                        </button>
                    </div>
                );
            case 'socialNetworksLogin':
                return (
                    <div className="social-networks">
                        <div className="auth-header">
                            <h2>Log in</h2>
                            <h2 className={"inactive"} onClick={() => setAuthState("socialNetworksRegistration")}>Sign
                                up</h2>
                        </div>
                        <button className="google-btn">
                            <img src={googleIcon} alt="Google"/>
                            <h2>Continue with Google</h2>
                        </button>
                        <button className="facebook-btn">
                            <img src={facebookIcon} alt="Facebook"/>
                            <h2>Continue with Facebook</h2>
                        </button>
                        <button className="apple-btn">
                            <img src={appleIcon} alt="Apple"/>
                            <h2>Continue with Apple</h2>
                        </button>
                        <button className="email-btn" onClick={() => setAuthState("login")}>
                            <img src={emailIcon} alt="E-mail"/>
                            <h2>Continue by e-mail</h2>
                        </button>
                    </div>
                );
            case 'signup':
                return (
                    <div>
                        <div className="auth-header">
                            <h2 className={"inactive"} onClick={() => setAuthState("login")}>Log in</h2>
                            <h2>Sign up</h2>
                        </div>
                        <form>
                            <input type="text" placeholder="First Name"/>
                            <input type="text" placeholder="Last Name"/>
                            <input type="tel" placeholder="Phone"/>
                            <input type="email" placeholder="E-mail*" required/>
                            <input type="date" placeholder="Date of birth"/>
                            <input type="password" placeholder="Password*" required/>
                            <input type="password" placeholder="Password confirmation*" required/>
                            <div className="checkbox-wrapper-4">
                                <input className="inp-cbx" id="terms" type="checkbox" required/>
                                <label className="cbx" htmlFor="terms">
                                    <span>
                                        <svg width="12px" height="10px">
                                        <use xlinkHref="#check-4"></use>
                                        </svg>
                                    </span>
                                    <span>I have read and agree to the terms and conditions of the site </span>
                                </label>
                                <svg className="inline-svg">
                                    <symbol id="check-4" viewBox="0 0 12 10">
                                        <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                                    </symbol>
                                </svg>
                            </div>
                            <button type="submit">Registration</button>
                        </form>
                    </div>
                );
            case 'login':
                return (
                    <div>
                        <div className="auth-header">
                            <h2>Log in</h2>
                            <h2 className={"inactive"} onClick={() => setAuthState("signup")}>Sign up</h2>
                        </div>
                        <form>
                            <input type="email" placeholder="E-mail*" required/>
                            <input type="password" placeholder="Password*" required/>
                            <button type="submit">Log In</button>
                        </form>
                    </div>
                );
            case 'passwordRecovery':
                return (
                    <form>
                        <input type="email" placeholder="E-mail*" required/>
                        <button type="submit">Recover Password</button>
                    </form>
                );
            default:
                return null;
        }
    };

    return isModalOpen ? (
        <div className="auth-container">
            <div onClick={() => setIsModalOpen(false)} className="close-btn">×</div>

            <div className="auth-form">
                {renderForm()}
            </div>

            <div className="auth-footer">
                <p>
                    {
                        authState === 'socialNetworksRegistration' || authState === 'socialNetworksLogin' ? (
                            <div className={"termsInfo"}>By continuing, you agree to the privacy policy</div>
                        ) : authState === 'signup' ? (
                            <>
                                <p>Continue with social networks</p>
                            </>
                        ) : authState === 'login' ? (
                            <>
                                <div onClick={() => setAuthState('passwordRecovery')}>
                                    Forgot Password?
                                </div>
                                <p>Continue with social networks</p>
                            </>
                        ) : (
                            <>
                                <span onClick={() => setAuthState('signup')}>Return to Sign Up</span>
                            </>
                        )}
                </p>
            </div>
        </div>
    ) : null;
};

export default AuthComponent;
