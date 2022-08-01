import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import HomePage from './pages/Homepage'
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}/>
      <Route path="/home" element={<HomePage />}/>
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);
