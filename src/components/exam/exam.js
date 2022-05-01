import React, {Component} from "react";
import ExamService from "../../service/exam-service";
import './exam.css'
import Spinner from "../spinner";
import ErrorIndicator from "../error-indicator";
import ExamView from "./components/exam-view/exam-view";

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
            .byId(this.props.examId)
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
            <div className="exam jumbotron rounded m-top">
                {errorMessage}
                {spinner}
                {content}
            </div>
        )
    }
}