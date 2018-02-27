import * as React from "react";
import './question.css';
import { ButtonBar } from "../../components/button-bar/button-bar.component";
import { inject, observer } from "mobx-react";
import { QuestionStore } from "../../stores/question.store";
import { LoaderComponent } from "../../components/loading.component";
import { QuestionModel } from "../../models/question.model";
import { QuestionbodyComponent } from "../../components/question-body/question-body.component";

@inject('questionStore')
@observer
export class QuestionComponent extends React.Component<{questionStore?: QuestionStore},{}> {
    questionStore: QuestionStore;
    currentQuestion: QuestionModel;
    constructor(props) {
        super(props);
        this.questionStore = this.props.questionStore as QuestionStore;
        this.currentQuestion = this.questionStore.currentQuestion;
    }
    componentWillMount() {
        this.questionStore.fetchQuestions();
    }
    
    render() {
        const { currentQuestion, next, previous } = this.questionStore;
        const isDefined = (key) => !!currentQuestion ? currentQuestion[key] : '';
        return (
            <LoaderComponent predicate={!!currentQuestion}>
                <div className="question-view">
                    <div className="question-container">
                        <p className="question-num">{ 'Question: '+ (isDefined('order'))}</p>
                        <p className="question-header">{isDefined('question')}</p>
                        <QuestionbodyComponent question={currentQuestion} />
                    </div>
                    <ButtonBar next={next} previous={previous}/>
                </div>
            </LoaderComponent>
        );
    }
}
