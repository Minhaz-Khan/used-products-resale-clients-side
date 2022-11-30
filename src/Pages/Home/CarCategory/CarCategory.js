import React, { useEffect, useState } from 'react';
import CartCarCategories from './CartCarCategories';

const CarCategory = () => {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/categories')
            .then(res => res.json())
            .then(data => setCategories(data))
    }, [])
    return (
        <div className='mt-10'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-10'>
                {categories.map(categori => <CartCarCategories key={categori._id} categori={categori}></CartCarCategories>)}
            </div>
        </div>
    );
};

export default CarCategory;