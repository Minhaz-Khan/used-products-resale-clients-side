import React from 'react';
import CarCategory from '../CarCategory/CarCategory';
import HomeBanner from '../HomeBanner/HomeBanner';
import MostPopularCar from '../MostPopularCar/MostPopularCar';

const Home = () => {

    return (
        <div >
            <HomeBanner></HomeBanner>
            <MostPopularCar></MostPopularCar>
            <CarCategory></CarCategory>
        </div>
    )
};

export default Home;