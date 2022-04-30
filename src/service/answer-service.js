export default class AnswerService {

    _answerBaseApi = 'http://localhost:8081/answers';

    async postResource(url, data) {
        const res = await fetch(`${this._answerBaseApi}${url}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, received ${res.status}`)
        }
        return await res.json();
    }

    async checkAnswer(answerData) {
        return this.postResource(`/check`, answerData);
    }

}