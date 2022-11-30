import React, { useContext } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
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
                <div className="drawer-side border-l shadow-inner ">
                    <label htmlFor="dashboard-drawer" className="drawer-overlay "></label>
                    <ul className="menu p-4 w-80  text-base-content">
                        {userType === 'Buyer' && <><li>
                            <Link to={'/dashboard'}>My Orders</Link></li>
                            <li> <Link to={'/dashboard/mywishlist'}>My Wishlist</Link></li>
                        </>}
                        {userType === 'Seller' &&
                            <>
                                <li><Link to={'/dashboard/addproduct'}>Add a Product</Link></li>
                                <li><Link to={'/dashboard/myproduct'}>My Product</Link></li>
                                <li><Link to={'/'}>My Buyers</Link></li>
                            </>
                        }
                        {
                            userType === "Admin" &&
                            <>
                                <li><Link to={'/dashboard/allsellers'}>All Seller</Link></li>
                                <li><Link to={'/dashboard/allbuyers'}>All Buyer</Link></li>
                                <li><Link to={'/dashboard/reporteditem'}>Reported Items</Link></li>
                            </>
                        }
                    </ul>

                </div>
            </div>

        </div>
    );
};

export default DashboardLayout;