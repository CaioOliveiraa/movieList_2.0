import React from 'react'
import './styles/homePage.css'

const HomePage: React.FC = () => {

    return(
        <div className='home-page'>
            <h1>CINEMINHA</h1>
            <div>
                <a href="/movies">QUERO ASSISTIR</a>
                <a href="/addMovie">QUERO ADICIONAR</a>
            </div>
        </div>


    )
}


export default HomePage;
