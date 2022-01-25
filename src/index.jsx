import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux'
import movieApp from './reducers/reducers';
import { devToolsEnhancer } from 'redux-devtools-extension';
import { Container } from 'react-bootstrap';

import MainView from './components/main-view/main-view';

// import statement to indicate that index.scss needs to be bundled
import './index.scss';

const store = createStore(movieApp, devToolsEnhancer());

// main component which uses all the others
class MyFlixApplication extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Container className="px-0" fluid>
          <MainView />
        </Container>
      </Provider>
    );
  }
}

// finds root of app
const container = document.getElementsByClassName('app-container')[0];

// tells React to render app in root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);
