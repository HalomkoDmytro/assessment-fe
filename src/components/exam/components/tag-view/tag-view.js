import React, {Component} from "react";
import './tag-view.css'
import Tag from "../tag";

export default class TagView extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {tags} = this.props;

        const resultTags = [];

        if (tags) {
            tags.forEach(tag => {
                resultTags.push(<Tag key={tag.tag} tag={tag.tag}/>);
            })
        }

        return <React.Fragment>
            <li className="list-group-item">
                <span className="term">Tags</span>
                <span>{resultTags}</span>
            </li>
        </React.Fragment>
    }
}