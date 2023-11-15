import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import UpdatePassword from '../../Components/Auth/UpdatePassword';
import ResetPassword from '../../Components/Auth/ResetPassword';
import './UpdatePass.style.css';
import { updatePassword } from './passwordAction';


interface PasswordError {
    isLenthy: boolean;
    hasUpper: boolean;
    hasLower: boolean;
    hasNumber: boolean;
    hasSpclChr: boolean;
    confirmPass: boolean;
}

const initialState = {
    pin: "",
    password: "",
    confirmPass: "",
};

const UpdatePass: React.FC = () => {
    const dispatch = useDispatch();

    // const [input, setInput] = useState("");
    const [newPassword, setNewPassword] = useState(initialState);
    const [passwordError, setPasswordError] = useState<PasswordError>({
        isLenthy: false,
        hasUpper: false,
        hasLower: false,
        hasNumber: false,
        hasSpclChr: false,
        confirmPass: false,
    });
    const { showUpdatePassForm } = useSelector((state: any) => state.password);
    const { input } = useSelector((state: any) => state.password);

    const handleOnResetSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // dispatch(sendPasswordResetOtp(email));
    };

    const handleOnResetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setInput(value);
    };

    const formSwitcher = () => { }


    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setNewPassword({ ...newPassword, [name]: value });

        if (name === "password") {
            const isLenthy = value.length > 8;
            const hasUpper = /[A-Z]/.test(value);
            const hasLower = /[a-z]/.test(value);
            const hasNumber = /[0-9]/.test(value);
            const hasSpclChr = /[@,#,$,%,&]/.test(value);

            setPasswordError({
                ...passwordError,
                isLenthy,
                hasUpper,
                hasLower,
                hasNumber,
                hasSpclChr,
            });
        }

        if (name === "confirmPass") {
            setPasswordError({
                ...passwordError,
                confirmPass: newPassword.password === value,
            });
        }
    };

    const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const { pin, password } = newPassword;

        const newPassObj = {
            input,
            pin,
            newPassword: password,
        };
        dispatch(updatePassword(newPassObj));
    };

    return (
        <div className="entry-page bg-info">
            <div className="jumbotron form-box">
                {/* {showUpdatePassForm
                    ? <UpdatePassword
                        handleOnChange={handleOnChange}
                        handleOnSubmit={handleOnSubmit}
                        newPassword={newPassword}
                        passwordError={passwordError}
                    />
                    : <ResetPassword
                        handleOnChange={handleOnResetChange}
                        handleOnResetSubmit={handleOnResetSubmit}
                        formSwitcher={formSwitcher}
                        input={input}
                    />} */}
                <UpdatePassword
                    handleOnChange={handleOnChange}
                    handleOnSubmit={handleOnSubmit}
                    newPassword={newPassword}
                    passwordError={passwordError}
                />
                <div className="text-center">
                    <a href="/">Login Now</a>
                </div>
            </div>
        </div>
    );
}

export default UpdatePass
