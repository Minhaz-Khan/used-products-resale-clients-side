import React from 'react';
import ImageGallery from 'react-image-gallery';


const Advertisement = ({ post }) => {
    console.log(Array.isArray(post));
    let images = [];
    for (let img of post) {
        const obj = { original: img.picture }
        images.push(obj);
    }

    return (
        <div>
            <ImageGallery items={images} />;
        </div>
    );
};

export default Advertisement;