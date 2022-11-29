import React, { useEffect, useState } from 'react';
import Advertisement from '../Advertisement/Advertisement';
import CarCategory from '../CarCategory/CarCategory';
import HomeBanner from '../HomeBanner/HomeBanner';
import MostPopularCar from '../MostPopularCar/MostPopularCar';

import axios from "axios";

const Home = () => {
    const [post, setPost] = useState(null);
    useEffect(() => {
        axios.get('http://localhost:5000/myproduct/advertis')
            .then((response) => { setPost(response.data) })
    }, [])
    console.log(post);

    return (
        <div >
            <HomeBanner></HomeBanner>
            <Advertisement post={post}></Advertisement>
            <MostPopularCar></MostPopularCar>
            <CarCategory></CarCategory>
        </div>
    )
};

export default Home;