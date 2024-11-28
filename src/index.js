import React from 'react';
import ReactDOM from 'react-dom/client';
import { useNavigate } from 'react-router-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './i18n';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';

import './index.css';
import App from './App';
import WelcomePage from './WelcomePage';
import reportWebVitals from './reportWebVitals';
import Requirement_Dialog from './Requirement_Dialog'
import Recommendation from './pages/Recommendation'
import Home from './pages/Home'
import Ranking from './pages/Ranking'
import Navbar from './components/Navbar'
import { Table } from 'lucide-react';
import ModelTest from './components/ModelTest';
import { AuthProvider } from './contexts/AuthContext';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Dataset from './pages/Dataset';
import Test from './pages/Test';


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
          <Route path="/ranking" element={<Ranking />} />
          <Route path="/navbar" element={<Navbar />} />
          <Route path="/api" element={<ModelTest />} />
          <Route path="/login" element={<Login />} /> 
          <Route path="/profile" element={<Profile />} />
          <Route path="/dataset" element={<Dataset />} />
          <Route path="/test" element={<Test />} />
          <Route path="/ai-recommend" element={<Recommendation />} />
          
      
          {/* 未来的路由 */}
          {/* <Route path="/profile" element={<Profile />} /> */}
          {/* <Route path="/settings" element={<Settings />} /> */}
          {/* <Route path="/about" element={<About />} /> */}
        </Routes>
        </AuthProvider>
      </I18nextProvider>
    </BrowserRouter>
  </React.StrictMode>
 );
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();





