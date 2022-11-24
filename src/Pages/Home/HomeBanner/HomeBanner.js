import React from 'react';
import image1 from '../../../Final Froject image/slider1-aero2-1920x933_1920x846.progressive.webp'
import image2 from '../../../Final Froject image/slider2-aero2-1920x933_1920x846.progressive.webp'
import image3 from '../../../Final Froject image/slider3-aero2-1920x933_1920x846.progressive.webp'

const HomeBanner = () => {
    return (
        <div className="carousel w-full mt-5">
            <div id="slide1" className="carousel-item relative w-full">
                <img src={image1} className="w-full" alt='' />
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a href="#slide3" className="btn btn-circle hover:bg-primary hover:shadow-2xl hover:shadow-primary">❮</a>
                    <a href="#slide2" className="btn btn-circle hover:bg-primary hover:shadow-2xl hover:shadow-primary">❯</a>
                </div>
                <div className="absolute flex  transform justify-center left-5 right-5 top-1/2">
                    <div>
                        <h1 className='text-5xl font-semibold text-white uppercase'>
                            Let's Find
                            Your Next Used Car</h1>
                    </div>
                </div>
            </div>
            <div id="slide2" className="carousel-item relative w-full">
                <img src={image2} className="w-full" alt='' />
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a href="#slide1" className="btn btn-circle hover:bg-primary hover:shadow-2xl hover:shadow-primary">❮</a>
                    <a href="#slide3" className="btn btn-circle hover:bg-primary hover:shadow-2xl hover:shadow-primary">❯</a>
                </div>
                <div className="absolute flex  transform justify-center left-5 right-5 top-1/2">
                    <div>
                        <h1 className='text-5xl font-semibold text-white uppercase'>
                            EXPLORE THE RANGE</h1>
                    </div>
                </div>
            </div>
            <div id="slide3" className="carousel-item relative w-full">
                <img src={image3} className="w-full" alt='' />
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a href="#slide2" className="btn btn-circle hover:bg-primary hover:shadow-2xl hover:shadow-primary">❮</a>
                    <a href="#slide1" className="btn btn-circle hover:bg-primary hover:shadow-2xl hover:shadow-primary">❯</a>
                </div>
                <div className="absolute flex  transform justify-center left-5 right-5 top-1/2">
                    <div>
                        <h1 className='text-5xl font-semibold text-white uppercase'>
                            WORLD LEADING TECHNOLOGY</h1>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeBanner;