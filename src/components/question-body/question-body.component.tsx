import * as React from 'react';
import { QuestionModel } from '../../models/question.model';
import './question-body.css';
import { QuestionModelModel, ModelType } from '../../models/question-model.model';
import * as ReactDOM from 'react-dom';
import { observer } from 'mobx-react';
@observer
export class QuestionbodyComponent extends React.Component<any> {
    node: Element;
    componentDidMount() {
        this.node = ReactDOM.findDOMNode(this.refs.questionBody);
        this.interpolate();
    }
    componentDidUpdate() {
        
        Array.from(this.node.children).forEach(child => ReactDOM.findDOMNode(child).remove());
        this.interpolate();
    }
    interpolate() {
        const question: QuestionModel = this.props.question;
        const modelHash = question.variableList.reduce((ac, model) => {
            ac[model.name] = model;
            return ac;
        }, {});
        const symbols = question.template.match(/(?!<)(\S+)(?=>)/g);
        const parts = question.template.split(/\<\S+\>/).filter(p => p);
        const node = ReactDOM.findDOMNode(this.refs.questionBody);
        for(const part of parts) {
            const text = document.createElement('span');
            text.innerHTML = part;
            node.appendChild(text);
            if (symbols && symbols.length) {
                const model = modelHash[symbols.shift()!];
                const modelNode = this.getElement(model || {type:null});
                node.appendChild(modelNode as Node);
            }
        }
    }
    getElement(model: QuestionModelModel) {
        switch(model.type){
            case ModelType.INT:
                let inputElem = React.createElement('input', {type: 'number'});
                inputElem.props.onChange = (evt) => console.log(evt.target.value);
                return inputElem;
            case ModelType.LIST_ONE:
                let selectElem = React.createElement('select');
                return selectElem;
            default:
                return React.createElement('input');
        }
    }
    render() {
        return (
            <div ref="questionBody">
            </div>
        )
    }
}