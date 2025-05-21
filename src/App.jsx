import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HerramientasList from './Modules/Herramientas/HerramientasList';
import AgregarHerramienta from './Modules/Herramientas/AgregarHerramienta';
import EditarHerramienta from './Modules/Herramientas/EditarHerramientas';
import ListaHerramientasProveedor from './/Modules/Herramientas/listaHerramientasProveedor';
import Header from './Modules/Herramientas/Header';
import Reservas from './Modules/Reservas/Reservas';
const App = () => {
  const proveedorId = 1;
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {/* Header con navegación */}
        <Header/>

        {/* Contenido principal */}
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<HerramientasList />} />
            <Route path="/agregar" element={<AgregarHerramienta />} />
            <Route path="/editar-herramienta/:id" element={<EditarHerramienta />} />
            <Route path="/listadoHerramientaProveedor" element={<ListaHerramientasProveedor proveedorId={1} />} />
            <Route path="/reserva" element={<Reservas />} />


          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
