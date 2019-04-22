import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter,link,Route,Switch} from 'react-router-dom'
import asyncComponent from './js/async_component.js';

ReactDOM.render(
(
    <BrowserRouter>
        <Switch>
        {/* {懒加载app.js模块} */}
            <Route path='/' component={asyncComponent(()=>import('./App.js'))}></Route>
        </Switch>
    </BrowserRouter>
)
, document.getElementById('root'));
serviceWorker.unregister();
