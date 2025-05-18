import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';


import './Header.css'

function Header({ user }) {
    const handleLogout = () => {
        // Aquí puedes implementar la lógica de cierre de sesión
        console.log('Cerrar sesión');
    };
    const handleLogin = () => {
        // Aquí puedes implementar la lógica de inicio de sesión
        console.log('Iniciar sesión');
    };

    return (
        <header>
            <nav>
                <Link to="/" style={{ marginRight: '1rem' }}>
                    <img src={logo} alt="Logo" style={{ height: '3em' }} />
                </Link>
                <Link to="/about">About</Link>
                <Link to="/lista" style={{ marginRight: '1rem' }}>Buscador</Link>
                <Link to="/mapa" style={{ marginRight: '1rem' }}>Mapa</Link>
                <span style={{ marginLeft: 'auto', marginRight: '1rem', float: 'right' }}>
                    {(!user) &&
                        <>
                            <Link to="/login" style={{ marginRight: '1rem' }}>Login</Link>
                            <Link to="/registro">Registro</Link>
                        </>
                    }
                    {user &&
                        <>
                            <span style={{ marginRight: '1rem' }}>Bienvenido, <Link to="/perfil">{user}</Link></span>
                            <button onClick={handleLogout}>Cerrar sesión</button>
                        </>
                    }
                </span>


            </nav>
        </header>
    );
}

export default Header;