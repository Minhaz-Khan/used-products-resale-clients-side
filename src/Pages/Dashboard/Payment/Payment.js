import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);
console.log(process.env.REACT_APP_STRIPE_PK);

const Payment = () => {
    const booking = useLoaderData();
    console.log(booking);
    return (
        <div className='ml-5'>
            <h3 className='text-3xl'>Payment for {booking.modelName}</h3>
            <p className='text-lg'>Please Pay <strong>{booking.resalePrice}</strong> for your car</p>
            <div className='w-96 mt-5'>
                <Elements stripe={stripePromise}>
                    <CheckoutForm booking={booking} />
                </Elements>
            </div>

        </div>
    );
};

export default Payment;