import { observable, computed } from 'mobx';
import { httpClient } from '../utils/http-client.util';
import { QuestionModel } from '../models/question.model';
export class QuestionStore {
    private _questions: QuestionModel[];
    @observable questions: QuestionModel[];

    constructor() {
        const data = require('./question.data.json');
        this._questions = data['page-list'].map(question => new QuestionModel(question));
        console.log(this._questions);
    }
    
    @computed get questionCount() {
        return this.questions.length;
    }
    async getQuestions(clientId:number) {
        const data = await httpClient(`/clients/${clientId}/questionnaire`, 'GET')
        this.questions = data.map((question:any) => new QuestionModel(question));
    }

}
const questionStore = new QuestionStore();
export default questionStore;