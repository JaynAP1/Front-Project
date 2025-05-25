import React, { useEffect, useState } from 'react';
import './ListaHerramientasProveedor.css'; 

const ListaHerramientasProveedor = ({ proveedorId }) => {
  const [herramientas, setHerramientas] = useState([]);
  const [editandoId, setEditandoId] = useState(null);
  const [formData, setFormData] = useState({});
  const [nuevaHerramienta, setNuevaHerramienta] = useState({
    nombre: '',
    cantidad: '',
    descripcion: '',
    categoria: '',
    precioDiario: '',
    disponible: true,
    imagenUrl: '',
  });

  
  useEffect(() => {
    fetch(`http://localhost:8080/api/herramientas/proveedor/${proveedorId}`)
      .then(res => res.json())
      .then(data => setHerramientas(data))
      .catch(err => console.error('Error:', err));
  }, [proveedorId]);

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleEditar = herramienta => {
    setEditandoId(herramienta.id);
    setFormData({ ...herramienta });
  };

  const handleCancelar = () => {
    setEditandoId(null);
    setFormData({});
  };

  const handleGuardar = async id => {
    try {
      const res = await fetch(`http://localhost:8080/api/herramientas/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, proveedor: { id: proveedorId } }),
      });
      if (!res.ok) throw new Error('Error al actualizar');
      setHerramientas(herramientas.map(h => h.id === id ? formData : h));
      setEditandoId(null);
      alert('Herramienta actualizada');
    } catch (error) {
      console.error(error);
      alert('No se pudo actualizar la herramienta');
    }
  };

  const handleEliminar = async id => {
    if (!window.confirm('¿Estás seguro de eliminar esta herramienta?')) return;
    try {
      const res = await fetch(`http://localhost:8080/api/herramientas/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Error al eliminar');
      setHerramientas(herramientas.filter(h => h.id !== id));
      alert('Herramienta eliminada');
    } catch (error) {
      console.error(error);
      alert('No se pudo eliminar la herramienta');
    }
  };

  const handleNuevaHerramientaChange = e => {
    const { name, value, type, checked } = e.target;
    setNuevaHerramienta({
      ...nuevaHerramienta,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleAgregarHerramienta = async e => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:8080/api/herramientas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...nuevaHerramienta, proveedor: { id: proveedorId } }),
      });
      if (!res.ok) throw new Error('Error al agregar herramienta');
      const nueva = await res.json();
      setHerramientas([...herramientas, nueva]);
      setNuevaHerramienta({
        nombre: '',
        cantidad:'',
        descripcion: '',
        categoria: '',
        precioDiario: '',
        disponible: true,
        imagenUrl: '',
      });
      alert('Herramienta añadida');
    } catch (error) {
      console.error(error);
      alert('No se pudo añadir la herramienta');
    }
  };

  return (
    <div className="contenedor">
      <h2 className="titulo">Tus Herramientas</h2>

      <form onSubmit={handleAgregarHerramienta} className="formulario">
        <input name="nombre" placeholder="Nombre" value={nuevaHerramienta.nombre} onChange={handleNuevaHerramientaChange} required />
        <input name="cantidad" placeholder="Cantidad" value={nuevaHerramienta.cantidad} onChange={handleNuevaHerramientaChange} required />
        <input name="categoria" placeholder="Categoría" value={nuevaHerramienta.categoria} onChange={handleNuevaHerramientaChange} required />
        <input name="precioDiario" placeholder="Precio Diario" type="number" value={nuevaHerramienta.precioDiario} onChange={handleNuevaHerramientaChange} required />
        <input name="imagenUrl" placeholder="URL Imagen" type="url" value={nuevaHerramienta.imagenUrl} onChange={handleNuevaHerramientaChange} />
        <textarea name="descripcion" placeholder="Descripción" value={nuevaHerramienta.descripcion} onChange={handleNuevaHerramientaChange} />
        <label className="checkbox">
          <input type="checkbox" name="disponible" checked={nuevaHerramienta.disponible} onChange={handleNuevaHerramientaChange} />
          <span>Disponible</span>
        </label>
        <button type="submit" className="btn-primario">Añadir Herramienta</button>
      </form>

      <div className="tabla-container">
      <table className="tabla">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripcion</th>
            <th>Cantidad</th>
            <th>Categoría</th>
            <th>Disponibilidad</th>
            <th>Precio</th>
            <th>URL</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {herramientas.map(h => (
            <tr key={h.id}>
              <td>{editandoId === h.id ? <input name="nombre" value={formData.nombre} onChange={handleChange} /> : h.nombre}</td>
              <td>{editandoId === h.id ? <textarea name="descripcion" value={formData.descripcion} onChange={handleChange} /> : h.descripcion}</td>
              <td>{editandoId === h.id ? <input name="cantidad" value={formData.cantidad} onChange={handleChange} type="number" /> : `${h.cantidad}`}</td>

              <td>{editandoId === h.id ? <input name="categoria" value={formData.categoria} onChange={handleChange} /> : h.categoria}</td>
              <td>
                  {editandoId === h.id ? (
                    <label>
                      <input
                        type="checkbox"
                        name="disponible"
                        checked={formData.disponible}
                        onChange={e =>
                          setFormData({ ...formData, disponible: e.target.checked })
                        }
                      />
                      <span>Disponible</span>
                    </label>
                  ) : (
                    h.disponible ? '✅ Disponible' : '❌ No disponible'
                  )}
              </td>
              <td>{editandoId === h.id ? <input name="precioDiario" value={formData.precioDiario} onChange={handleChange} type="number" /> : `$${h.precioDiario}`}</td>
              <td>
                {editandoId === h.id
                  ? <input name="imagenUrl" value={formData.imagenUrl} onChange={handleChange} />
                  : <img src={h.imagenUrl} alt="herramienta" className="imagen" />}
              </td>
              <td>
                {editandoId === h.id ? (
                  <>
                    <button className="btn verde" onClick={() => handleGuardar(h.id)}>Guardar</button>
                    <button className="btn gris" onClick={handleCancelar}>Cancelar</button>
                  </>
                ) : (
                  <>
                    <button className="btn azul" onClick={() => handleEditar(h)}>Editar</button>
                    <button className="btn rojo" onClick={() => handleEliminar(h.id)}>Eliminar</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default ListaHerramientasProveedor;