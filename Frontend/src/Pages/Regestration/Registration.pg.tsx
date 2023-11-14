import React, { useState } from "react";
import RegistrationForm from "../../Components/Auth/RegistrationForm";
import './Registration.style.css';
import { toast } from "react-toastify";

export const Registration: React.FC = () => {
    const [newUser, setNewUser] = useState({
        name: "",
        phone: "",
        email: "",
        company: "",
        address: "",
        password: "",
        confirmPass: "",
    });

    const [passwordError, setPasswordError] = useState({
        isLengthValid: false,
        hasUpper: false,
        hasLower: false,
        hasNumber: false,
        hasSpecialChar: false,
        confirmPassword: false,
    });

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
        toast.success("Registration successful!");
    };

    return (
        <div className="registration-page">
            <div className="mt-5">
                <div className="form-box jumbotron">
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
