import React from 'react';
import './styles.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Header = () => {
    const navigate = useNavigate();
    const toggleUserMenu = () => {
        setShowUserButtons(!showUserButtons);
    };
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        localStorage.removeItem('name');
        localStorage.removeItem('lastname');
        navigate('/login');
    };
    const [showUserButtons, setShowUserButtons] = useState(true);

    return (
        <header className="header">
            <div className="logoHeader" onClick={()=> navigate('/home')}>
                <h1>Lucaje</h1>
                <img src="src\assets\logoBlanco.png" alt="Logo" />
            </div>
            <div className="directions">
                <h4 onClick={()=> navigate('/herramientas')}>Catalogo</h4>
                <h4 onClick={() => navigate('/reserva')}>Reservas</h4>
                
            </div>
            <div className="user">
                <img
                    onClick={toggleUserMenu}
                    src="https://www.pngitem.com/pimgs/m/551-5510463_default-user-image-png-transparent-png.png"
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
    );
};

export default Header;
