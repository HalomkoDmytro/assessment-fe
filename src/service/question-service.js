export default class QuestionService {

    _questionBaseApi = 'http://localhost:8081/questions';

    async getResource(url) {
        const res = await fetch(`${this._questionBaseApi}${url}`);
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, received ${res.status}`)
        }
        return res.json();
    }

    async getQuestion(id) {
        return this.getResource(`/${id}`)
            .catch((e) => console.error(e));
    }

    async getRandomQuestionByExamId(id) {
        return this.getResource(`/exams/${id}/random`)
            .catch((e) => console.error(e));
    }

    async getNextQuestion(id) {
        return this.getResource(`/next/${id}`)
            .catch((e) => console.error(e));
    }

}
