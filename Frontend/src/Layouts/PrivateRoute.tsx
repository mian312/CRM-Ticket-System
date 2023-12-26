import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { loginSuccess } from '../Pages/Entry/loginSlice';
import { fetchNewAccessJWT } from '../api/UserApi';
import { getUserProfile } from '../Pages/Dashboard/userAction';

interface PrivateRouteProps {
    children: React.ReactNode;
    // Other props you might have can be added here
}


const PrivateRoute: React.FC<PrivateRouteProps> = ({
    children,
}) => {
    const dispatch = useDispatch();
    const { isAuth } = useSelector((state: any) => state.login);
    const { user } = useSelector((state: any) => state.user);

    useEffect(() => {
        const updateAccessJWT = async () => {
            const result = await fetchNewAccessJWT();
            result && dispatch(loginSuccess());
        };

        !user._id && dispatch(getUserProfile() as any);

        !sessionStorage.getItem("accessJWT") &&
            localStorage.getItem("crmSite") &&
            updateAccessJWT();

        isAuth && sessionStorage.getItem("accessJWT") && dispatch(loginSuccess());
    }, [dispatch, isAuth, user._id]);

    return (
        <>
            {isAuth ? children : <Navigate to="/" />}
        </>
    );
};

export default PrivateRoute;
