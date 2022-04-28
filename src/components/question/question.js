import React, {Component} from 'react';
import QuestionService from "../../service/question-service";

import './question.css';
import ErrorIndicator from "../error-indicator";
import Spinner from "../spinner";

export default class Question extends Component {

    questionService = new QuestionService();

    state = {
        question: {},
        loading: true
    }

    constructor(props) {
        super(props);
        this.getQuestion();
    }

    getQuestion() {
        const {questionId, examId} = this.props;
        this.questionRequest(questionId, examId)
            .then(this.onQuestionUpdate)
            .catch(this.onError);
    }

    onError = (err) => {
        this.setState({
            error: true,
            loading: false
        });
    };

    questionRequest(questionId, examId) {
        if (questionId) {
            return this.questionService.getQuestion(this.props.questionId);
        } else {
            return this.questionService.getRandomQuestionByEamId(examId);
        }
    }

    onQuestionUpdate = (question) => {
        this.setState({
            question,
            loading: false
        })
    }

    getAnswerOptions(answers, multipleCorrect) {

        const answerArr = [];


        if (answers && answers.length > 0) {
            if (multipleCorrect) {
                answers.forEach(ans => {
                    answerArr.push(
                        <li className="list-group-item" key={ans.id}>
                            <div className="form-check">
                                <input type="checkbox" className="form-check-input"/>
                                <label className="form-check-label">
                                    {ans.text}
                                </label>
                            </div>
                        </li>)
                })
                return <ul className="list-group list-group-flush">
                    {answerArr}
                </ul>
            } else {
                answers.forEach(ans => {
                    answerArr.push(
                        <div key={'k'+ ans.id} className="form-check">
                            <label className="form-check-label">
                                <input type="radio"
                                       className="form-check-input"
                                       name="ansOptRadio"
                                       id={ans.id}/>
                                {ans.text}
                            </label>
                        </div>
                    )
                })
                return <fieldset>
                    {answerArr}
                </fieldset>
            }
        }
    }

    getQuestionView = (question) => {
        const {text, img, multipleCorrect, explanationAnswer, answers} = question;
        const {showExplanationAnswer} = this.state;
        const answerOptions = this.getAnswerOptions(answers, multipleCorrect);

        return <React.Fragment>
            <div>
                {question.text}
            </div>
            <div>
                {answerOptions}
            </div>
            {showExplanationAnswer && <div>{explanationAnswer}</div>}
        </React.Fragment>
    }

    render() {
        const {question, loading, error} = this.state;
        const hasData = !(loading || error) && question;

        const errorMessage = error ? <ErrorIndicator/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = hasData ? this.getQuestionView(question) : null;


        return (
            <React.Fragment>
                {errorMessage}
                {spinner}
                {content}
                <button type="button" className="btn btn-success">Check answer</button>
                <button type="button" className="btn btn-danger">Next</button>
            </React.Fragment>
        )
    }

}