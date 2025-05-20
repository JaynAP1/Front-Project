import './Header.css';

function Header() {
    const redirectTo = (path) => {
        window.location.href = path;
    };

    return (
        <header className="header">
        <div className="logo">Lucaje</div>
        <nav className="nav-links">
            <button onClick={() => redirectTo('/reservas')}>Reservas</button>
            <button onClick={() => redirectTo('/herramientas')}>Herramientas</button>
            <button onClick={() => redirectTo('/clientes')}>Clientes</button>
        </nav>
        </header>
    );
}

export default Header;
