import React, { useState, useEffect } from 'react';
import './HerramientasList.css';

const HerramientasList = () => {
  const [herramientas, setHerramientas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);

  const [modalOpen, setModalOpen] = useState(false);
  const [herramientaSeleccionada, setHerramientaSeleccionada] = useState(null);
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [usuarioId, setUsuarioId] = useState('');
  const [reservaError, setReservaError] = useState(null);
  const [reservaSuccess, setReservaSuccess] = useState(null);
  const [reservaLoading, setReservaLoading] = useState(false);

  const token = localStorage.getItem('token'); 

  useEffect(() => {
    const fetchHerramientas = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('http://localhost:8080/api/herramientas', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        setHerramientas(data);

        const uniqueCategories = [...new Set(data.map(h => h.categoria))];
        setCategories(uniqueCategories);
      } catch (err) {
        setError(err.message || 'Error al cargar las herramientas');
      } finally {
        setLoading(false);
      }
    };

    fetchHerramientas();
  }, [token]);

  const filteredHerramientas = selectedCategory
    ? herramientas.filter(h => h.categoria === selectedCategory)
    : herramientas;

  const abrirModalReserva = (herramienta) => {
    setHerramientaSeleccionada(herramienta);
    setFechaInicio('');
    setFechaFin('');
    setUsuarioId('');
    setReservaError(null);
    setReservaSuccess(null);
    setModalOpen(true);
  };

  const cerrarModalReserva = () => {
    setModalOpen(false);
    setHerramientaSeleccionada(null);
  };

  const manejarReserva = async (e) => {
    e.preventDefault();

    if (!usuarioId || !fechaInicio || !fechaFin) {
      setReservaError('Completa todos los campos');
      return;
    }

    if (fechaFin < fechaInicio) {
      setReservaError('La fecha fin no puede ser anterior a la fecha inicio');
      return;
    }

    setReservaLoading(true);
    setReservaError(null);
    setReservaSuccess(null);

    try {
      const response = await fetch('http://localhost:8080/api/reservas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          herramientaId: herramientaSeleccionada.id,
          usuarioId,
          fechaInicio,
          fechaFin,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al realizar la reserva');
      }

      setReservaSuccess('Reserva realizada con éxito');
      setTimeout(() => cerrarModalReserva(), 2000);
    } catch (err) {
      setReservaError(err.message);
    } finally {
      setReservaLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="spinner">
        <div className="loader"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-box">
        <div className="flex items-center">
          <svg className="w-5 h-5 mr-2 text-red-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <h3>Error al cargar las herramientas</h3>
        </div>
        <div className="mt-2 text-sm">{error}</div>
        <div className="mt-4">
          <button onClick={() => window.location.reload()} className="btn-retry">
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="contenedorTitul">
        <h2 className="title">Herramientas Disponibles</h2>
        <div className="w-full md:w-64">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="select"
          >
            <option value="">Todas las categorías</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {filteredHerramientas.length === 0 ? (
        <div className="no-items">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <h3>No hay herramientas</h3>
          <p>No se encontraron herramientas disponibles en esta categoría.</p>
        </div>
      ) : (
        <div className="grid">
          {filteredHerramientas.map(herramienta => (
            <div key={herramienta.id} className="card">
              <div className="relative">
                <div className="card-img-container">
                  <img
                    src={herramienta.imagenUrl || 'https://via.placeholder.com/300x200?text=Sin+Imagen'}
                    alt={herramienta.nombre}
                    className="card-img"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/300x200?text=Sin+Imagen';
                    }}
                  />
                </div>
                <div className="price-tag">
                  ${herramienta.precioDiario}/día
                </div>
              </div>
              <div className="card-body">
                <h2 className="card-title">{herramienta.nombre}</h2>
                <p className="card-desc">{herramienta.descripcion}</p>
                <div className="card-meta">
                  <strong>Categoría:</strong> {herramienta.categoria}
                </div>
                {herramienta.proveedor?.nombre && (
                  <div className="card-meta">
                    <strong>Proveedor:</strong> {herramienta.proveedor.nombre}
                  </div>
                )}
                <button
                  className="btn-rent"
                  onClick={() => abrirModalReserva(herramienta)}
                >
                  Rentar Ahora
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {modalOpen && (
        <div className="modal-overlay" onClick={cerrarModalReserva}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Reservar: {herramientaSeleccionada.nombre}</h2>
            <form onSubmit={manejarReserva}>
              <div>
                <label>Usuario ID:</label>
                <input
                  type="number"
                  value={usuarioId}
                  onChange={(e) => setUsuarioId(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Fecha inicio:</label>
                <input
                  type="datetime-local"
                  value={fechaInicio}
                  onChange={(e) => setFechaInicio(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Fecha fin:</label>
                <input
                  type="datetime-local"
                  value={fechaFin}
                  onChange={(e) => setFechaFin(e.target.value)}
                  required
                />
              </div>

              {reservaError && <p className="error-text">{reservaError}</p>}
              {reservaSuccess && <p className="success-text">{reservaSuccess}</p>}

              <button type="submit" disabled={reservaLoading}>
                {reservaLoading ? 'Reservando...' : 'Confirmar reserva'}
              </button>
              <button type="button" onClick={cerrarModalReserva} disabled={reservaLoading} style={{ marginLeft: '10px' }}>
                Cancelar
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default HerramientasList;