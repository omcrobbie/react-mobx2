import * as React from 'react';
import './App.css';
import { QuestionComponent } from './containers/question/question.component';
import { Provider } from 'mobx-react';
import { useStrict } from 'mobx';
import questionStore from './stores/question.store';
const stores = { questionStore};
useStrict(true);
class App extends React.Component {
  constructor(public props) {
    super(props);
  }
  render() {
    return (
      <Provider {...stores}>
        <QuestionComponent />
      </Provider>
    );
  }
}
export default App;
