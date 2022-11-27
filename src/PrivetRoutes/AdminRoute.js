import React, { useContext } from 'react';
import { Triangle } from 'react-loader-spinner';
import { Navigate, useLocation } from 'react-router-dom';
import { authContext } from '../Context/AuthProvider';
import useUserType from '../Hooks/useUserType';

const AdminRoute = ({ children }) => {
    const { user, loading } = useContext(authContext);
    const { userType, isLoading } = useUserType(user?.email)
    const location = useLocation();
    if (loading || isLoading) {
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

    if (user && userType) {
        return children
    }

    return <Navigate to={'/login'} state={{ from: location }} replace></Navigate>
};

export default AdminRoute;