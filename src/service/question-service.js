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
            .then((body) => console.log("res: ", body))
            .catch((e) => console.error(e));
    }

    async getRandomQuestionByEamId(id) {
        return this.getResource(`/exams/${id}/random`)
            .then((body) => console.log("res: ", body))
            .catch((e) => console.error(e));
    }

}
