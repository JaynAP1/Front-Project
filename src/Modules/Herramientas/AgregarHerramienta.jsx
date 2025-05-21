import React, { useState } from 'react';

const AgregarHerramienta = () => {
  const [form, setForm] = useState({
    id_proveedor: '',
    nombre: '',
    descripcion: '',
    categoria: '',
    precioDiario: '',
    imagenUrl: '',
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    // Construir el objeto con estructura compatible con el backend
    const herramienta = {
      nombre: form.nombre,
      descripcion: form.descripcion,
      categoria: form.categoria,
      precioDiario: Number(form.precioDiario),
      imagenUrl: form.imagenUrl,
      proveedor: {
        id: Number(form.id_proveedor)
      }
    };

    try {
      const res = await fetch('http://localhost:8080/api/herramientas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(herramienta),
      });

      if (!res.ok) throw new Error('Error al guardar');

      alert('Herramienta añadida con éxito');
      setForm({
        id_proveedor: '',
        nombre: '',
        descripcion: '',
        categoria: '',
        precioDiario: '',
        imagenUrl: ''
      });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Agregar Nueva Herramienta</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="number"
          name="id_proveedor"
          placeholder="ID del proveedor"
          value={form.id_proveedor}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={form.nombre}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          name="descripcion"
          placeholder="Descripción"
          value={form.descripcion}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="categoria"
          placeholder="Categoría"
          value={form.categoria}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          name="precioDiario"
          placeholder="Precio Diario"
          value={form.precioDiario}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="url"
          name="imagenUrl"
          placeholder="URL de imagen"
          value={form.imagenUrl}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Guardar Herramienta
        </button>
      </form>
    </div>
  );
};

export default AgregarHerramienta;