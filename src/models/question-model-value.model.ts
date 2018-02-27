import { observable, action } from "mobx";


export class QuestionModelValue {
    clientId: number;
    timestamp: number;
    @observable value: string = '';
    validated: boolean = false;

    @action
    setValue(val) {
        this.timestamp = new Date().getTime();
        this.value = val;
    }
}