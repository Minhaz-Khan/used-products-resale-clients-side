import React, { useState } from 'react';
import { useLoaderData, useNavigation } from 'react-router-dom';
import BookNowModal from '../BookNowModal/BookNowModal';
import PostCart from '../PostCart/PostCart';

const SellPostCategorie = () => {
    const Navigation = useNavigation();
    const posts = useLoaderData();
    console.log(posts, Navigation);
    const [modalPost, setModalPost] = useState(null);

    return (
        <div>
            <h1>{posts[0].categories}</h1>
            <div className='grid grid-cols-1
            md:grid-cols-2 lg:grid-cols-3 justify-items-center'>
                {posts.map(post => <PostCart key={post._id} post={post} setModalPost={setModalPost}></PostCart>)}
            </div>
            <div>
                {modalPost && <BookNowModal modalPost={modalPost} setModalPost={setModalPost}></BookNowModal>}
            </div>
        </div>
    );
};

export default SellPostCategorie;