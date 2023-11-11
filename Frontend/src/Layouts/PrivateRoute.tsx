import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { loginSuccess } from '../Pages/Entry/loginSlice';
import { fetchNewAccessJWT } from '../api/UserApi';

interface PrivateRouteProps {
    children: React.ReactNode;
    // Other props you might have can be added here
}


const PrivateRoute: React.FC<PrivateRouteProps> = ({
    children,
}) => {
    const dispatch = useDispatch();
    const { isAuth } = useSelector((state: any) => state.login);

    useEffect(() => {
        const updateAccessJWT = async () => {
            const result = await fetchNewAccessJWT();
            result && dispatch(loginSuccess());
        };

        updateAccessJWT();

        sessionStorage.getItem("accessJWT") && dispatch(loginSuccess());
    }, [dispatch]);

    return (
        <>
            {isAuth ? children : <Navigate to="/" />}
        </>
    );
};

export default PrivateRoute;
