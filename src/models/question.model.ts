import { QuestionModelModel } from './question-model.model';
import { kebabToCamel } from "../utils/model.util";

export class QuestionModel {
    order: number;
    setup: string;
    question: string;
    template:string;
    requiredToProceed: boolean;
    variableList: QuestionModelModel[]
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
    }
}