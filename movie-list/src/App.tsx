import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import MoviePage from './pages/moviePage';
import HomePage from './pages/homePage';
import AddPage from './pages/addPage';

import './App.css';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!localStorage.getItem('token'));

  // Função para verificar o token no localStorage ao iniciar a aplicação ou quando o estado mudar
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token); // Atualiza o estado se houver token
  }, []);

  const handleLoginSuccess = () => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage onLoginSuccess={handleLoginSuccess} />} />
          <Route path="/home" element={isAuthenticated ? <HomePage /> : <Navigate to="/login" />} />
          <Route path="/movies" element={isAuthenticated ? <MoviePage /> : <Navigate to="/login" />} />
          <Route path="/addMovie" element={isAuthenticated ? <AddPage /> : <Navigate to="/login" />} />
          <Route path="*" element={isAuthenticated ? <HomePage /> : <Navigate to='/login' />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
