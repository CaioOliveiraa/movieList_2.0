import React from 'react'
import './styles/homePage.css'

const homePage: React.FC = () => {

    return(
        <div className='home-page'>
            <h1>CINEMINHA</h1>
            <div>
                <a href="/movies">QUERO ASSISTIR</a>
                <a href="/add">QUERO ADICIONAR</a>
            </div>
        </div>


    )
}


export default homePage;
