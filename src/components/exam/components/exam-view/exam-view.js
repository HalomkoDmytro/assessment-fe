import React, {Component} from "react";
import './exam-view.css';
import DescriptionView from "../description-view";
import {Link} from "react-router-dom";
import TagView from "../tag-view";

export default class ExamView extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {id, description, img, language, test, tags, title, year} = this.props.exam;

        const descriptionView = description ? <DescriptionView description={description}/> : null;
        const tagsView = <TagView tags={tags}/>

        return <React.Fragment>
            <div>
                <div className="inner">
                    <img className="exam-image"
                         src={`${img}`} alt={'assessment img'}/>
                    <div>
                        <h4>{title}</h4>
                        <ul className="list-group list-group-flush">
                            {descriptionView}
                            <li className="list-group-item">
                                <span className="term">language</span>
                                <span>{language}</span>
                            </li>
                            <li className="list-group-item">
                                <span className="term">year</span>
                                <span>{year}</span>
                            </li>
                            {tagsView}
                        </ul>
                    </div>
                </div>
                <div className="question-list">
                    <Link to={`/exam/${id}/random`}><button className="btn btn-primary">Random question</button></Link>
                </div>
            </div>
        </React.Fragment>
    }
}
