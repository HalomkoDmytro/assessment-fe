import React, {Component} from 'react';
import './tag.css';

export default class Tag extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        let tag = this.props.tag;

        return <button className="btn btn-warning btn-tag">
            {tag}
        </button>
    }
}

