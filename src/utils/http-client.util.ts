import { ModelType } from './../models/question-model.model';
import { QuestionModel } from '../models/question.model';

async function httpClient(url: string, method: string, body: any = {}) {
    const {
        REACT_APP_BASE_API_URL, // env variables must be prefixed with REACT_APP_
        REACT_APP_API_SECRET, 
        REACT_APP_API_TOKEN
    } = process.env;
    const res = await fetch(`${REACT_APP_BASE_API_URL}/${url}`, {
        method,
        body,
        headers: new Headers({
            'app-secret': REACT_APP_API_SECRET!,
            'token': REACT_APP_API_TOKEN!
            }
        )
    });
    return res.json();
}
export function sendAnswersService(clientId: number, questions: QuestionModel[]) {
    const values = {};
    for (const question of questions) {
        for( const model of question.variableList)
            if (model.type !== ModelType.LIST_MULT) {
                values[model.name] = model.value.value; 
            } else {
                values[model.name] = model._values;
            }
    }
    console.log(values);
    // to send the data to the actual api
    //return httpClient(`clients/${clientId}/model/values`, 'POST', values)
}
export function fetchQuestionsService() {
    const clientId = 0; // In production, this value will need to come from elsewhere (probably url)
    return httpClient(`clients/${clientId}/questionnaire`, 'GET');
}