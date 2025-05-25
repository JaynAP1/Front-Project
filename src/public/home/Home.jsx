import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import { Link } from 'react-router-dom';
import MiGrafico from '../../components/charts/chart1';
import Header from '../../components/header/Header';

function Home() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        }
    }, [navigate]);

    return (
        <div className="home-container">
            <Header />
            <main>
                <div className="container">
                    <div className="Bienvenida">
                        <h1>Bienvenido</h1>
                        <h2>{localStorage.getItem('name')} {localStorage.getItem('lastname')}</h2>
                        <MiGrafico />
                    </div>
                    <div className="box">
                        <div className="box2">
                            <img className="martillo" src="src\assets\martillo.png" alt="Logo" />
                        </div>
                    </div>     
                </div>
            </main>
        </div>
    );
}

export default Home;