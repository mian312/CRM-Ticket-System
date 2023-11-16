import React, { useEffect, useState } from "react";
import './Entry.style.css';
import LoginForm from "../../Components/Auth/LoginForm";
import ResetPassword from "../../Components/Auth/ResetPassword";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { loginFail, loginPending, loginSuccess } from "./loginSlice";
import { userLogin } from "../../api/UserApi";
import { getUserProfile } from "../Dashboard/userAction";
import { sendPasswordResetOtp } from "../Update-Password/passwordAction";
import { fetchAllTickets } from "../Ticket-Listing/ticketsAction";

const Entry: React.FC = () => {
    const [input, setInput] = useState("");
    const [password, setPassword] = useState("");
    const [frmLoad, setFrmLoad] = useState("login");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isAuth } = useSelector((state: any) => state.login);

    useEffect(() => {
        sessionStorage.getItem('accessJWT') && navigate('/dashboard')
    }, [navigate, isAuth])

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        switch (name) {
            case "input":
                setInput(value);
                break;

            case "password":
                setPassword(value);
                break;

            default:
                break;
        }
    };

    const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!input || !password) {
            return alert("Fill up all the form!");
        }

        dispatch(loginPending());

        try {
            const isAuth: any = await userLogin({ input, password });

            if (isAuth.status === "error") {
                return dispatch(loginFail(isAuth.message));
            }

            dispatch(loginSuccess());
            dispatch(getUserProfile());
            toast.success("Login Successful!");
            dispatch(fetchAllTickets());
            navigate("/dashboard");
        } catch (error: any) {
            dispatch(loginFail(error.message));
            toast.error(error.message);
        }
    };
    const handleOnResetSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        dispatch(sendPasswordResetOtp(input));
        navigate('/password-reset')
        console.log("Input : ", input);
    };

    const formSwitcher = (frmType: string) => {
        setFrmLoad(frmType);
    };

    return (
        <div className="entry-page">
            <Helmet><title>Login to Continue</title></Helmet>
            <div className="form-box jumbotron">
                {frmLoad === "login" && (
                    <LoginForm
                        handleOnChange={handleOnChange}
                        handleOnSubmit={handleOnSubmit}
                        formSwitcher={formSwitcher}
                        input={input}
                        pass={password}
                    />
                )}

                {frmLoad === "rest" && (
                    <ResetPassword
                        handleOnChange={handleOnChange}
                        handleOnResetSubmit={handleOnResetSubmit}
                        formSwitcher={formSwitcher}
                        input={input}
                    />
                )}
            </div>
        </div>
    );
};

export default Entry;
