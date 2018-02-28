import { runInAction } from 'mobx';
import { QuestionModelValue } from './question-model-value.model';
import { kebabToCamel } from '../utils/model.util';
import { QuestionModelOption } from './question-model-option.model';

export const ModelType = {
    LIST_ONE: 'LIST_SELECT_ONE',
    LIST_MULT: 'LIST_SELECT_MULTIPLE',
    INT: 'INTEGER',
    ALGORITHM: 'ALGORITHM'
};
export const SourceType = {
    CLIENT: 'CLIENT'
};
export class QuestionModelModel {
    modelId: number;
    name: string;
    description: string;
    source: string;
    type: string;
    global: boolean;
    value: QuestionModelValue = new QuestionModelValue();
    _values: number[];
    optionList?: QuestionModelOption[]
    constructor(data: any) {
        const skipValues = ['option-list', 'value'];
        const isSkip = (val) => skipValues.indexOf(val) === -1;
        for(let p of Object.keys(data)) {
            if (isSkip(p)) {
                this[kebabToCamel(p)] = data[p];
            } else if (!isSkip(p) && p === skipValues[0]) {
                this.optionList = data[skipValues[0]]
                    .map(val => new QuestionModelOption(val) );
            }
        }       
    }
    setValues() {
        if (this.optionList) {
            this._values = this.optionList
                .filter(opt => opt.selected)
                .map(opt => opt.optionId);
            runInAction(() => this.value.value = this._values.join(' '));
        }
    }

}