import React from 'react';
import ImageGallery from 'react-image-gallery';


const Advertisement = ({ post }) => {
    console.log(Array.isArray(post));
    let images = [];
    for (let img of post) {
        const obj = { original: img.picture, thumbnail: img.picture, originalHeight: 200 }
        images.push(obj);
    }

    return (
        <div className='flex justify-center items-center '>
            <ImageGallery items={images} />;
        </div>
    );
};

export default Advertisement;