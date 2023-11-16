import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import UpdatePassword from '../../Components/Auth/UpdatePassword';
import { updatePassword } from './passwordAction';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loading from '../../Components/Shared/Loading';
import './UpdatePass.style.css';


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

const passVerificationError = {
    isLenthy: false,
    hasUpper: false,
    hasLower: false,
    hasNumber: false,
    hasSpclChr: false,
    confirmPass: false,
}

const UpdatePass: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [newPassword, setNewPassword] = useState(initialState);
    const [passwordError, setPasswordError] = useState<PasswordError>(passVerificationError);
    useSelector((state: any) => state.password);
    const { isLoading, status, message, input } = useSelector((state: any) => state.password);

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

        if (status === "success") {
            toast.success("Password has been succesfully updated");
            navigate('/')
        } else if (status === "error") {
            toast.error(message);
        }
    };

    if (isLoading) return <Loading />

    return (
        <div className="entry-page">
            <div className="jumbotron form-box">
                <UpdatePassword
                    handleOnChange={handleOnChange}
                    handleOnSubmit={handleOnSubmit}
                    newPassword={newPassword}
                    passwordError={passwordError}
                />
                <div className="text-center">
                    <Link to='/'>Login Now</Link>
                </div>
            </div>
        </div>
    );
}

export default UpdatePass
