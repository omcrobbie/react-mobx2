import { kebabToCamel } from "../utils/model.util";
import { observable, action } from "mobx";

export class QuestionModelOption {
    optionId: number;
    name: string;
    description: string;
    @observable selected = false;
    factor: number;
    constructor(data: any) {
        for(let p of Object.keys(data)) {
            this[kebabToCamel(p)] = data[p];
        }
    }
    @action
    setSelected(state:boolean | null = null) {
        this.selected = state !== null ? state! : !this.selected;
    }
}