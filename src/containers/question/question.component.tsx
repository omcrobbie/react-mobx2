import * as React from "react";
import './question.css';
import { ButtonBar } from "../../components/button-bar/button-bar.component";
import { inject, observer } from "mobx-react";
import { QuestionStore } from "../../stores/question.store";

@inject('questionStore')
@observer
export class QuestionComponent extends React.Component<{questionStore?: QuestionStore},{}> {
   
    render() {
        this.props.questionStore
        return (
            <div className="question-view">
                <div className="question-container">
                    <p className="question-num"></p>
                    <p className="question-header"></p>
                    <p className="question-body"></p>
                </div>
                <ButtonBar/>
            </div>
        );
    }
}