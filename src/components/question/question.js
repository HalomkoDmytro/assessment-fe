import React, { Component } from 'react';
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
        console.log("get question");
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
        console.log(question);
        this.setState({
            question,
            loading: false
        })
    }


    getAnswers(question) {
        return null;
    }

    getQuestionView = (question) => {
        let answers = this.getAnswers(question);

        return <React.Fragment>
            <div>
                {question.text}
            </div>
            <div>
                {answers}
            </div>
        </React.Fragment>
    }

    render() {
        const {question, loading, error} = this.state;
        const hasData = !(loading || error);

        const errorMessage = error ? <ErrorIndicator/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = hasData ? <QuestionView quesiton={question}/> : null;


        return (
            <React.Fragment>
                {errorMessage}
                {spinner}
                {QuestionView}
            </React.Fragment>
        )
    }

}