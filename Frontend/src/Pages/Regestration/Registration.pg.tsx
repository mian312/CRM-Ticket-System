import React, { useState } from "react";
import RegistrationForm from "../../Components/Auth/RegistrationForm";
import './Registration.style.css';
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "react-bootstrap";
import { newUserRegistration } from "./userRegestrationAction";
import { useNavigate } from "react-router-dom";

const initialUser = {
    name: "",
    phone: "",
    email: "",
    address: "",
    password: "",
    confirmPass: "",
}

const passVerificationError = {
    isLengthValid: false,
    hasUpper: false,
    hasLower: false,
    hasNumber: false,
    hasSpecialChar: false,
    confirmPassword: false,
}

export const Registration: React.FC = () => {
    const [newUser, setNewUser] = useState(initialUser);
    const [passwordError, setPasswordError] = useState(passVerificationError);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { isLoading, status, message } = useSelector(
        (state: any) => state.registration
    );

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setNewUser({ ...newUser, [name]: value });

        // Password validation logic
        if (name === 'confirmPass' || name === 'password') {
            const isLengthValid = value.length >= 8;
            const hasUpper = /[A-Z]/.test(value);
            const hasLower = /[a-z]/.test(value);
            const hasNumber = /\d/.test(value);
            const hasSpecialChar = /[@#$%^&]/.test(value);

            // Update passwordError state
            setPasswordError({
                ...passwordError,
                isLengthValid,
                hasUpper,
                hasLower,
                hasNumber,
                hasSpecialChar,
                confirmPassword: newUser.confirmPass === value,
            });
        }
    };



    const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(newUserRegistration(newUser));
        status === "error"
            ? toast.error("User is aready in use")
            : toast.success("New user is created");
        navigate('/');
    };

    return (
        <div className="registration-page">
            <div className="mt-5">
                <div className="form-box jumbotron">
                    {/* {message && (
                        <Alert variant={status === "success" ? "success" : "danger"}>
                            {message}
                        </Alert>
                    )} */}
                    <RegistrationForm
                        onChange={handleOnChange}
                        onSubmit={handleOnSubmit}
                        newUser={newUser}
                        passwordError={passwordError}
                    />
                </div>
            </div>
        </div>
    );
};
