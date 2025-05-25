import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const EditarHerramienta = () => {
  const { id } = useParams();
  const [form, setForm] = useState({
    nombre: '',
    descripcion: '',
    categoria: '',
    precioDiario: '',
    imagenUrl: '',
    disponible: true,
    proveedor: { id: '' },
  });

  useEffect(() => {
    fetch(`http://localhost:8080/api/herramientas/${id}`)
      .then(res => res.json())
      .then(data => {
        setForm({
          ...data,
          proveedor: data.proveedor || { id: '' }, // Por si viene null
        });
      });
  }, [id]);

  const handleChange = e => {
    const { name, value } = e.target;
    if (name === "proveedor") {
      setForm({ ...form, proveedor: { id: value } });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:8080/api/herramientas/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error('Error al actualizar herramienta');
      alert('Herramienta actualizada con éxito');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded shadow max-w-xl mx-auto">
      <input type="number" name="proveedor" placeholder="ID proveedor" value={form.proveedor.id} onChange={handleChange} required />
      <input type="text" name="nombre" value={form.nombre} onChange={handleChange} placeholder="Nombre" required />
      <textarea name="descripcion" value={form.descripcion} onChange={handleChange} placeholder="Descripción" required />
      <input type="text" name="categoria" value={form.categoria} onChange={handleChange} placeholder="Categoría" required />
      <input type="number" name="precioDiario" value={form.precioDiario} onChange={handleChange} placeholder="Precio Diario" required />
      <input type="url" name="imagenUrl" value={form.imagenUrl} onChange={handleChange} placeholder="URL de imagen" />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Actualizar</button>
    </form>
  );
};

export default EditarHerramienta;