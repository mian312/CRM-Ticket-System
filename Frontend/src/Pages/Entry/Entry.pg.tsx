import React, { useState } from "react";
import './Entry.style.css';
import LoginForm from "../../Components/Auth/LoginForm";
import ResetPassword from "../../Components/Auth/ResetPassword";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const Entry: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [frmLoad, setFrmLoad] = useState("login");

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        switch (name) {
            case "email":
                setEmail(value);
                break;

            case "password":
                setPassword(value);
                break;

            default:
                break;
        }
    };

    const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!email || !password) {
            return alert("Fill up all the form!");
        }

        // TODO call api to submit the form
        console.log("Email : ",email,"\n Password :", password);
        navigate('/app')
    };
    const handleOnResetSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // TODO call api to submit the form
        console.log("Email : ",email);
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
                        email={email}
                        pass={password}
                    />
                )}

                {frmLoad === "rest" && (
                    <ResetPassword
                        handleOnChange={handleOnChange}
                        handleOnResetSubmit={handleOnResetSubmit}
                        formSwitcher={formSwitcher}
                        email={email}
                    />
                )}
            </div>
        </div>
    );
};

export default Entry;
