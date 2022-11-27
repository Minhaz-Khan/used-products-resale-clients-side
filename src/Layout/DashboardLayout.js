import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { authContext } from '../Context/AuthProvider';
import useUserType from '../Hooks/useUserType';
import Navbar from '../Pages/Shared/Navbar/Navbar';

const DashboardLayout = () => {
    const { user } = useContext(authContext);
    const { userType } = useUserType(user?.email)
    console.log(userType);
    return (
        <div>
            <Navbar></Navbar>
            <div className="drawer drawer-mobile w-[1488px] mx-auto mt-10">
                <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content ">
                    <Outlet></Outlet>
                </div>
                <div className="drawer-side">
                    <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 bg-base-100 text-base-content">
                        {userType === 'Buyer' && <li><Link to={'/dashboard'}>My Orders</Link></li>}
                        {userType === 'Seller' &&
                            <>
                                <li><Link to={'/dashboard/addproduct'}>Add a Product</Link></li>
                                <li><Link to={'/'}>My Product</Link></li>
                                <li><Link to={'/'}>My Buyers</Link></li>
                            </>
                        }
                        {
                            userType === "Admin" &&
                            <>
                                <li><Link to={'/'}>All Seller</Link></li>
                                <li><Link to={'/'}>All Buyer</Link></li>
                                <li><Link to={'/'}>Reported Items</Link></li>
                            </>
                        }
                    </ul>

                </div>
            </div>

        </div>
    );
};

export default DashboardLayout;