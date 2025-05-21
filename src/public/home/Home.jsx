import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import { useState } from 'react';

function Home() {
    const navigate = useNavigate();
    const [showUserButtons, setShowUserButtons] = useState(true);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        localStorage.removeItem('name');
        localStorage.removeItem('lastname');
        navigate('/login');
    };

    const toggleUserMenu = () => {
        setShowUserButtons(!showUserButtons);
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        }
    }, [navigate]);

    return (
        <div className="home-container">
            <header>
                <div className="logoHeader">
                    <h1>Lucaje</h1>
                    <img src="src\assets\logoBlanco.png" alt="Logo" />
                </div>
                <div className="user">
                    <img 
                        onClick={toggleUserMenu} 
                        src="/src/assets/user.png" 
                        alt="Usuario"
                        className="user-icon"
                    />
                    {!showUserButtons && (
                        <div className="user-buttons">
                            <button onClick={() => navigate('/perfil')}>Perfil</button>
                            <button onClick={handleLogout}>Cerrar sesión</button>
                        </div>
                    )}
                </div>
            </header>
            <main>
                <div className="container">
                    <div className="Bienvenida">
                        <h1>Bienvenido</h1>
                        <h2>{localStorage.getItem('name')} {localStorage.getItem('lastname')}</h2>
                        <div className="directions">
                            <div className="direction-item">
                                <h5>Herramientas</h5>
                            </div>
                            <div className="direction-item-o">
                                <h5>Herramientas</h5>
                            </div>
                            <div className="direction-item">
                                <h5>Herramientas</h5>
                            </div>
                        </div>
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