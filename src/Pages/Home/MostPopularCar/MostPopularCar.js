import React from 'react';
import teslaCar from '../../../Final Froject image/Electric-Car-PNG-Image-Background.png'

const MostPopularCar = () => {
    return (
        <div className='mt-5'>
            <h1 className='text-4xl uppercase'>Welcome To Our</h1>
            <h1 className='text-4xl font-black uppercase'>CarClub</h1>
            <div className='grid grid-cols-2 mt-10'>
                <div className='flex justify-end'>
                    <img src={teslaCar} alt="" className='w-10/12' />
                </div>
                <div className='flex  items-center '>
                    <div className='w-1/2 text-left'>
                        <h3 className='text-3xl'>MEET OUR</h3>
                        <h3 className='text-3xl'>CAR CLUB SINCE 1892</h3>
                        <h5 className='text-lg'>USED CAR BIG STORE</h5>
                        <p className='text-justify my-5 text-gray-400'>Claritas est etiam processus dynamicus, qui sequitur mutationem consuetudium lectorum. Mirum est notare quam littera gothica, quam nunc putamus parum claram, anteposuerit litterarum formas humanitatis per seacula quarta decima et quinta decima.</p>
                        <p className='text-gray-400'>Eodem modo typi, qui nunc nobis videntur parum clari, fiant sollemnes in futurum.</p>


                    </div>

                </div>

            </div>
        </div>
    );
};

export default MostPopularCar;