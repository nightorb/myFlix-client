import React from 'react';
import ReactDOM from 'react-dom';

// import statement to indicate that index.scss needs to be bundled
import './index.scss';

// main component which uses all the others
class MyFlixApplication extends React.Component {
  render() {
    return (
      <div className="my-flix">
        <div>Good night</div>
      </div>
    );
  }
}

// finds root of app
const container = document.getElementsByClassName('app-container')[0];

// tells React to render app in root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);