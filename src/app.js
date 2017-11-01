import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import 'bootstrap-css-only';
import Routes from './components/utility/Routes';
import Navbar from './components/utility/Navbar';
import 'font-awesome/css/font-awesome.css';
import './scss/style.scss';

class App extends React.Component {

  state = {
    currentUser: {}
  }

  render() {
    return (

      <BrowserRouter>
        <div>
          <Navbar />
          <div className="container">

            <Routes/>

          </div>
        </div>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
