import * as React from 'react';
import { QuestionModel } from '../../models/question.model';
import './question-body.css';
import { QuestionModelModel, ModelType } from '../../models/question-model.model';
import * as ReactDOM from 'react-dom';
import { observer } from 'mobx-react';

export const QuestionbodyComponent = observer((props) => {
    const question: QuestionModel = props.question;
    const modelHash = question.variableList.reduce((ac, model) => {
        ac[model.name] = model;
        return ac;
    }, {});
    const getElement = (model: QuestionModelModel) => {
        switch(model.type){
            case ModelType.INT:
                return (
                    <input 
                        key={model.modelId} 
                        type='number'
                        value={model.value.value} 
                        onChange={(evt) => model.value.setValue(evt.target.value) }/>
                )
            case ModelType.LIST_ONE:
                return (
                    <select 
                        key={model.modelId}
                        onChange={(evt) => model.value.value = evt.target.value}>
                        {model.optionList!.map(opt => 
                        <option
                            key={opt.optionId} 
                            selected={opt.selected} 
                            value={opt.name}>{opt.description}
                        </option>) }
                    </select>
                )
            default:
                return <input key={model.modelId}/>
        }
    }
    const parts = question.template
        .split(/(<\S+>)/)
        .filter(p => p);
    return (
        <div>
            {
                parts.map((part) => {
                    if (part.match(/<\S+>/)) {
                        const key = /<(\S+)>/.exec(part)![1];
                        const model = modelHash[key];
                        if (model) {
                            return getElement(model);
                        }
                        return <span key={key}>NOT FOUND</span>;
                    } else {
                        return (<span key={part}>{part}</span>)
                    }
                })
            }
        </div>
    )
});