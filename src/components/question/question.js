import React, { Component } from 'react';
import QuestionService from "../../service/question-service";

import './question.css';

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
            .then(this.onQuestionUpdate);
    }

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

    render() {
        return (
            <React.Fragment>
                Question
            </React.Fragment>
        )
    }
}