import React from 'react';

const MyWishlist = () => {
    return (
        <div className='px-5'>
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
                            <td>{!order.payment ? <Link to={`/dashboard/payment/${order._id}`} className='btn btn-sm btn-primary'>Pay</Link> : <p>Payment Done</p>}</td>
                        </tr>)}
                    </tbody>
                </table>
            </div>
        </div>

    );
};

export default MyWishlist;