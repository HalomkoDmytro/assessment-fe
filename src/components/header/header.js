import React from 'react';

import './header.css';
import {Link} from "react-router-dom";


const Header = () => {
    return (
        <div className="header d-flex">
            <ul className="d-flex">
                <li>
                    <Link to="/">Exams</Link>
                </li>
                <li>
                    <a href="#">About</a>
                </li>
            </ul>
        </div>
    );
};

export default Header;