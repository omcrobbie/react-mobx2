import { observable, computed, action, runInAction, autorun } from 'mobx';
import { QuestionModel } from '../models/question.model';

const ClassState = {
    NORM: 'question-normal',
    TWEEN: 'question-tween',
    PREV: 'question-prev',
    NEXT: 'question-next'
}
export class QuestionStore {
    @observable private _questions: QuestionModel[];
    @observable currentQuestion: QuestionModel;
    @observable isLoading: boolean = false;
    @observable classState: string = ClassState.NORM;
    @observable questionsCompletePercent: number
    @observable complete = false;
    private currentQuestionIdx: number;

    fetchQuestions() {
        this.setLoading(async () => {
            // TODO: swap this for an actual service call
            await this.delay(1000);
            const data = require('./question.data.json');
            //
            const clientId = data['client-id'];
            runInAction(() => {
                this._questions = data['page-list']
                    .map(question => new QuestionModel(question));
            });
            this._questions
                .forEach(q => q.variableList
                .forEach(m => m.value.clientId = clientId));
            autorun(() => {
                const percent = this.percentComplete();
                console.log(percent);
                runInAction(() =>  this.questionsCompletePercent = percent);
            });
            this.getQuestion();
        });
    }
    @computed
    get questionsComplete() {
        return this._questions.filter(q => q.answered).length;
    }
    percentComplete() {
        return Math.round(this.questionsComplete / this.questionCount * 100);  
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
        if (this.questionsComplete === this.questionCount) {
            runInAction(() => this.complete = true);
        } else {
            this.setQuestion(
                this.currentQuestionIdx + 1,
                `${ClassState.PREV} ${ClassState.TWEEN}`,
                ClassState.NEXT);
        }
    }
    previous = () => {
        this.setQuestion(
            this.currentQuestionIdx - 1,
            `${ClassState.NEXT} ${ClassState.TWEEN}`,
            ClassState.PREV);
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