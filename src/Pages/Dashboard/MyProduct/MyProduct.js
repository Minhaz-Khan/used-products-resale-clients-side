import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { authContext } from '../../../Context/AuthProvider';

const MyProduct = () => {
    const { user } = useContext(authContext);
    const { data: products, isLoading } = useQuery({
        queryKey: ['myproduct'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/myproduct?email=${user.email}`)
            const data = await res.json();
            return data;
        }
    })
    return (
        <div>
            <h1>my Product : {products?.length}</h1>
        </div>
    );
};

export default MyProduct;