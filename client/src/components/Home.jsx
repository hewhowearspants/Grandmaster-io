import React from 'react';

import { Link } from 'react-router-dom';

import Login from './Login';


const Home = (props) => {
    return(
        <div className = 'home'>
            <h1>Welcome, Grandmaster</h1>
            <ul>
                <li><Login handleLoginSubmit = {props.handleLoginSubmit} /></li>
                <li>No account? <Link to = '/register'>Register</Link></li>
            </ul>
        </div>
    )
}

export default Home;
