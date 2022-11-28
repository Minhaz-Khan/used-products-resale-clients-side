import { useQuery } from '@tanstack/react-query';
import React, { useContext, useEffect } from 'react';
import { Triangle } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import { authContext } from '../../../Context/AuthProvider';
import useUserType from '../../../Hooks/useUserType';

const MyOrders = () => {
    const navigate = useNavigate()
    const { user } = useContext(authContext);
    const { userType, isLoading: typeLoading } = useUserType(user?.email)
    useEffect(() => {
        if (userType === 'Seller') {
            navigate('/dashboard/addproduct')
        }
        else if (userType === 'Admin') {
            navigate('/')
        }
    }, [navigate, userType])


    const { data: orders, isLoading } = useQuery({
        queryKey: ['bookings'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/bookings?email=${user.email}`, {
                headers: {
                    authorization: `baerer ${localStorage.getItem('accessToken')}`
                }
            })
            const data = await res.json();
            return data
        }
    })
    if (isLoading) {
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

    return (
        <>
            {!typeLoading && <div>
                <h1 className='text-4xl font-semibold mb-5'>My Order List</h1>
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Image</th>
                                <th>Title</th>
                                <th>Price</th>
                                <th>Payment</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order, i) => <tr key={order._id}>
                                <th>{i + 1}</th>
                                <td><div className="avatar">
                                    <div className="w-10 rounded-full  ">
                                        <img src={order.picture} />
                                    </div>
                                </div></td>
                                <td>{order.modelName}</td>
                                <td>{order.resalePrice}</td>
                                <td>{!order.payment && <button className='btn btn-sm btn-primary'>Pay</button>}</td>
                            </tr>)}
                        </tbody>
                    </table>
                </div>
            </div>}
        </>

    );
};

export default MyOrders;