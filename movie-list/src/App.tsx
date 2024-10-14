import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import MoviePage from './pages/moviePage';
import HomePage from './pages/homePage';
import AddPage from './pages/addPage';
import { useAuth, AuthProvider } from './context/AuthContext'; 
import './App.css';
const ProtectedRoute: React.FC<{ element: JSX.Element }> = ({ element }) => {
    const { isAuthenticated } = useAuth(); // Obtém o estado de autenticação do contexto

    return isAuthenticated ? element : <Navigate to="/login" />;
};
const App: React.FC = () => {
    return (
        <AuthProvider> {/* Envolvendo a aplicação com o AuthProvider */}
            <Router>
                <div className="App">
                    <Routes>
                        {/* Rotas públicas */}
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/login" element={<LoginPage />} />

                        {/* Rotas protegidas */}
                        <Route path="/home" element={<ProtectedRoute element={<HomePage />} />} />
                        <Route path="/movies" element={<ProtectedRoute element={<MoviePage />} />} />
                        <Route path="/addMovie" element={<ProtectedRoute element={<AddPage />} />} />

                        {/* Rota padrão */}
                        <Route path="*" element={<ProtectedRoute element={<LoginPage />} />} />
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
};

export default App;