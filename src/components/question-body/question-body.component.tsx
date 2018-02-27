import * as React from 'react';
import { QuestionModel } from '../../models/question.model';
import './question-body.css';
import { QuestionModelModel, ModelType } from '../../models/question-model.model';
import { observer } from 'mobx-react';
import { QuestionModelOption } from '../../models/question-model-option.model';

export const QuestionbodyComponent = observer((props) => {
    const question: QuestionModel = props.question;
    const modelHash = question.variableList.reduce((ac, model) => {
        ac[model.name] = model;
        return ac;
    }, {});
    const setOneSelected = (idx: number, options: QuestionModelOption[]) => {
        options.forEach(option => option.setSelected(false) );
        options[idx].setSelected(true);
    };
    const getOneSelected = (options: QuestionModelOption[]) => {
        return options.find(opt => opt.selected)!.name;
    }
    const getElement = (model: QuestionModelModel) => {
        switch(model.type){
            case ModelType.INT:
                return (
                    <input 
                        key={model.modelId} 
                        type='number'
                        value={model.value.value} 
                        onChange={(evt) => model.value.setValue(evt.target.value) }
                    />
                )
            case ModelType.LIST_ONE:
                return (
                    <select 
                        key={model.modelId}
                        value={getOneSelected(model.optionList!)}
                        onChange={(evt) => { 
                            model.value.value = evt.target.value;
                            setOneSelected(evt.target.selectedIndex, model.optionList!);
                            }
                        }>
                        {model.optionList!.map(opt => 
                        <option
                            key={opt.optionId} 
                            value={opt.name}>{opt.description}
                        </option>) }
                    </select>
                )
            case ModelType.LIST_MULT:
                return (
                    <div 
                        key={model.modelId} 
                        style={{
                            display:'flex',
                            flexDirection: 'column',
                            flexWrap: 'wrap',
                            height: '200px'
                        }}>
                        {model.optionList!.map(opt => 
                            <label key={opt.optionId}>
                                <input 
                                    checked={opt.selected}
                                    type='radio'
                                    onClick = {(evt) => {
                                        opt.setSelected();
                                        model.setValues();
                                    }}
                                    onChange={(evt)=> evt }
                                />
                                {opt.description}
                            </label>
                        )}
                    </div>
                )
            default:
                return <input type="text" key={model.modelId}/>
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
                    return (
                        <span 
                            key={key}
                            style={{background:'red'}}>
                            MODEL NOT FOUND
                        </span>);
                    } else {
                        return (<span key={part}>{part}</span>)
                    }
                })
            }
        </div>
    )
});