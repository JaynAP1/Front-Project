import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-container">
        <h1 className="logo">LUCAJE</h1>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          ☰
        </button>

       <nav className={`nav ${menuOpen ? 'open' : ''}`}>
        <Link to="/" className="nav-link" onClick={() => setMenuOpen(false)}>Listar herramientas</Link>
        <Link to="/agregar" className="nav-link" onClick={() => setMenuOpen(false)}>Añadir herramienta</Link>
        <Link to="/listadoHerramientaProveedor" className="nav-link" onClick={() => setMenuOpen(false)}>Proveedor</Link>
        <Link to="/reserva" className="nav-link" onClick={() => setMenuOpen(false)}>Reserva</Link>
      </nav>
      </div>
    </header>
  );
};

export default Header;