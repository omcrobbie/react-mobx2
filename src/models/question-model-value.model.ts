

export class QuestionModelValue {
    clientId: number;
    timestamp: number;
    _value: string;
    validated: boolean = false;

    set value(val) {
        this.timestamp = new Date().getTime();
        this._value = val;
    }
    get value() {
        return this._value
    }
}