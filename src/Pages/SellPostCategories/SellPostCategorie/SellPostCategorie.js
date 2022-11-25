import React from 'react';
import { useLoaderData, useNavigation } from 'react-router-dom';
import PostCart from '../PostCart/PostCart';

const SellPostCategorie = () => {
    const Navigation = useNavigation();
    const posts = useLoaderData();
    console.log(posts, Navigation);

    return (
        <div>
            <h1>{posts[0].categories}</h1>
            <div className='grid grid-cols-1
            md:grid-cols-2 lg:grid-cols-3 justify-items-center'>
                {posts.map(post => <PostCart key={post._id} post={post}></PostCart>)}
            </div>
        </div>
    );
};

export default SellPostCategorie;