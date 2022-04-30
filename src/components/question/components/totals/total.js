import './total.css';
import React from 'react';

const Total = ({questionNumber, correctAnswers, wrongAnswers}) => {
    return (
        <React.Fragment>
            <div className="m-top">
                <div className="statistic">
                    <div>Totals:</div>
                    <div>questions: {questionNumber}</div>
                    <div>correct: {correctAnswers}</div>
                    <div>wrong: {wrongAnswers}</div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Total;