import React from 'react';

import Header from '../header';

import './app.css';
import Exam from "../exam";
import ExamGallery from "../exam-gallery";
import {BrowserRouter, Route} from "react-router-dom";
import Question from "../question";
import About from "../about";


const App = () => {
    return (
        <div>
            <BrowserRouter>
                <React.Fragment>
                    <Header/>

                    <div className="assessment-app">
                        <Route path="/" exact component={ExamGallery}/>

                        <Route path="/about" exact component={About}/>

                        <Route path="/exam/:id" exact component={
                            ({match}) => {
                                const {id} = match.params;
                                return <Exam examId={id}/>;
                            }
                        }/>

                        <Route path="/exam/:id/random" component={
                            ({match}) => {
                                const {id} = match.params;
                                return <Question examId={id}/>;
                            }
                        }/>
                    </div>
                </React.Fragment>
            </BrowserRouter>
        </div>
    );
};

export default App;