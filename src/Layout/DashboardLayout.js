import React, { useContext } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
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
            <div className="drawer drawer-mobile md:w-[1488px] mx-auto ">
                <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content pt-10 bg-gray-200">
                    <Outlet></Outlet>
                </div>
                <div className="drawer-side border-l shadow-inner">
                    <label htmlFor="dashboard-drawer" className="drawer-overlay "></label>
                    <ul className="menu p-4 w-80  text-base-content">
                        {userType === 'Buyer' && <li><NavLink to={'/dashboard'}>My Orders</NavLink></li>}
                        {userType === 'Seller' &&
                            <>
                                <li><NavLink to={'/dashboard/addproduct'}>Add a Product</NavLink></li>
                                <li><NavLink to={'/dashboard/myproduct'}>My Product</NavLink></li>
                                <li><NavLink to={'/'}>My Buyers</NavLink></li>
                            </>
                        }
                        {
                            userType === "Admin" &&
                            <>
                                <li><NavLink to={'/'}>All Seller</NavLink></li>
                                <li><NavLink to={'/'}>All Buyer</NavLink></li>
                                <li><NavLink to={'/'}>Reported Items</NavLink></li>
                            </>
                        }
                    </ul>

                </div>
            </div>

        </div>
    );
};

export default DashboardLayout;