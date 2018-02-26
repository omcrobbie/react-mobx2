import { camelToKebab, kebabToCamel } from "../utils/model.util";

export class QuestionModelOption {
    optionId: number;
    name: string;
    description: string;
    selected: boolean;
    factor: number;
    constructor(data: any) {
        for(let p of Object.keys(data)) {
            this[kebabToCamel(p)] = data[p];
        }
    }
}