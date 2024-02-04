import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Routes } from './routes';

// biome-ignore lint/style/noNonNullAssertion: boilerplate code, root element exists in index.html
ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Routes />
	</React.StrictMode>,
);
