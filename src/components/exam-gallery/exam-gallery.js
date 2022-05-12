import React, {Component} from "react";
import './exam-gallery.css'
import ExamService from "../../service/exam-service";
import Spinner from "../spinner";
import {Link} from "react-router-dom";

export default class ExamGallery extends Component {

    examService = new ExamService();

    state = {
        exams: [],
        loading: true
    }

    constructor(props) {
        super(props);
        if(this.state.exams && this.state.exams.length > 0) {
            this.onExamsUpdate(this.state.exams);
        } else {
            this.getExams();
        }
    }

    getExams() {
        this.examService
            .getAll()
            .then(this.onExamsUpdate);
    }

    onExamsUpdate = (exams) => {
        this.setState((state) => {
            return {
                exams: state.exams.concat(exams),
                loading: false
            }
        });
    }

    getTableBodyContent = () => {
        const rows = [];

        const {exams} = this.state;
        if (exams && exams.length > 0) {
            exams.forEach(exam => {
                rows.push(this.examMenuItem(exam))
            })
        }

        return rows;
    }

    examMenuItem(exam) {
        return <tr key={exam.id}>
            <td>
                <Link to={`/exam/${exam.id}`}>
                {exam.title}
                /
                {exam.year}
                </Link>
            </td>
        </tr>;
    }

    render() {
        const {loading} = this.state;

        const spinner = loading ? <Spinner/> : null;

        const rows = this.getTableBodyContent();

        return (
            <div className="menu-table">

                <table className="table">
                    <thead>
                    <tr>
                        <th/>
                    </tr>
                    </thead>

                    <tbody>
                    {rows}
                    </tbody>
                </table>
                {spinner}

            </div>
        )
    }
}