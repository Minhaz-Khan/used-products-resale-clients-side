import React from 'react';
import { useForm } from 'react-hook-form';

const AddProduct = () => {
    const { register, handleSubmit } = useForm();

    const handleAddProduct = (data) => {

        const image = data.productImage[0];
        const formdata = new FormData();
        formdata.append('image', image)
        fetch(`https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_image_key}`, {
            method: 'POST',
            body: formdata,
        })
            .then(res => res.json())
            .then(data => console.log(data.data.url))
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
                        <button className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:bg-blue-500">Add Product</button>
                    </div>
                </form>
            </div >
        </section>
    );
};

export default AddProduct;