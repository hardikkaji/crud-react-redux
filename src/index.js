import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/App.jsx';
import registerServiceWorker from './registerServiceWorker';
import thunk from "redux-thunk";
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './rootReducer';
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import  'jquery';
import 'popper.js';
import 'bootstrap/dist/js/bootstrap';

const store = createStore(
	rootReducer,
	composeWithDevTools(
		applyMiddleware(thunk)
	)
);

ReactDOM.render(
	<BrowserRouter>
		<Provider store={store}>
			<App />
		</Provider>
	</BrowserRouter>
	, document.getElementById('root'));
registerServiceWorker();
