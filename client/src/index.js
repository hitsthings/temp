import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { fetchApi } from './api';
import makeStore from './store/store';

fetchApi('/login')
    .then(({user}) => makeStore({
        user,
        quotes: []
    }))
    .then(store => {
        ReactDOM.render(<App store={store} />, document.getElementById('root'));
    })

//registerServiceWorker();
