import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import HomePage from './pages/Homepage'
import {
  HashRouter,
  Route,
  Routes
} from "react-router-dom";


ReactDOM.render(
  <HashRouter>
    <Routes>
      <Route path="/" element={<App />}/>
      <Route path="/home" element={<HomePage />}/>
    </Routes>
  </HashRouter>,
  document.getElementById('root')
);
