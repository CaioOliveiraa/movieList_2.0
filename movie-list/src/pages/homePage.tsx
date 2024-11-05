import React from 'react'
import './styles/homePage.css'
import { useAuth } from '../context/AuthContext'

const HomePage: React.FC = () => {

    const { logout } = useAuth();

    return (
        <div>
            <nav className='logout'>
                <a onClick={logout}>Logout</a>
            </nav>
            <div className='home-page'>
                <h1>CINEMINHA</h1>
                <div className='button-container'>
                    <a href="/movies">QUERO ASSISTIR</a>
                    <a href="/addMovie">QUERO ADICIONAR</a>
                </div>
            </div>
        </div>


    )
}


export default HomePage;
