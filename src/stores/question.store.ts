import { observable, computed, action, runInAction } from 'mobx';
import { httpClient } from '../utils/http-client.util';
import { QuestionModel } from '../models/question.model';

const ClassState = {
    NORM: 'question-normal',
    TWEEN: 'question-tween',
    PREV: 'question-prev',
    NEXT: 'question-next'
}
export class QuestionStore {
    private _questions: QuestionModel[];
    @observable currentQuestion: QuestionModel;
    @observable isLoading: boolean = false;
    @observable classState: string = 'normal';
    private currentQuestionIdx: number;

    fetchQuestions() {
        // TODO: swap this for an actual service call
        this.setLoading(async () => {
            await this.delay(1000);
            const data = require('./question.data.json');
            const clientId = data['client-id'];
            this._questions = data['page-list'].map(question => new QuestionModel(question));
            this._questions.forEach(q => q.variableList.forEach(m => m.value.clientId = clientId));
            this.getQuestion();
        });
    }
    @action
    async setLoading(asyncFn) {
        this.isLoading = true;
        await asyncFn();
        runInAction(() => this.isLoading = false);
    }
    
    get questionCount() {
        return this._questions.length;
    }
    @action
    async setQuestion(idx, start, mid) {
        if (!this._questions[idx]) {
            return;
        }
        this.classState = start;
        //await this.delay(600);
        runInAction(() => this.classState = mid);
        this.getQuestion(idx);
        //await this.delay(10);
        runInAction(()=> this.classState = 'question-normal question-tween');
    }
    @action
    getQuestion(idx = 0) {
        this.currentQuestion = this._questions[idx];
        this.currentQuestionIdx = idx;
    }
    next = () => {
        this.setQuestion(
            this.currentQuestionIdx + 1,
            `${ClassState.PREV} ${ClassState.TWEEN}`,
            ClassState.NEXT);
        //this.getQuestion(this.currentQuestionIdx + 1);
    }
    previous = () => {
        this.setQuestion(
            this.currentQuestionIdx - 1,
            `${ClassState.NEXT} ${ClassState.TWEEN}`,
            ClassState.PREV);
        //this.getQuestion(this.currentQuestionIdx -1);
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