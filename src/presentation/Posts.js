import React from 'react';
import Post from './Post';

export default function Posts(props) {
    return (
        <div>
            { props.posts.map((post, idx) => <Post key={idx} post={post} />)}
        </div>
    )
}