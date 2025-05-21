import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './public/login/App'
import Home from './public/home/Home'
import Perfil from './public/perfil/Perfil'
import AgregarHerramienta from './public/Herramientas/AgregarHerramienta'
import EditarHerramienta from './public/Herramientas/EditarHerramientas'
import ListaHerramientasProveedor from './public/Herramientas/listaHerramientasProveedor'
import Reservas from './public/Reservas/Reservas'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<App />} />
        <Route path="/home" element={<Home />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/agregar" element={<AgregarHerramienta />} />
        <Route path="/editar-herramienta/:id" element={<EditarHerramienta />} />
        <Route path="/listadoHerramientaProveedor" element={<ListaHerramientasProveedor proveedorId={1} />} />
        <Route path="/reserva" element={<Reservas />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
