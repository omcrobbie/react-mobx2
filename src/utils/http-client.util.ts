import { ModelType } from './../models/question-model.model';
import { QuestionModel } from '../models/question.model';

async function httpClient(url: string, method: string, body: any = {}) {
    const res = await fetch(`http://34.216.109.58:8080/v1/${url}`, {
        method,
        body,
        headers: new Headers({
            //'api-key': '4275578e2e3e4f179b92773b1717eea8',
            'app-secret': '80ddbdaa90634a75975168cb9b04c6f5',
            'token': '59ae89f11e7e495b8bb8619b80ac2ca2'
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