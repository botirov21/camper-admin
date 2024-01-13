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
import Login from './components/pages/login/login';
import DisplaySideBar from './components/sidebar/displaySideBar';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
      <DisplaySideBar>
       <SideBar/>
      </DisplaySideBar>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/motor" element={<MotorComponent/>} />
        <Route path="/caravan" element={<CaravanComponent/>} />
        <Route path="/tuning" element={<TuningComponent/>} />
        <Route path="/usedCar" element={<UsedCarComponent/>} />
        <Route path="/users" element={<UsersComponent/>} />
      </Routes>
    </BrowserRouter> 
);

