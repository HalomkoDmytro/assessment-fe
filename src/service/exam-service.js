export default class ExamService {

    _examBaseApi = 'http://localhost:8081/exams';

    async getResource(url) {
        const res = await fetch(`${this._examBaseApi}${url}`);
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, received ${res.status}`)
        }
        return res.json();
    }

    async postResource(url, data) {
        const res = await fetch(`${this._examBaseApi}${url}`, {
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

    async getAll() {
        return this.postResource(`/all`);
    }

    async byTag(tag) {
        return this.getResource(`/${tag}`);
    }

    async byId(id) {
        return this.getResource(`/${id}`);
    }
}