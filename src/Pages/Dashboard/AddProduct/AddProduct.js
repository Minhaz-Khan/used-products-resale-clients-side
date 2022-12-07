import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ColorRing } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { authContext } from '../../../Context/AuthProvider';

const AddProduct = () => {
    const { register, handleSubmit } = useForm();
    const Navigate = useNavigate()
    const { user } = useContext(authContext);
    const [isLoading, setIsLoading] = useState(false);

    const handleAddProduct = (data) => {
        setIsLoading(true)
        const categories = data.categories;
        let categoriesId = '637fb46afa57a50d5111e4ff';
        if (categories === 'Audi') {
            categoriesId = '637fb46afa57a50d5111e500'
        }
        else if (categories === 'Mercedes') {
            categoriesId = '637fb46afa57a50d5111e501'
        }
        const postData = new Date().toLocaleDateString()
        const image = data.productImage[0];
        const formdata = new FormData();
        formdata.append('image', image)
        fetch(`https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_image_key}`, {
            method: 'POST',
            body: formdata,
        })
            .then(res => res.json())
            .then(imagedata => {
                console.log(imagedata.data.url)
                if (imagedata.success) {
                    const picture = imagedata.data.url;
                    const product = {
                        sellerName: user.displayName,
                        sellerEmail: user.email,
                        picture,
                        location: data.location,
                        resalePrice: data.resalePrice,
                        orginalPrice: data.orginalPrice,
                        yearOfUse: data.yearOfUse,
                        postTime: postData,
                        modelName: data.modelName,
                        categoriesId,
                        categories,
                        discription: data.discription,
                        condition: data.conditionType,
                        saleStatus: 'Available'
                    }
                    console.log(product);

                    fetch(`https://used-products-resale-server-side-minhaz-khan.vercel.app/addProduct?email=${user.email}`, {
                        method: "POST",
                        headers: {
                            'content-type': 'application/json',
                            authorization: `baerer ${localStorage.getItem('accessToken')}`
                        },
                        body: JSON.stringify(product)
                    })
                        .then(res => res.json())
                        .then(addData => {
                            console.log(addData)
                            if (addData.acknowledged) {
                                setIsLoading(false)
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Added Product Successfully',
                                    showConfirmButton: false,
                                    timer: 1500,
                                })
                                Navigate('/dashboard/myproduct')

                            }

                        })
                }
            })
    }
    return (
        <section className='mx-auto'>
            <div className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
                <h2 className="text-2xl  uppercase  border-b-2  w-4/12 mx-auto border-blue-200 font-bold text-gray-700  dark:text-white">Add Your Product</h2>

                <form onSubmit={handleSubmit(handleAddProduct)}>
                    <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2 text-left">
                        <div>
                            <label className="text-gray-700 dark:text-gray-200" htmlFor="image">Product Image</label>
                            <input {...register('productImage')} id="image" type="file" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                        </div>


                        <div>
                            <label className="text-gray-700 dark:text-gray-200" htmlFor="model">Product Name/model</label>
                            <input {...register('modelName')} id="emailAddress" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                        </div>

                        <div>
                            <label className="text-gray-700 dark:text-gray-200" htmlFor="resaleprice">Resale Price</label>
                            <input {...register('resalePrice')} id="text" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                        </div>

                        <div>
                            <label className="text-gray-700 dark:text-gray-200" htmlFor="originaprice">Original Price</label>
                            <input {...register('orginalPrice')} id="textConfirmation" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                        </div>
                        <div>
                            <label className="text-gray-700 dark:text-gray-200" htmlFor="useofoyear">Years of use</label>
                            <input {...register('yearOfUse')} id="username" type="number" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                        </div>

                        <div>
                            <label className="text-gray-700 dark:text-gray-200" htmlFor="conditon">Condition type</label>
                            <select {...register('conditionType')} defaultValue={'Excellent'} className="select select-bordered w-full ">
                                <option >Excellent</option>
                                <option>Good</option>
                                <option>Fair</option>
                            </select>
                        </div>

                        <div>
                            <label className="text-gray-700 dark:text-gray-200" htmlFor="text">Category/Brand</label>
                            <select {...register('categories')} defaultValue={'Tesla'} className="select select-bordered w-full ">
                                <option >Tesla</option>
                                <option>Audi</option>
                                <option>Mercedes</option>
                            </select>
                        </div>

                        <div>
                            <label className="text-gray-700 dark:text-gray-200" htmlFor="number">Phone Number</label>
                            <input {...register('number')} id="text" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                        </div>

                        <div>
                            <label className="text-gray-700 dark:text-gray-200" htmlFor="textConfirmation">Discription</label>
                            <textarea {...register('discription')} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"></textarea>
                        </div>

                        <div>
                            <label className="text-gray-700 dark:text-gray-200" htmlFor="emailAddress">Your Loacation</label>
                            <input {...register('location')} id="emailAddress" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                        </div>




                    </div>

                    <div className="flex justify-end mt-6">
                        <button className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:bg-blue-500">{isLoading ? <span className='flex justify-center'><ColorRing
                            visible={true}
                            height="30"
                            width="30"
                            ariaLabel="blocks-loading"
                            wrapperStyle={{}}
                            wrapperClass="blocks-wrapper"
                            colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                        /> </span> : "Add Product"}</button>
                    </div>
                </form>
            </div >
        </section>
    );
};

export default AddProduct;