import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';
import { BrowserRouter } from 'react-router-dom';
import { Blog } from './blog';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<BrowserRouter>
		<Provider store={store}>
			<Blog />
		</Provider>
	</BrowserRouter>,
);
