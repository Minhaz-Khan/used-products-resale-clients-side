import React, { useContext } from 'react';
import { useRouteError } from 'react-router-dom';
import { authContext } from '../../../Context/AuthProvider';
import './ErrorPage.css'

const ErrorPage = () => {
    const error = useRouteError();
    const { logout } = useContext(authContext);
    return (
        <section className='w-full h-screen flex justify-center items-center'>
            <div class="page_404 w-full flex justify-center">
                <div class="container">
                    <div class="row">
                        <div class="col-sm-12 ">
                            <div class="col-sm-10 col-sm-offset-1  text-center">
                                <div class="four_zero_four_bg">
                                    <h1 class="text-center ">404</h1>


                                </div>

                                <div class="contant_box_404">
                                    <h3 class="h2">
                                        Look like you're lost
                                    </h3>

                                    <p>{error.statusText || error.message}</p>

                                    <button onClick={() => logout()} className="link_404">Sign Out</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ErrorPage;