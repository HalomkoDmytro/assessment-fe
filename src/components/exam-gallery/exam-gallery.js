import React, {Component} from "react";
import './exam-gallery.css'
import ExamService from "../../service/exam-service";
import Spinner from "../spinner";
import {Link} from "react-router-dom";

export default class ExamGallery extends Component {

    examService = new ExamService();

    state = {
        exams: [],
        loading: true,
        offset: 0,
        limit: 10
    }

    constructor(props) {
        super(props);
        this.getExams(this.getPaging());
    }

    getPaging(offset, limit) {
        return {
            offset: offset || this.state.offset,
            limit: limit || this.state.limit
        };
    }

    scrollHandler = (e) => {
        // TODO: implement
    }

    getExams(paging) {
        this.examService
            .getAll(paging)
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
                <Link to="/exam">
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