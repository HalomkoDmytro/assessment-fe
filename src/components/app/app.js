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
                    <Route path="/" element={<ExamGallery/>}/>
                    <Route path="/exam" element={<Exam />}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;