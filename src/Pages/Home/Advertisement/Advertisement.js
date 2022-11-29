import React from 'react';
import ImageGallery from 'react-image-gallery';


const Advertisement = ({ post }) => {
    console.log(post);
    const images = [
        {
            original: 'https://picsum.photos/id/1018/1000/600/',
            thumbnail: 'https://picsum.photos/id/1018/250/150/',
        },
        {
            original: 'https://picsum.photos/id/1015/1000/600/',
            thumbnail: 'https://picsum.photos/id/1015/250/150/',
        },
        {
            original: 'https://picsum.photos/id/1019/1000/600/',
            thumbnail: 'https://picsum.photos/id/1019/250/150/',
        },
    ];


    return (
        <div>
            <h1 className='text-5xl'>Advertisement</h1>
            <ImageGallery items={images} />;
        </div>
    );
};

export default Advertisement;