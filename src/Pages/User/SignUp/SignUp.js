import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import { ColorRing } from 'react-loader-spinner';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { authContext } from '../../../Context/AuthProvider';
import useToken from '../../../Hooks/useToken';
const SignUp = () => {
    const { googlelogin, CreateUser, updateUser } = useContext(authContext)
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [signupError, setSignupError] = useState('')
    const [userEmail, setUserEmail] = useState();
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const token = useToken(userEmail);
    if (token) {
        navigate('/')
    }

    const handleSignUp = (data) => {
        setLoading(true)
        console.log(data.image);
        const name = data.name;
        const email = data.email;
        const password = data.password;
        const userType = data.userType;
        const image = data.image[0];
        const formdata = new FormData();
        formdata.append('image', image)
        fetch(`https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_image_key}`, {
            method: 'POST',
            body: formdata,
        })
            .then(res => res.json())
            .then(imageData => {
                console.log(imageData);
                if (imageData.success) {
                    const user = {
                        name,
                        email,
                        userType,
                        image: imageData.data.url
                    }

                    CreateUser(email, password)
                        .then(result => {

                            fetch(`https://used-products-resale-server-side-minhaz-khan.vercel.app/users`, {
                                method: "POST",
                                headers: {
                                    'content-type': 'application/json'
                                },
                                body: JSON.stringify(user)
                            })
                                .then(res => res.json())
                                .then(data => {
                                    if (data.acknowledged) {


                                    }
                                    const userInfo = {
                                        displayName: name,
                                        photoURL: imageData.data.url
                                    }
                                    updateUser(userInfo)
                                        .then(() => {
                                            Swal.fire({
                                                icon: 'success',
                                                title: 'Login successfully',
                                                showConfirmButton: false,
                                                timer: 1500,
                                            })
                                            setUserEmail(email)
                                            setLoading(false)
                                        })
                                        .catch(e => console.log(e))


                                })
                        })
                        .catch(e => {
                            setSignupError(e.message)
                        })
                }
            })



    }
    const handleGoogleLogin = () => {
        googlelogin()
            .then(result => {
                const user = result.user;
                const updateUser = {
                    name: user.displayName,
                    email: user.email,
                    image: user.photoURL,
                    userType: 'Buyer'
                }
                fetch(`https://used-products-resale-server-side-minhaz-khan.vercel.app/users`, {
                    method: "POST",
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(updateUser)
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.acknowledged) {
                            Swal.fire({
                                icon: 'success',
                                title: 'Login successfully',
                                showConfirmButton: false,
                                timer: 1500,
                            })
                        }

                    })
            })
            .catch(e => { setSignupError(e.message) })
    }
    const imageUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJS0LvjGTfeS2o4Z0IajCggs5pDgmZSSJmTz5KoFjpffeeaYxypglyv7529E7hOJkOi4g&usqp=CAU'
    return (
        <div className="my-20 flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl">
            <div className="hidden bg-cover lg:block lg:w-1/2" style={{ background: `url(${imageUrl})`, backgroundRepeat: "no-repeat", backgroundSize: "cover" }}></div>


            <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
                <div className="w-full max-w-sm p-6 m-auto mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
                    <h1 className="text-3xl font-semibold text-center text-gray-700 dark:text-white">Brand</h1>

                    <form className="mt-6" onSubmit={handleSubmit(handleSignUp)}>
                        <div>
                            <label className="block text-start text-sm text-gray-800 dark:text-gray-200">Name</label>
                            <input {...register('name', { required: 'input your name' })} type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" />
                            {errors.name && errors.name.type === 'required' && <p>{errors.name.message}</p>}
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">User Type</span>
                            </label>
                            <select {...register('userType')} className="select select-bordered">
                                <option>Seller</option>
                                <option>Buyer</option>
                            </select>
                        </div>

                        <div className='mt-4'>
                            <label className="block text-start text-sm text-gray-800 dark:text-gray-200">Email</label>
                            <input {...register('email', { required: 'input your name' })} type="email" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" />
                            {errors.email && errors.email.type === 'required' && <p>{errors.email.message}</p>}
                        </div>



                        <div className="mt-4">
                            <div className="flex items-center justify-between">
                                <label className="block text-sm text-gray-800 dark:text-gray-200">Password</label>
                                <Link href="#" className="text-xs text-gray-600 dark:text-gray-400 hover:underline">Forget Password?</Link>
                            </div>
                            <input {...register('password', {
                                required: 'input your password must', minLength: { value: 6, message: 'password must be 6 charecter' }, pattern: {
                                    value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                                    , message: 'password must be strong'
                                }
                            })} type="password" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" />
                            {errors.password && <p className='text-red-500'>{errors.password.message}</p>}

                        </div>

                        <div className='flex items-center '>
                            <label className='label'>Image:</label>
                            <input {...register('image', { required: 'input your photo' })} type="file" id="" />
                            {errors.password && errors.password.type === 'required' && <p>{errors.password.message}</p>}
                            {signupError && <p className='text-red-600'>{signupError}</p>}
                        </div>


                        <div className="mt-6">
                            <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
                                {loading ? <span className='flex justify-center'><ColorRing
                                    visible={true}
                                    height="30"
                                    width="30"
                                    ariaLabel="blocks-loading"
                                    wrapperStyle={{}}
                                    wrapperClass="blocks-wrapper"
                                    colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                                /> </span> : "Sign Up"}
                            </button>
                        </div>
                    </form>

                    <div className="flex items-center justify-between mt-4">
                        <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/5"></span>

                        <Link href="#" className="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline">
                            or login with Social Media
                        </Link>

                        <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/5"></span>
                    </div>

                    <div className="flex items-center justify-center mt-6">
                        <Link onClick={handleGoogleLogin} className="flex items-center justify-center mt-4 text-gray-600 transition-colors duration-300 transform border rounded-lg dark:border-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <div className="px-4 py-2">
                                <svg className="w-6 h-6" viewBox="0 0 40 40">
                                    <path d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z" fill="#FFC107" />
                                    <path d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z" fill="#FF3D00" />
                                    <path d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z" fill="#4CAF50" />
                                    <path d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z" fill="#1976D2" />
                                </svg>
                            </div>

                            <span className="w-5/6 px-4 py-3 font-bold text-center">Sign in with Google</span>
                        </Link>
                    </div>

                    <p className="mt-8 text-xs font-light text-center text-gray-400"> Already have an account <Link to={'/login'} className="font-medium text-gray-700 dark:text-gray-200 hover:underline">Please Login</Link></p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;