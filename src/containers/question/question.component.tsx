import * as React from "react";
import './question.css';
import { ButtonBar } from "../../components/button-bar/button-bar.component";
import { inject, observer } from "mobx-react";
import { QuestionStore } from "../../stores/question.store";
import { LoaderComponent } from "../../components/loader/loading.component";
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
        const { currentQuestion, next, previous, isLoading, classState } = this.questionStore;
        const isDefined = (key) => !!currentQuestion ? currentQuestion[key] : '';
        return (
            <LoaderComponent predicate={isLoading}>
                <div className={"question-view " + classState }>
                    <div className="question-container">
                        <p className="question-num">{ 'Question: '+ (isDefined('order'))}</p>
                        <p className="question-header">{isDefined('question')}</p>
                        <QuestionbodyComponent question={currentQuestion} />
                        <p className="question-setup">{isDefined('setup')}</p>
                    </div>
                    <ButtonBar 
                        next={next} 
                        previous={previous} 
                        cantSkip={isDefined('requiredToProceed')}
                    />
                </div>
            </LoaderComponent>
        );
    }
}
