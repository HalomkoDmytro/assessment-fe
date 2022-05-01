import React from "react";
import './description-view.css';

const DescriptionView = ({description}) => {
    return <li className="list-group-item">
        <span className="term">Description</span>
        <span>{description}</span>
    </li>
}

export default DescriptionView;