import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import MotorComponent from './components/pages/motor';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SideBar from './components/sidebar';
import CaravanComponent from './components/pages/caravan';
import TuningComponent from './components/pages/tuning';
import UsedCarComponent from './components/pages/usedCar';
import UsersComponent from './components/pages/users';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <SideBar/>
      <Routes>
        <Route path="/motor" element={<MotorComponent/>} />
      </Routes>
      <Routes>
        <Route path="/caravan" element={<CaravanComponent/>} />
      </Routes>
      <Routes>
        <Route path="/tuning" element={<TuningComponent/>} />
      </Routes>
      <Routes>
        <Route path="/usedCar" element={<UsedCarComponent/>} />
      </Routes>
      <Routes>
        <Route path="/users" element={<UsersComponent/>} />
      </Routes>
    </BrowserRouter> 
  </React.StrictMode>
);

