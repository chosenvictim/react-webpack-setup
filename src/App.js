/**
 * Root Component
 */
import React from 'react';
import { Link } from 'react-router';

export default function App(props)  {
    return (
        <div>
            <ul role="nav">
                <li><Link to="/home">Home</Link></li>
            </ul>
            {props.children}
        </div>
    );
}
