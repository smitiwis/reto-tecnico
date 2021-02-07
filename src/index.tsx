import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import './assets/styles/index.scss';
import "./assets/styles/normalize/normalize.scss";
import "./assets/styles/style.scss"
import Router from './Router/Router';

ReactDOM.render(
  <React.StrictMode>
    <div className="contenedor">
      <Router />
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
