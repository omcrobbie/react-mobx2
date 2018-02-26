import * as React from 'react';
import './App.css';
import { QuestionComponent } from './containers/question/question.component';
import { Provider } from 'mobx-react';
import questionStore from './stores/question.store';
const stores = { questionStore};
class App extends React.Component {
  constructor(public props) {
    super(props);
  }
  // componentWillMount() {
  //   this.props.questionStore.getQuestions(0)
  //     .then(data => console.log(data));
  // }
  render() {
    return (
      <Provider {...stores}>
        <QuestionComponent />
      </Provider>
    );
  }
}
export default App;
