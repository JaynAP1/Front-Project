import './App.css'
import { useState } from 'react'
import ModalError from '../../components/ModalError/modalError'
import { useNavigate } from 'react-router-dom'

function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: '',
    password: '',
    name: '',
    lastname: ''
  })
  const [isLogin, setIsLogin] = useState(true)
  const [modalError, setModalError] = useState({
    isOpen: false,
    message: ''
  })

  const handleChange = (e) => {
    setUser({...user, [e.target.name]: e.target.value})
  }
  const obtenerUsuaior = async (email, token) => {
    try {
      const res = await fetch(`http://localhost:8080/usuarios/email?email=${email}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!res.ok) throw new Error('Error al obtener el usuario');

      return await res.json();
    } catch (err) {
      console.error(err.message);
      return null;
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    
    const requestBody = isLogin ? {
        email: user.email,
        password: user.password
    } : {
        email: user.email,
        password: user.password,
        nombre1: user.name,
        apellido1: user.lastname
    };

    fetch(`http://localhost:8080/auth/${isLogin ? 'login' : 'register'}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        credentials: 'same-origin',
        body: JSON.stringify(requestBody)
    })
    .then(async res => {
        if (!res.ok) {
            const text = await res.text();
            throw new Error(text || res.statusText);
        }
        return res.json();
    })
    .then(async data => {
        if (data.token) {
            console.log("entro");
            
            const usuario = await obtenerUsuaior(data.email, data.token);
            localStorage.setItem('id', usuario.id);
            localStorage.setItem('token', data.token);
            localStorage.setItem('email', data.email ? data.email : user.email);
            localStorage.setItem('name', data.nombre1 ? data.nombre1 : user.name);
            localStorage.setItem('lastname', data.apellido1 ? data.apellido1 : user.lastname);
            localStorage.setItem('rol', usuario.rol ? usuario.rol : 'user');
            navigate('/home');
        }
    })
    .catch(err => {
        console.error('Authentication error:', err.message);
        setModalError({
            isOpen: true,
            message: err.message
        });
    });
  };

  const toggleMode = () => {
    setIsLogin(!isLogin)
  }

  const closeModal = () => {
    setModalError({
      isOpen: false,
      message: ''
    });
  }

  return (
    <>
      <header>
        <h1>Lucaje</h1>
        <h3>Herramientas al alcance de tu mano</h3>
      </header>
      <main>
        <div className="container">
          <div className="box2">
            <div className="box1">
              <img className='Casco' src={'./src/assets/casco.png'} alt="casco" />
            </div>
          </div>  
          
          <form className="session-form" onSubmit={handleSubmit}>
            <div className="logo">
              <img src={'./src/assets/logo.png'} alt="logo" />
            </div>
            <input type="email" placeholder="Email" name="email" value={user.email} onChange={handleChange} required />
            <input type="password" placeholder="Contraseña" name="password" value={user.password} onChange={handleChange} required />
            {!isLogin && (
              <>
                <input type="text" placeholder="Nombre" name="name" value={user.name} onChange={handleChange} required />
                <input type="text" placeholder="Apellido" name="lastname" value={user.lastname} onChange={handleChange} required />
              </>
            )}
            <button type="submit">{isLogin ? 'Iniciar sesión' : 'Registrarse'}</button>
            <p>
              {isLogin ? '¿No tienes una cuenta?' : '¿Ya tienes una cuenta?'}{' '}
              <a onClick={toggleMode}>{isLogin ? 'Regístrate' : 'Iniciar sesión'}</a>
            </p>
          </form>
        </div>
      </main>
      <ModalError 
        isOpen={modalError.isOpen}
        onClose={closeModal}
        errorMessage={modalError.message}
      />
    </>
  )
}


export default App;
