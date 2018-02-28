import { QuestionModelModel } from './question-model.model';
import { kebabToCamel } from "../utils/model.util";
import { observable, autorun, computed, runInAction } from 'mobx';

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
        //Test if the template string contains the same keys as the model
        const templateKeys = this.template.match(/(?!<)\S+(?=>)/g);
        if (templateKeys) {
            this.variableList = this.variableList.filter(model => {
                const condition = templateKeys.find(key => model.name === key);
                if (!condition) {
                    this.showWarning(`key '${model.name}' does not exist in template string`);
                }
                return condition;
            });
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
    showWarning(msg) {
        console.warn(`Question: ${this.order}: `, msg);
    }
}