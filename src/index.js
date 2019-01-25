import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Enquiry from './Enquiry'
import {BrowserRouter,Route} from 'react-router-dom';
import * as serviceWorker from './serviceWorker';



const app =(<BrowserRouter><div><Route exact path="/Enquiry/:hotelid" component={Enquiry} /><Route exact path="/" component={App} /></div></BrowserRouter>)
ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
