import React, { useContext, useEffect, useState } from 'react';
import { authContext } from '../../../Context/AuthProvider';
import { ShoppingCartIcon } from '@heroicons/react/24/solid'
import { toast } from 'react-toastify';

const PostCart = ({ post, setModalPost }) => {
    const { user } = useContext(authContext)
    const [seller, setSeller] = useState();
    const { location, modelName, orginalPrice, picture, postTime, resalePrice, sellerName, yearOfUse, sellerEmail, _id } = post;
    useEffect(() => {
        fetch(`https://used-products-resale-server-side-minhaz-khan.vercel.app/users/${sellerEmail}`)
            .then(res => res.json())
            .then(data => {
                setSeller(data)
                console.log(data)
            });
    }, [sellerEmail])

    const handlewishlist = () => {
        const wishList = {
            picture,
            resalePrice,
            productId: _id,
            email: user.email,
            modelName

        }
        fetch(`https://used-products-resale-server-side-minhaz-khan.vercel.app/mywishlist`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                authorization: `baerer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(wishList)
        })
            .then(res => res.json())
            .then(data => {
                toast('Add To wishlist')
            })
    }
    return (
        <div className="w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
            <img className="object-cover object-center w-full h-56" src={picture} alt="avatar" />

            <div className="flex justify-between items-center px-6 py-3 bg-gray-900">


                <h1 className="mx-3 text-lg font-semibold text-white">Model: {modelName}</h1>
                <ShoppingCartIcon onClick={handlewishlist} className='w-5 cursor-pointer text-white'></ShoppingCartIcon>
            </div>

            <div className="px-6 py-4 relative">
                {seller?.verifyStatus === 'verified' && <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Eo_circle_light-blue_checkmark.svg/2048px-Eo_circle_light-blue_checkmark.svg.png" alt="" className='absolute right-4 w-4 h-4' />}
                <h1 className="text-xl font-semibold text-gray-800 dark:text-white">Resale Price:{resalePrice}</h1>

                <p className="py-2 text-gray-700 dark:text-gray-400">Seller: {sellerName} </p>

                <div className='flex '>

                    <div className=''>
                        <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200">
                            <h1 className="px-2 text-sm"><span className='font-semibold'>Original Price:</span> {orginalPrice}</h1>
                        </div>

                        <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200">
                            <h1 className="px-2 text-sm"><span className='font-semibold'>Locatin:</span>{location}</h1>
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200">
                            <h1 className="px-2 text-sm"><span className='font-semibold'>Use of Year:</span>{yearOfUse}</h1>
                        </div>
                        <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200">
                            <h1 className="px-2 text-sm"><span className='font-semibold'>Post Time:</span>{postTime}</h1>
                        </div>
                    </div>
                </div>
                <div className='flex justify-center mt-5'>

                    <label htmlFor="Book-modal" className="border-none btn  w-full  text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md sm:mx-2 sm:order-2 sm:w-auto hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80" onClick={() => setModalPost(post)}>Book Now</label>
                </div>
            </div>


        </div>
    );
};

export default PostCart;