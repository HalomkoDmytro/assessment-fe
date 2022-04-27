import React from 'react';

import Header from '../header';

import './app.css';
import Exam from "../exam";
import ExamGallery from "../exam-gallery";
import {BrowserRouter, Route, Routes} from 'react-router-dom';


const App = () => {
    return (
        <div className="assessment-app">
            <BrowserRouter>
                <Header/>
                {/*<Exam/>*/}
                <Routes>
                    <Route path="/" exact element={<ExamGallery/>}/>
                    <Route path="/exam/:id" element={({match}) => {
                        const {id} = match.params;
                        return <Exam examId={id}/>;
                    }}/>
                    <Route path="/exam/:id/:questionId" element={({match}) => {
                        const {id, questionId} = match.params;
                        return <React.Fragment/>;
                    }
                    }/>
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;