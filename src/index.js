import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {createStore} from 'redux';
import {BrowserRouter} from 'react-router-dom';
import reducer from './store/reducer';
import {Provider} from 'react-redux';
import 'semantic-ui-css/semantic.min.css';

const store = createStore(reducer);

ReactDOM.render(( 
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
), document.getElementById('root'));
registerServiceWorker();