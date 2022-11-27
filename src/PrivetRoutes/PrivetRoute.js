import React, { useContext } from 'react';
import { Triangle } from 'react-loader-spinner';
import { Navigate, useLocation } from 'react-router-dom';
import { authContext } from '../Context/AuthProvider';

const PrivetRoute = ({ children }) => {
    const { user, loading } = useContext(authContext);
    const location = useLocation();
    if (loading) {
        return <dir className='h-screen flex justify-center items-center'>
            <Triangle
                height="80"
                width="80"
                color="#4fa94d"
                ariaLabel="triangle-loading"
                wrapperStyle={{}}
                wrapperClassName=""
                visible={true}
            />
        </dir>
    }

    if (user && user.uid) {
        return children
    }

    return <Navigate to={'/login'} state={{ from: location }} replace></Navigate>
};

export default PrivetRoute;