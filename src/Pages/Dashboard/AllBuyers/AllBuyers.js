import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Triangle } from 'react-loader-spinner';
import Swal from 'sweetalert2';
import { authContext } from '../../../Context/AuthProvider';

const AllBuyers = () => {
    const { user } = useContext(authContext)
    const { data: allBuyers, isLoading, refetch } = useQuery({
        queryKey: ['users/allseller'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/users/allbuyer?email=${user.email}`, {
                headers: {
                    authorization: `baerer ${localStorage.getItem('accessToken')}`
                }
            })
            const data = await res.json();
            return data;
        }
    })

    const handleUserDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "Delete this Buyer!",
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
            <h1>all Buyers</h1>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Delete Seller</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allBuyers?.map((buyer, i) => <tr key={buyer._id}>
                            <th>{i + 1}</th>
                            <td>{buyer.name}</td>
                            <td>{buyer.email}</td>
                            <td><button onClick={() => handleUserDelete(buyer._id)} className='btn border-none text-white bg-red-600 btn-sm'>Delete</button></td>
                        </tr>)}

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllBuyers;