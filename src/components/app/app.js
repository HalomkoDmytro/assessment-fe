import React from 'react';

import Header from '../header';

import './app.css';
import Exam from "../exam";
import ExamGallery from "../exam-gallery";
import {
    BrowserRouter,
    // Routes,
    Route,
    Link
} from "react-router-dom";


const App = () => {
    return (
        <div className="assessment-app">
            <BrowserRouter>
                <div>
                    <Header/>
                    {/*<Exam/>*/}
                    {/*<Routes>*/}

                    <Route path="/" exact component={ExamGallery}/>
                    {/*<Route path="/" exact element={<ExamGallery/>}/>*/}
                    <Route path="/exam/:id" component={({match}) => {
                        console.log("match", match)
                        const {id} = match.params;
                        return <Exam examId={id}/>;
                    }
                    }/>
                    <Route path="/exam/:id/:questionId" element={({match}) => {
                        const {id, questionId} = match.params;
                        return <React.Fragment/>;
                    }
                    }/>
                    {/*</Routes>*/}
                </div>
            </BrowserRouter>
        </div>
    );
};

export default App;