import * as React from 'react';
import { QuestionbodyComponent } from '../../components/question-body/question-body.component';
import { ButtonBar } from '../../components/button-bar/button-bar.component';
import { observer } from 'mobx-react';

export const QuestionContentComponent = observer((props) => {
    const { order, question, setup, requiredToProceed, answered} = props.currentQuestion;
    return (
        <div className={"question-view " + props.classState }>
            <div className="question-container">
                <p className="question-num">{ 'Question: '+ order}</p>
                <p className="question-header">{question}</p>
                <QuestionbodyComponent question={props.currentQuestion} />
                <p className="question-setup">{setup}</p>
            </div>
            <ButtonBar 
                next={props.next} 
                previous={props.previous} 
                cantSkip={requiredToProceed}
                answered={answered}
            />
        </div>
    )
});