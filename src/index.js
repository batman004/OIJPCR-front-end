import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './index.css';
import './App.css';
import App from './App';
import config from './config/config';

// A snapshot build is read-only: refuse any write and any request off this origin,
// so the live API and its data can never be touched from this build.
if (config.snapshot) {
  axios.interceptors.request.use((request) => {
    const method = (request.method || 'get').toLowerCase();
    if (method !== 'get' || /^[a-z]+:\/\//i.test(request.url || '')) {
      return Promise.reject(new Error('This preview is read-only.'));
    }
    return request;
  });
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
