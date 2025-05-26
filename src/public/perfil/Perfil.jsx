import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './style.css';
import Header from '../../components/header/Header';
import MiGrafico from '../../components/charts/chart1';
import { motion, AnimatePresence } from 'framer-motion';



function Home() {
    const navigate = useNavigate();

    const [isEdit, setIsEdit] = useState(true)
    const [activeSection, setActiveSection] = useState('registros');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        }
    }, [navigate]);

    const [nombre, setNombre] = useState('');
    const [resultado, setResultado] = useState(null);
    
    useEffect(() => {
        if (nombre.trim() === '') return;
    
        const delayDebounce = setTimeout(() => {
        fetch(`http://localhost:8080/usuarios/exists/${nombre}`, {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            },
            credentials: 'same-origin'
        })
            .then(async res => {
            if (!res.ok) {
                const text = await res.text();
                throw new Error(text || res.statusText);
            }
            return res.json();
            })
            .then(data => {
            setResultado(data);
            })
            .catch(err => {
            console.error('Error de verificación:', err.message);
            setResultado(null);
            });
        }, 500); 

        return () => clearTimeout(delayDebounce);
    }, [nombre]);

    const [editUser, setEditUser] = useState({
        nombre1: '',
        nombre2: '',
        apellido1: '',
        apellido2: '',
        email: '',
        phone: '',
        rol: 'USER',
    });
    
    useEffect(() => {
        if (resultado) {
            setEditUser({
                nombre1: resultado.nombre1 || '',
                nombre2: resultado.nombre2 || '',
                apellido1: resultado.apellido1 || '',
                apellido2: resultado.apellido2 || '',
                email: resultado.email || '',
                phone: resultado.phone || '',
                rol: resultado.rol || 'USER',
            });
        }
    }, [resultado]);
    

    const saveData = () => {
        fetch('http://localhost:8080/usuarios/save-info', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(editUser),
        })
            .then(async (res) => {
                if (!res.ok) {
                    const text = await res.text();
                    throw new Error(text || res.statusText);
                }
                return res.json();
            })
            .then(data => {
                alert('Usuario actualizado correctamente');
                console.log('Guardado:', data);
            })
            .catch(err => {
                alert('Error al guardar el usuario: ' + err.message);
                console.error('Error al guardar:', err);
            });
    };
    
    return (
        <div className="perfil-container">
            <Header />
            <main>
                <div className="container">
                    <div className="perfilBox">
                        <div className="userIMG">
                            <img src="https://www.pngitem.com/pimgs/m/551-5510463_default-user-image-png-transparent-png.png" />
                        </div>
                        <div className="userData">
                            <label htmlFor="">Nombre</label>
                            <input type="text" defaultValue={localStorage.getItem('name')+" "+localStorage.getItem('lastname')} />
                            <label htmlFor="">Telefono</label>
                            <input type="text" defaultValue={localStorage.getItem('number')} />
                            <label htmlFor="">Correo</label>
                            <input type="text" defaultValue= {localStorage.getItem('email')}/>
                            <button>Guardar</button>
                        </div>  
                    </div>
                    <div className="SearchuserAdmin">
                        <div className="selectOption">
                            <h4
                                onClick={() => setActiveSection('registros')}
                                className={activeSection === 'registros' ? 'active-tab' : 'inactive-tab'}
                            >
                                Registros
                            </h4>
                            {localStorage.getItem('role') == "ADMIN" ? <h4
                                onClick={() => setActiveSection('usuarios')}
                                className={activeSection === 'usuarios' ? 'active-tab' : 'inactive-tab'}
                            >
                                Usuarios
                            </h4> : "" }
                        </div>
                        <div style={{ height: '2px', backgroundColor: '#888', margin: '20px 0', width: '100%' }}>
                            <h1>_____________________</h1>
                        </div>
                        <div className="SearchUser">
                            {activeSection === 'usuarios' && (
                                <input type="text"  placeholder='Buscar por nombre' value={nombre}
                                onChange={(e) => setNombre(e.target.value)}/>
                            )}
                        </div>
                        {activeSection === 'usuarios' && (
                            <AnimatePresence>
                            <motion.div
                              key="usuarios"
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.4 }}
                            >
                              {
                                <div className="userEdit">
                                <div className="imgUser">
                                <div className="userIMG">
                                    <img src="https://www.pngitem.com/pimgs/m/551-5510463_default-user-image-png-transparent-png.png" />
                                </div>
                                <div className="roleUser">
                                    <select value={editUser.rol} onChange={(e) => setEditUser({ ...editUser, rol: e.target.value })}>
                                        <option value="ADMIN">Administrador</option>
                                        <option value="PROOV">Proovedor</option>
                                        <option value="USER">Usuario</option>
                                    </select>
                                </div>
                                </div>
                                <div className="userDataEdit">
                                    <label>Primer nombre</label>
                                    <input type="text" value={editUser.nombre1} onChange={(e) => setEditUser({ ...editUser, nombre1: e.target.value })} />
                                    <label>Segundo nombre</label>
                                    <input type="text" value={editUser.nombre2} onChange={(e) => setEditUser({ ...editUser, nombre2: e.target.value })} />
                                    <label>Primer apellido</label>
                                    <input type="text" value={editUser.apellido1} onChange={(e) => setEditUser({ ...editUser, apellido1: e.target.value })} />
                                    <label>Segundo apellido</label>
                                    <input type="text" value={editUser.apellido2} onChange={(e) => setEditUser({ ...editUser, apellido2: e.target.value })} />
                                    <label>Correo</label>
                                    <input type="text" value={editUser.email} onChange={(e) => setEditUser({ ...editUser, email: e.target.value })} />
                                    <label>Telefono</label>
                                    <input type="text" value={editUser.phone} onChange={(e) => setEditUser({ ...editUser, phone: e.target.value })}/>
                                </div>
                            </div>
                              }
                            </motion.div>
                          </AnimatePresence>
                        )}
                        {activeSection === 'registros' && (
                            <AnimatePresence>
                                <motion.div
                                key="registros"
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.4 }}
                                >
                                {
                                    <div className="Registros">
                                        <MiGrafico />
                                    </div>
                                }
                                </motion.div>
                            </AnimatePresence>
                        )}
                        {activeSection === 'usuarios' && (
                            <div className="Registros">
                                <button onClick={saveData}>Guardar</button>
                            </div>
                        )}

                    </div>
                </div>
            </main>
        </div>
    );
}

export default Home;