import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './public/login/App'
import Home from './public/home/Home'
import Perfil from './public/perfil/Perfil'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<App />} />
        <Route path="/home" element={<Home />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/" element={<App />} />
        <Route path="/agregar" element={<AgregarHerramienta />} />
        <Route path="/editar-herramienta/:id" element={<EditarHerramienta />} />
        <Route path="/listadoHerramientaProveedor" element={<ListaHerramientasProveedor proveedorId={1} />} />
        <Route path="/reserva" element={<Reservas />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
