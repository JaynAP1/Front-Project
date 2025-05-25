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

    return (
        <div className="perfil-container">
            <Header />
            <main>
                <div className="container">
                    <div className="perfilBox">
                        <div className="userIMG">

                        </div>
                        <div className="userData">
                            <label htmlFor="">Nombre</label>
                            <input type="text" defaultValue={localStorage.getItem('name')+" "+localStorage.getItem('lastname')} />
                            <label htmlFor="">Numero</label>
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
                            {localStorage.getItem('role') == 1 ? <h4
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
                                <input type="text" placeholder='Buscar por nombre'/>
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
                                <div className="userIMG"></div>
                                <div className="roleUser">
                                    <select defaultValue="opcion2">
                                    <option value="opcion1">Administrador</option>
                                    <option value="opcion2">Proovedor</option>
                                    <option value="opcion3">Usuario</option>
                                    </select>
                                </div>
                                </div>
                                <div className="userDataEdit">
                                <label>Primer nombre</label>
                                <input type="text" defaultValue={localStorage.getItem('name')} />
                                <label>Segundo nombre</label>
                                <input type="text" defaultValue={localStorage.getItem('secondname')} />
                                <label>Primer apellido</label>
                                <input type="text" defaultValue={localStorage.getItem('lastname')} />
                                <label>Segundo apellido</label>
                                <input type="text" defaultValue={localStorage.getItem('secondlastname')} />
                                <label>Correo</label>
                                <input type="text" defaultValue={localStorage.getItem('email')} />
                                <label>Telefonjo</label>
                                <input type="text" defaultValue={localStorage.getItem('phone')} />
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
                                <button>Guardar</button>
                            </div>
                        )}

                    </div>
                </div>
            </main>
        </div>
    );
}

export default Home;

