import React from 'react';

export default function Post(props) {
    return (
        <div>{props.post.data.title} :- asked by {props.post.data.author}</div>
    )
}