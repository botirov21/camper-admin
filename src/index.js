import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import MotorComponent from './components/pages/motor';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SideBar from './components/sidebar';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <SideBar/>
      <Routes>
        <Route path="/motor" element={<MotorComponent />} />
      </Routes>
    </BrowserRouter> 
  </React.StrictMode>
);

