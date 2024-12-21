import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './i18n';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';

import './index.css';
import App from './App';
import WelcomePage from './WelcomePage';
import reportWebVitals from './reportWebVitals';
import Requirement_Dialog from './Requirement_Dialog';
import Recommendation from './pages/Recommendation';
import Home from './pages/Home';
import Ranking from './pages/Ranking';
import Navbar from './components/Navbar';
import { Table } from 'lucide-react';
import ModelTest from './components/ModelTest';
import { AuthProvider } from './contexts/AuthContext';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Dataset from './pages/Dataset';
import Test from './pages/Test';
import PrivateRoute from './components/PrivateRoute';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <I18nextProvider i18n={i18n}>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/welcome" element={<WelcomePage />} />
            <Route path="/requirement" element={<Requirement_Dialog />} />
            <Route path="/recommendation" element={<Recommendation />} />
            <Route path="/home" element={<WelcomePage />} />
            <Route path="/login" element={<Login />} />
            
            {/* 受保护的路由 */}
            <Route 
              path="/ranking" 
              element={
                <PrivateRoute>
                  <Ranking />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/navbar" 
              element={
                <PrivateRoute>
                  <Navbar />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/api" 
              element={
                <PrivateRoute>
                  <ModelTest />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/profile" 
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/dataset" 
              element={
                <PrivateRoute>
                  <Dataset />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/test" 
              element={
                <PrivateRoute>
                  <Test />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/ai-recommend" 
              element={
                <PrivateRoute>
                  <Recommendation />
                </PrivateRoute>
              } 
            />
          </Routes>
        </AuthProvider>
      </I18nextProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();