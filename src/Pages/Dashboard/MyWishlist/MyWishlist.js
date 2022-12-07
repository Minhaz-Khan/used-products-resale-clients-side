import { async } from '@firebase/util';
import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Triangle } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import { authContext } from '../../../Context/AuthProvider';

const MyWishlist = () => {
    const { user } = useContext(authContext);
    const { data: wishList, isLoading } = useQuery({
        queryKey: ['mywishlist', user.email],
        queryFn: async () => {
            const res = await fetch(`https://used-products-resale-server-side-minhaz-khan.vercel.app/mywishlist?email=${user.email}`, {
                headers: {
                    authorization: `baerer ${localStorage.getItem('accessToken')}`
                }
            })
            const data = res.json();
            return data;
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
                        {wishList.map((wish, i) => <tr key={wish._id}>
                            <th>{i + 1}</th>
                            <td><div className="avatar">
                                <div className="w-10 rounded-full  ">
                                    <img src={wish.picture} />
                                </div>
                            </div></td>
                            <td>{wish.modelName}</td>
                            <td>{wish.resalePrice}</td>
                            <td>{<Link to={`/dashboard/payment/${wish.productId}`} className='btn btn-sm btn-primary'>Purchase</Link>}</td>
                        </tr>)}
                    </tbody>
                </table>
            </div>
        </div>

    );
};

export default MyWishlist;