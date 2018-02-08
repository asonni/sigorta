import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

// Styles
// Import Font Awesome Icons Set
import 'font-awesome/css/font-awesome.min.css';
// Import Simple Line Icons Set
import 'semantic-ui-css/components/loader.min.css';
import 'simple-line-icons/css/simple-line-icons.css';
// Import Main styles for this application
import './assets/css/main.css';
// Temp fix for reactstrap
import './assets/css/_dropdown-menu-right.css';
import './assets/css/custom.css';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
registerServiceWorker();
