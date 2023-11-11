import React from 'react';
import { Route, Navigate } from 'react-router-dom';

interface PrivateRouteProps {
    children: React.ReactNode;
    // Other props you might have can be added here
}

const isAuth = true;

const PrivateRoute: React.FC<PrivateRouteProps> = ({
    children,
    ...rest
}) => {
    return (
        <>
            {/* {...rest} */}
            {isAuth ? children : <Navigate to="/" />}
        </>
    );
};

export default PrivateRoute;
