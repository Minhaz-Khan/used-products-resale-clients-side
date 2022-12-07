import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';

const CheckoutForm = ({ booking }) => {
    const { resalePrice, buyerEmail, buyerName } = booking
    const stripe = useStripe();
    const elements = useElements();
    const [clientSecret, setClientSecret] = useState("");
    const [cardError, setCardError] = useState('')
    const [success, setSuccess] = useState('')
    const [prosess, setProsess] = useState(false)
    const [transactionID, setTransactionID] = useState('')
    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("http://localhost:5000/create-payment-intent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ price: resalePrice }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, [resalePrice]);


    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            setCardError(error.message)
        } else {
            setCardError('')
        }
        setProsess(true)
        const { paymentIntent, error: confiremError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: buyerName,
                        email: buyerEmail
                    }
                }
            }
        )
        if (confiremError) {
            setCardError(confiremError)
            setProsess(false)
            return;
        }
        if (confiremError) {
            setCardError(confiremError.message);
            setProsess(false)
            return;
        }
        if (paymentIntent.status === "succeeded") {
            setSuccess('Congrats! your payment completed')
            setTransactionID(paymentIntent.id)
        }
        setProsess(false)

    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className='btn-primary btn btn-sm mt-3' type="submit" disabled={!stripe || clientSecret || prosess}>
                    Pay
                </button>
            </form>
            <p className="text-red-600">{cardError}</p>
            {success && <div>
                <p className='text-green-600'>{success}</p>
                <p>Your transactionId: <span className='font-semibold'>{transactionID}</span></p>
            </div>}
        </>
    );
};

export default CheckoutForm;