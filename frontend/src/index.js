import React from 'react';
import ReactDOM from 'react-dom/client';
import Login from './pages/Login';
import App from './App';
import Auth from './layouts/Auth';
import Guest from './layouts/Guest';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import Register from './pages/Register';
import Dashboard from './pages/Dahboard';
import StatusComment from './pages/StatusComment';
import UserStatus from './pages/UserStatus';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <BrowserRouter>
      <Routes>
      <Route
          path="/"
          element={
            <Guest >
              <Login />
            </Guest>
          }
        />
        <Route
          path="/register"
          element={
            <Guest title="register">
              <Register />
            </Guest>
          }
        />
         <Route
          path="/Dashboard"
          element={
            <Auth >
              <Dashboard />
            </Auth>
          }
        />
         <Route
          path="/status/:id"
          element={
            <Auth >
              <StatusComment />
            </Auth>
          }
        />
         <Route
          path="/mystatus"
          element={
            <Auth >
              <UserStatus />
            </Auth>
          }
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
