import React from 'react';

import { Link } from 'react-router-dom';

import Login from './Login';


const Home = () => {
    return(
        <div className="home">
            <h1> Welcome to our Battle Card app. </h1>
            <ul>
                <li><Login /></li>
                <li>Not logged in? <Link to ='/register'>Register</Link></li>
            </ul>
        </div>
    )
}

export default Home;
