import React, {useState} from 'react';
import axios from "axios";
import './css/AuthComponent/AuthComponent.css';
import appleIcon from './img/AuthController/icon_apple.png';
import facebookIcon from './img/AuthController/icon_facebook.png';
import googleIcon from './img/AuthController/icon_google.png';
import emailIcon from './img/AuthController/icon_email.png';
import eyeIcon from './img/AuthController/icon_eye.png';
import useSignIn from "react-auth-kit/hooks/useSignIn";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { useNavigate } from 'react-router-dom';

const AuthComponent = ({setIsAuthModalOpen}) => {
    const [authState, setAuthState] = useState('socialNetworksRegistration'); // Can be 'signup', 'login', or 'passwordRecovery'
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        phone: '',
        email: '',
        password: '',
        confirmPassword: '',
        date_of_birth: '',
        role: 'Client',
    });

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [validationError, setValidationError] = useState(false);

    const navigate = useNavigate();
    const signIn = useSignIn();


    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    }

    const modalClose = () => {
        setIsModalOpen(false);
        setIsAuthModalOpen(false);
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleRegistrationSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        try {
            // Отправка данных на сервер
            const response = await axios.post('http://localhost:5000/auth/register', formData);
            console.log('Registration successful:', response.data);
            
            modalClose();

            // Переход на страницу MasterProfilePage при выборе роли "Master"
            if (formData.role === "Master") {
                navigate('/MasterProfilePage');
            } else {
                console.log("Registered as Client or another role");
            }
        } catch (error) {
            console.error('Error registering user:', error);
            alert('Error registering user');
        }
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(email, password)
            const response = await axios.post('http://localhost:5000/auth/login', { email, password, rememberMe });
            if (response.status === 200 && response.data.token) {
                console.log(response.data);
                const isSignInSuccess = signIn({
                    auth: {
                        token: response.data.token,
                        type: 'Bearer'
                    },
                    userState: {
                        id: response.data.id,
                        username: response.data.username,
                        role: response.data.role
                    }
                });
                if (isSignInSuccess) {
                    console.log("User signed in successfully");
                    modalClose();
                    window.location.reload();
                } else {
                    console.log("Sign in failed");
                    setValidationError(true);
                    setTimeout(() => setValidationError(false), 3000);
                }
            }
        } catch (error) {
            console.log("Sign in failed");
            setValidationError(true);
            setTimeout(() => setValidationError(false), 3000);
            console.error("Error during authentication:", error);
        }
    };


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
                        <form onSubmit={handleRegistrationSubmit}>
                            <input
                                type="text"
                                name="first_name"
                                placeholder="First Name"
                                value={formData.first_name}
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                name="last_name"
                                placeholder="Last Name"
                                value={formData.last_name}
                                onChange={handleInputChange}
                            />
                            <input
                                type="tel"
                                name="phone"
                                placeholder="Phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="E-mail*"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                            />
                            <input
                                type="date"
                                name="date_of_birth"
                                placeholder="Date of birth"
                                onChange={handleInputChange}
                                value={formData.date_of_birth}
                            />
                            <div className="password-input-wrapper">
                                <input
                                    type={isPasswordVisible ? "text" : "password"}
                                    name="password"
                                    placeholder="Password*"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    required
                                />
                                <img
                                    src={eyeIcon}
                                    alt="Show Password"
                                    onClick={togglePasswordVisibility}
                                    className="eye-icon"
                                />
                            </div>
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="Password confirmation*"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                required
                            />
                            <div className="checkbox-wrapper-4">
                                <input className="inp-cbx" id="terms" type="checkbox" required />
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
                            <h2 className={"roleSelectionLabel"}>Continue as:</h2>
                            <select
                                name="role"
                                value={formData.role}
                                onChange={handleInputChange}
                                className="auth-select"
                            >
                                <option value="Client">Client</option>
                                <option value="Master">Master</option>
                            </select>
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
                        <form onSubmit={handleLoginSubmit}>
                            <input type="email" placeholder="E-mail*" required
                                   value={email}
                                   onChange={(e) => setEmail(e.target.value)}
                                   className={validationError ? "error" : ""}
                            />
                            <div className="password-input-wrapper">
                                <input
                                    type={isPasswordVisible ? "text" : "password"}
                                    name="password"
                                    placeholder="Password*"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className={validationError ? "error" : ""}
                                />
                                <img
                                    src={eyeIcon}
                                    alt="Show Password"
                                    onClick={togglePasswordVisibility}
                                    className="eye-icon"
                                />
                            </div>
                            <div className="checkbox-wrapper-4">
                                <input className="inp-cbx" id="terms" type="checkbox" checked={rememberMe}
                                       onChange={(e) => setRememberMe(e.target.checked)}/>
                                <label className="cbx" htmlFor="terms">
                                    <span>
                                        <svg width="12px" height="10px">
                                        <use xlinkHref="#check-4"></use>
                                        </svg>
                                    </span>
                                    <span>Remember me</span>
                                </label>
                                <svg className="inline-svg">
                                    <symbol id="check-4" viewBox="0 0 12 10">
                                        <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                                    </symbol>
                                </svg>
                            </div>
                            <button type="submit">Log In</button>
                        </form>
                    </div>
                );
            case 'passwordRecovery':
                return (
                    <div className={"passwordRecoveryBox"}>
                        <h2>Password recovery</h2>
                        <p>Forgot your password?</p>
                        <p>Enter your E-mail to get a password or create a new one.</p>
                        <form>
                            <input type="email" placeholder="E-mail*" required/>
                            <button type="submit">Recover Password</button>
                        </form>
                    </div>
                );
            default:
                return null;
        }
    };

    return isModalOpen ? (
        <div className="auth-modal">
            <div className="black-cover" onClick={() => modalClose()}></div>
            <div className="auth-container">
                <div onClick={() => modalClose()} className="close-btn">×</div>

                <div className="auth-form">
                    {renderForm()}
                </div>

                <div className="auth-footer">
                    {
                        authState === 'socialNetworksRegistration' || authState === 'socialNetworksLogin' ? (
                            <div className={"termsInfo"}>By continuing, you agree to the privacy policy</div>
                        ) : authState === 'signup' ? (
                            <>
                                <div className="continueWith">
                                    <p>Continue with social networks</p>
                                    <div className="socialIcons">
                                        <img src={googleIcon} alt=""/>
                                        <img src={facebookIcon} alt=""/>
                                        <img src={appleIcon} alt=""/>
                                    </div>
                                </div>
                            </>
                        ) : authState === 'login' ? (
                            <>
                                <div className={"passwordRecoveryLabel"}
                                     onClick={() => setAuthState('passwordRecovery')}>
                                    Forgot Password?
                                </div>
                                <div className="continueWith">
                                    <p>Continue with social networks</p>
                                    <div className="socialIcons">
                                        <img src={googleIcon} alt=""/>
                                        <img src={facebookIcon} alt=""/>
                                        <img src={appleIcon} alt=""/>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className={"passwordRecoveryLabel"} onClick={() => setAuthState('signup')}>Return
                                    to Sign Up
                                </div>
                            </>
                        )}
                </div>
            </div>
        </div>
    ) : null;
};

export default AuthComponent;
