import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Triangle } from 'react-loader-spinner';
import Swal from 'sweetalert2';
import { authContext } from '../../../Context/AuthProvider';

const MyProduct = () => {
    const { user } = useContext(authContext);
    const { data: products, isLoading, refetch } = useQuery({
        queryKey: ['myproduct'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/myproduct?email=${user.email}`, {
                headers: {
                    authorization: `baerer ${localStorage.getItem('accessToken')}`
                }
            })
            const data = await res.json();
            return data;
        }
    })
    const handleDeleteProduct = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "Delete this Product!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Delete'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/myproduct/${id}`, {
                    method: 'DELETE',
                    headers: {
                        authorization: `baerer ${localStorage.getItem('accessToken')}`
                    }
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.acknowledged) {
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                        }
                        refetch()
                    })

            }
        })




    }
    if (isLoading) {
        <dir className='h-screen flex justify-center items-center'>
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
            <h2 className="text-3xl  uppercase  border-b-2  w-4/12 mx-auto border-blue-200 font-bold text-gray-700  dark:text-white">My all Product</h2>
            <div className="overflow-x-auto w-full mt-5">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>
                                <label>

                                </label>
                            </th>
                            <th>Name</th>
                            <th>Model</th>
                            <th>Sales Status</th>
                            <th>unsold</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products?.map((product, i) =>
                            <tr key={product._id}>
                                <th>
                                    <label>
                                        <p>{i + 1}</p>
                                    </label>
                                </th>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={product.picture} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{product.sellerName}</div>
                                            <div className="text-sm opacity-50">{product.postTime}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {product.modelName}
                                    <br />
                                    <span className="badge badge-ghost badge-sm">{product.resalePrice}</span>
                                </td>
                                <td>{product.saleStatus}</td>
                                <th>
                                    <button className="btn btn-primary btn-sm">Unsold</button>
                                </th>
                                <th>
                                    <button onClick={() => handleDeleteProduct(product._id)} className="btn btn-sm bg-red-600 border-none text-white  btn-xs">delete</button>
                                </th>
                            </tr>)}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyProduct;