import React from 'react';

import { Link } from 'react-router-dom';

import Login from './Login';

// the login screen! user redirects to here if not logged in
const Home = (props) => {
    return (
        <div className = 'home'>
            <h1>Welcome, Grandmaster</h1>
            <ul>
                <li><Login handleLoginSubmit = {props.handleLoginSubmit} /></li>
                <li>Not logged in? <Link to = '/register'>Register</Link></li>
            </ul>
        </div>
    )
}

export default Home;
