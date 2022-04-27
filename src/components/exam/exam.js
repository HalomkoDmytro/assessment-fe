import React, {Component} from "react";
import ExamService from "../../service/exam-service";
import './exam.css'
import Spinner from "../spinner";
import ErrorIndicator from "../error-indicator";
import {Link} from "react-router-dom";

export default class Exam extends Component {

    examService = new ExamService();

    state = {
        exam: {},
        loading: true
    }

    constructor(props) {
        super(props);
        this.getExam();
    }

    getExam() {
        this.examService
            .byId(this.props.examId || 1) // TODO: remove 1
            .then(this.onExamUpdate)
            .catch(this.onError);
    }

    onExamUpdate = (exam) => {
        this.setState({
            exam,
            loading: false
        });
    }

    onError = (err) => {
        this.setState({
            error: true,
            loading: false
        });
    };

    render() {
        const {exam, loading, error} = this.state;

        const hasData = !(loading || error);

        const errorMessage = error ? <ErrorIndicator/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = hasData ? <ExamView exam={exam}/> : null;

        return (
            <div className="exam jumbotron rounded">
                {errorMessage}
                {spinner}
                {content}
            </div>
        )
    }
}

const ExamView = ({exam}) => {

    const {description, img, language, test, tags, title, year} = exam;

    const descriptionView = description ? <DescriptionView description={description}/> : null;
    const tagsView = <TagsView tags={tags}/>

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
                <button className="btn btn-primary">Random question</button>
            </div>
        </div>
    </React.Fragment>
};

const DescriptionView = ({description}) => {
    return <React.Fragment>
        <li className="list-group-item">
            <span className="term">Description</span>
            <span>{description}</span>
        </li>
    </React.Fragment>
}

const TagsView = ({tags}) => {
    const resultTags = [];

    if (tags) {
        tags.forEach(tag => {
            resultTags.push(<button key={tag.tag + "tag"} className="btn btn-secondary btn-tag">{tag.tag}</button>);
        })
    }

    return <React.Fragment>
        <li className="list-group-item">
            <span className="term">Tags</span>
            <span>{resultTags}</span>
        </li>
    </React.Fragment>
}