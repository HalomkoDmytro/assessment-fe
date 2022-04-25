export default class QuestionService {

    _questionBaseApi = 'http://localhost:8081';

    async getResource(url) {
        const res = await fetch(`${this._questionBaseApi}${url}`);
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, received ${res.status}`)
        }
        return await res.json();
    }

    async getQuestion(id) {
        return this.getResource(`/questions/${id}`)
            .then((body) => console.log("res: ", body))
            .catch((e) => console.error(e));
    }
}

// const postData = async (url = '', data = {}) => {
//     return fetch(url, {
//         method: 'POST',
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(data)
//     })
// }
//
//
// postData("http://localhost:8081/simple-assessment", {examId: 1})
//     .then((res) => res.json())
//     .then((body) => console.log(body))
//     .catch((e) => console.error(e));