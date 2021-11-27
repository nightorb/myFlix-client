import React from 'react';
import ReactDOM from 'react-dom';
import { Container } from 'react-bootstrap';

import MainView from './components/main-view/main-view';

// import statement to indicate that index.scss needs to be bundled
import './index.scss';

// main component which uses all the others
class MyFlixApplication extends React.Component {
  render() {
    return (
      <Container className="px-0" fluid>
        <MainView />
      </Container>
    );
  }
}

// finds root of app
const container = document.getElementsByClassName('app-container')[0];

// tells React to render app in root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);
