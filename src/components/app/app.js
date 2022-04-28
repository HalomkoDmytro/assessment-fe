import React from 'react';

import Header from '../header';

import './app.css';
import Exam from "../exam";
import ExamGallery from "../exam-gallery";
import {BrowserRouter, Route} from "react-router-dom";
import Question from "../question";


const App = () => {
    return (
        <div className="assessment-app">
            <BrowserRouter>
                <div>
                    <Header/>
                    <Route path="/" exact component={ExamGallery}/>
                    <Route path="/exam/:id" exact component={({match}) => {
                        const {id} = match.params;
                        return <Exam examId={id}/>;
                    }
                    }/>
                    <Route path="/exam/:id/random" component={({match}) => {
                        const {id} = match.params;
                        return <Question examId={id}/>;
                    }
                    }/>
                </div>
            </BrowserRouter>
        </div>
    );
};

export default App;