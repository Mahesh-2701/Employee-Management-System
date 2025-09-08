import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Empinsert from './empinsert';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import Insertpage from './insertpage';
import View from './View';
import Update from './Update';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Routes>
      <Route exact path="/" element={<App></App>}></Route>
      <Route exact path="/insert" element={<Insertpage></Insertpage>}></Route>
      <Route exact path="/view/:emp_id" element={<View></View>}></Route>
      <Route exact path="/update/:emp_id" element={<Update></Update>}></Route>
    </Routes>
  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
