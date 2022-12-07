import React, { useContext } from 'react';
import { toast } from 'react-toastify';
import { authContext } from '../../../Context/AuthProvider';

const BookNowModal = ({ modalPost, setModalPost }) => {
    const { user } = useContext(authContext);
    const { modelName, resalePrice, _id, picture } = modalPost;
    const handleModalForm = (e) => {
        e.preventDefault();
        const from = e.target;
        const number = from.number.value;
        const location = from.location.value;
        const BookingInfo = {
            picture,
            buyerName: user.displayName,
            buyerEmail: user.email,
            bookedProductId: _id,
            number,
            modelName,
            resalePrice,
            meetingLocation: location,

        }
        fetch('https://used-products-resale-server-side-minhaz-khan.vercel.app/bookings', {
            method: "POST",
            headers: {
                'content-type': 'application/json',
                authorization: `baerer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(BookingInfo)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    toast('Booking Confirm')
                }
            })
        setModalPost(null)
    }
    return (
        <div>
            <input type="checkbox" id="Book-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box w-96">
                    <h1 className='text-center mb-3 font-medium text-xl'>Give Some Info</h1>
                    <form onSubmit={handleModalForm} className='space-y-2'>
                        <input name='name' type="text" placeholder="" className="input input-bordered w-full " value={user.displayName} disabled />
                        <input name='email' type="text" placeholder="Type here" className="input input-bordered w-full " value={user.email} disabled />
                        <input name='carmodel' type="text" placeholder="Type here" className="input input-bordered w-full " value={modelName} disabled />
                        <input name='price' type="text" placeholder="Type here" className="input input-bordered w-full " value={resalePrice} disabled />
                        <input name='location' type="text" placeholder="Meeting location" className="input input-bordered w-full " />
                        <input name='number' type="text" placeholder="Phone Number" className="input input-bordered w-full " />
                        <button className='btn w-full'>Confirm</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BookNowModal;