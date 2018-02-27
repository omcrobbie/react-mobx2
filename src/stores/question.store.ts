import { observable, computed, action } from 'mobx';
import { httpClient } from '../utils/http-client.util';
import { QuestionModel } from '../models/question.model';
export class QuestionStore {
    private _questions: QuestionModel[];
    @observable currentQuestion: QuestionModel;
    private currentQuestionIdx: number;

    async fetchQuestions() {
        // TODO: swap this for an actual service call
        await this.delay(1000);
        const data = await Promise.resolve(require('./question.data.json'));
        this._questions = data['page-list'].map(question => new QuestionModel(question));
        this.getQuestion();
    }
    
    get questionCount() {
        return this._questions.length;
    }
    @action
    getQuestion(idx = 0) {
        if (this._questions[idx]) {
            this.currentQuestion = this._questions[idx];
            this.currentQuestionIdx = idx;
        }
    }
    next = () => {
        this.getQuestion(this.currentQuestionIdx + 1);
    }
    previous = () => {
        this.getQuestion(this.currentQuestionIdx -1);
    }
    private delay(t = 1000) {
        return new Promise(done => {
            setTimeout(() => {
                done();
            }, t);
        })
    }

}
const questionStore = new QuestionStore();
export default questionStore;