import { QuestionModelModel } from './question-model.model';
import { kebabToCamel } from "../utils/model.util";
import { observable, when, action, autorun, observe, computed, runInAction } from 'mobx';

export class QuestionModel {
    order: number;
    setup: string;
    question: string;
    template:string;
    requiredToProceed: boolean;
    variableList: QuestionModelModel[]
    @observable answered = false;
    constructor(data: any) {
        const skipValue = 'variable-list';
        for(let p of Object.keys(data)) {
            if (p !== skipValue) {
                this[kebabToCamel(p)] = data[p];
            } else if (p === skipValue ) {
                this.variableList = data[skipValue]
                    .map(val => new QuestionModelModel(val) );
            }
        }
        autorun(() => {
            if (this.allAnswered) {
                runInAction(() => this.answered = true);
            }
            else {
                runInAction(() => this.answered = false);
            }
        });
    }
    @computed
    get allAnswered() {
        return this.variableList.every(m => !!m.value.value);   
    }
}