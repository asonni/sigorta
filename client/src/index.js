import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import registerServiceWorker, { unregister } from './registerServiceWorker';

// Styles
// Import Font Awesome Icons Set
import 'font-awesome/css/font-awesome.min.css';
// Import Simple Line Icons Set
import 'simple-line-icons/css/simple-line-icons.css';
// import 'semantic-ui-css/components/loader.min.css';
// import 'semantic-ui-css/components/loader.min.css';
// import 'semantic-ui-css/components/dropdown.min.css';
// import 'semantic-ui-css/semantic.min.css';
// import 'react-select/dist/react-select.css';
import 'react-widgets/dist/css/react-widgets.css';
// Import Main styles for this application
import './assets/css/main.css';
// Temp fix for reactstrap
import './assets/css/_dropdown-menu-right.css';
import './assets/css/custom.css';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
unregister();
