import * as React from 'react';
import { QuestionbodyComponent } from '../../components/question-body/question-body.component';
import { ButtonBar } from '../../components/button-bar/button-bar.component';
import { observer } from 'mobx-react';
import { ProgressbarComponent } from '../../components/progres-bar';
import './question-content.css';

export const QuestionContentComponent = observer((props) => {
    const { page, question, setup, requiredToProceed, answered} = props.currentQuestion;
    const isComplete = () => {
        if (!props.complete) {
            return (
                <div>
                    <div className="question-container">
                        <p className="question-num">{ 'Question: '+ page}</p>
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
        }
        return (
            <div>COMPLETE</div>
        )
    }
    return (
        <div className={"question-view " + props.classState }>
            <ProgressbarComponent progress={props.questionsCompletePercent} />
            {isComplete()}
        </div>
    )
});