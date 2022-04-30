import React, {Component} from 'react';
import QuestionService from "../../service/question-service";

import './question.css';
import ErrorIndicator from "../error-indicator";
import Spinner from "../spinner";

export default class Question extends Component {

    questionService = new QuestionService();

    state = {
        question: {},
        loading: true,
        selectedAnswer: []
    }

    constructor(props) {
        super(props);
        this.getQuestion();
    }

    getQuestion = () => {
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

        const answerOptionsArr = [];

        if (answers && answers.length > 0) {
            if (multipleCorrect) {
                answers.forEach(ans => {
                    answerOptionsArr.push(
                        <li className="list-group-item" key={ans.id}>
                            <div className="form-check">
                                <input type="checkbox"
                                       className="form-check-input"
                                       onChange={() => this.handleMultChoice(ans.id)}/>
                                <label className="form-check-label">
                                    {ans.text}
                                </label>
                            </div>
                        </li>)
                })
                return <ul className="list-group list-group-flush">
                    {answerOptionsArr}
                </ul>
            } else {
                answers.forEach(ans => {
                    answerOptionsArr.push(
                        <div key={'k' + ans.id} className="form-check">
                            <label className="form-check-label">
                                <input type="radio"
                                       className="form-check-input"
                                       name="ansOptRadio"
                                       id={ans.id}
                                       onChange={() => this.handleSingleChoice(ans.id)}/>
                                {ans.text}
                            </label>
                        </div>
                    )
                })
                return <fieldset>
                    {answerOptionsArr}
                </fieldset>
            }
        }
    }

    handleSingleChoice = (ansId) => {
        this.setState({selectedAnswer: [ansId]})
    }

    handleMultChoice = (ansId) => {
        let selectedAnswer = this.state.selectedAnswer;
        if (selectedAnswer.includes(ansId)) {
            selectedAnswer.splice(selectedAnswer.indexOf(ansId), 1);
        } else {
            selectedAnswer.push(ansId);
        }
        this.setState({selectedAnswer});
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

    checkAnswerBtnHandler = () => {
        console.log("answers: ", this.state.selectedAnswer);
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
                <button type="button" className="btn btn-success" onClick={this.checkAnswerBtnHandler}>Check answer
                </button>
                <button type="button" className="btn btn-danger" onClick={this.getQuestion}>Next</button>
            </React.Fragment>
        )
    }

}