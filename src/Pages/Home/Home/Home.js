import React, { useEffect, useState } from 'react';
import Advertisement from '../Advertisement/Advertisement';
import CarCategory from '../CarCategory/CarCategory';
import HomeBanner from '../HomeBanner/HomeBanner';
import MostPopularCar from '../MostPopularCar/MostPopularCar';

import axios from "axios";

const Home = () => {
    const [post, setPost] = useState([]);
    useEffect(() => {
        axios.get('https://used-products-resale-server-side-minhaz-khan.vercel.app/myproduct/advertis')
            .then((response) => { setPost(response.data) })
    }, [])
    console.log(post);

    return (
        <div >
            <HomeBanner></HomeBanner>
            <div className=' mt-10 grid grid-cols-1 md:grid-cols-2 bg-slate-100'>
                <div className='flex justify-center items-center md:py-0 py-10'><h2 className='text-4xl font-bold'>Exclusive Product</h2></div>
                <Advertisement post={post}></Advertisement>
            </div>
            <CarCategory></CarCategory>
            <MostPopularCar></MostPopularCar>
        </div>
    )
};

export default Home;