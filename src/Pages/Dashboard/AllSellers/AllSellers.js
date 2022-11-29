import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Triangle } from 'react-loader-spinner';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { authContext } from '../../../Context/AuthProvider';

const AllSellers = () => {
    const { user } = useContext(authContext)
    const { data: allSellers, isLoading, refetch } = useQuery({
        queryKey: ['users/allseller'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/users/allseller?email=${user.email}`, {
                headers: {
                    authorization: `baerer ${localStorage.getItem('accessToken')}`
                }
            })
            const data = await res.json();
            return data;
        }
    })

    const handleUserVerified = (id) => {
        fetch(`http://localhost:5000/users/verify/${id}`, {
            method: 'PUT',
            headers: {
                authorization: `baerer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    toast('Verifid Done')
                    refetch()
                }
            })

    }

    const handleUserDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "Delete This Seller",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Delete'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/users/${id}`, {
                    method: 'DELETE'
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
        <div>
            <h1>all Sellers</h1>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Make Verfied</th>
                            <th>Delete Seller</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allSellers?.map((seller, i) => <tr key={seller._id}>
                            <th>{i + 1}</th>
                            <td>{seller.name}</td>
                            <td>{seller.email}</td>
                            <td>{!seller.verifyStatus && <button onClick={() => handleUserVerified(seller._id)} className='btn btn-primary btn-sm'>Verified</button>}</td>
                            <td><button onClick={() => handleUserDelete(seller._id)} className='btn border-none text-white bg-red-600 btn-sm'>Delete</button></td>
                        </tr>)}

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllSellers;