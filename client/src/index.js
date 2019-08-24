import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
// import allReducers from './reducer/AllReducer'
// import {createStore} from 'redux';
import {Provider} from 'react-redux';
import Store from './store/Store'







ReactDOM.render(
    <Provider store={Store}>
        <App />
    </Provider>, 
    document.getElementById('root'));
serviceWorker.unregister();
