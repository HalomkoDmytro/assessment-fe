import React, {Component} from 'react';
import QuestionService from "../../service/question-service";

import './question.css';
import ErrorIndicator from "../error-indicator";
import Spinner from "../spinner";
import AnswerService from "../../service/answer-service";
import Total from "./components/totals";

export default class Question extends Component {

    questionService = new QuestionService();
    answerService = new AnswerService();

    state = {
        question: {},
        loading: true,
        selectedAnswer: [],
        questionNumber: 0,
        correctAnswers: 0,
        wrongAnswers: 0
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
            error: true, loading: false
        });
    };

    questionRequest(questionId, examId) {
        if (questionId) {
            return this.questionService.getQuestion(questionId);
        } else {
            return this.questionService.getRandomQuestionByEamId(examId);
        }
    }

    onQuestionUpdate = (question) => {
        this.setState({
            question, loading: false, explanationAnswer: null, correct: null, isOptionsWasCorrect: false
        })
    }

    getHighlightColor = (answerId, isSelected, correct) => {
        if (correct && correct.length > 0) {
            if (isSelected) {
                if (correct.includes(answerId)) {
                    return "correct";
                } else {
                    return "wrong";
                }
            } else if (correct.includes(answerId)) {
                return "should-correct";
            }
        }

        return "basic";
    }

    getAnswerOptions(answers, multipleCorrect) {

        const answerOptionsArr = [];

        if (answers && answers.length > 0) {

            const {correct, selectedAnswer} = this.state;
            const isChooseAvailable = (correct && correct.length > 0);

            if (multipleCorrect) {
                answers.forEach(ans => {
                    const color = this.getHighlightColor(ans.id, selectedAnswer.includes(ans.id), correct);
                    answerOptionsArr.push(<li className="list-group-item" key={ans.id}>
                        <div className={"form-check answer " + color}>
                            <input type="checkbox"
                                   className="form-check-input"
                                   onChange={() => this.handleMultChoice(ans.id)}
                                   disabled={isChooseAvailable}
                            />
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
                    const color = this.getHighlightColor(ans.id, selectedAnswer.includes(ans.id), correct);
                    answerOptionsArr.push(<div key={'k' + ans.id} className={"form-check answer " + color}>
                        <label className="form-check-label">
                            <input type="radio"
                                   className="form-check-input"
                                   name="ansOptRadio"
                                   id={ans.id}
                                   onChange={() => this.handleSingleChoice(ans.id)}
                                   disabled={isChooseAvailable}
                            />
                            {ans.text}
                        </label>
                    </div>)
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
        const {text, img, multipleCorrect, answers} = question;
        const {explanationAnswer} = this.state;
        const answerOptions = this.getAnswerOptions(answers, multipleCorrect);

        return <React.Fragment>
            {img && <img src={img} alt="oops, problem with load image"/>}
            <div className="question m-top">
                {text}
            </div>
            <div className="m-top">
                {answerOptions}
            </div>
            {explanationAnswer && <div className="m-top">
                <div className="explanation">{explanationAnswer}</div>
            </div>}
        </React.Fragment>
    }

    checkAnswerBtnHandler = () => {
        const {selectedAnswer, isOptionsWasCorrect} = this.state;
        if (selectedAnswer && selectedAnswer.length > 0 && !isOptionsWasCorrect) {
            this.answerService.checkAnswer({
                questionId: this.state.question.id, answerList: selectedAnswer
            }).then(this.onCheckAnswer);
        }
    }

    onCheckAnswer = (checkAnswerResponse) => {
        console.log(this.state.questionNumber)
        this.setState((state) => {
            return {
                explanationAnswer: checkAnswerResponse.description,
                correct: checkAnswerResponse.correctAnswersId,
                isOptionsWasCorrect: checkAnswerResponse.isCorrect,
                questionNumber: state.questionNumber + 1,
                correctAnswers: checkAnswerResponse.isCorrect ? state.correctAnswers + 1 : state.correctAnswers,
                wrongAnswers: checkAnswerResponse.isCorrect ? state.wrongAnswers : state.wrongAnswers + 1
            }
        });
    }

    render() {
        const {question, loading, error} = this.state;
        const {questionNumber, correctAnswers, wrongAnswers} = this.state;
        const hasData = !(loading || error) && question;

        const errorMessage = error ? <ErrorIndicator/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = hasData ? this.getQuestionView(question) : null;

        return (<React.Fragment>
            {errorMessage}
            {spinner}
            {content}

            <div className="m-top">
                <button type="button" className="btn btn-success" onClick={this.checkAnswerBtnHandler}>
                    Check answer
                </button>
                <button type="button" className="btn btn-secondary" onClick={this.getQuestion}>Next</button>
            </div>
            <Total questionNumber={questionNumber}
                   correctAnswers={correctAnswers}
                   wrongAnswers={wrongAnswers}/>
        </React.Fragment>)
    }

}