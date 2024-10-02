import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import MoviePage from './pages/moviePage';
import HomePage from './pages/homePage'
import './App.css';

const App: React.FC = () => {
  const isAuthenticated = localStorage.getItem('token');
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path='/home' 
            element={isAuthenticated ? <HomePage /> : <Navigate to="/login" />} />
          <Route
            path="/movies"
            element={isAuthenticated ? <MoviePage /> : <Navigate to="/login" />}
          />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
