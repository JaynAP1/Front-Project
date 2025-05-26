import { useState } from 'react';

function FormularioCrearReserva({ rol, usuarioId, token, obtenerReservas }) {
    const [herramientaId, setHerramientaId] = useState('');
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFin, setFechaFin] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [error, setError] = useState('');
    const [usuarioIdInput, setUsuarioIdInput] = useState(usuarioId);


    const handleSubmit = (e) => {
        e.preventDefault();
        const userIdFinal = rol !== 'user' ? usuarioIdInput : localStorage.getItem('id');
        
        fetch(`http://localhost:8080/reservas/crear?usuarioId=${userIdFinal}&herramientaId=${herramientaId}&fechaInicio=${fechaInicio}:00&fechaFin=${fechaFin}:00&cantidad=${cantidad}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
        })
        .then(res => {
            if (!res.ok) throw new Error("Error al crear la reserva");
            return res.json();
        })
        .then(() => {
            obtenerReservas();
            setHerramientaId('');
            setFechaInicio('');
            setFechaFin('');
            setCantidad('');
            setError('');
        })
        .catch(err => setError(err.message));
    };

    return (
        <div className="formulario-reservas">
            <h2>Crear Reserva</h2>
            <form onSubmit={handleSubmit}>
                {rol !== 'user' && (
                    <>
                        <label>Usuario ID:</label>
                        <input
                            type="number"
                            value={usuarioIdInput}
                            onChange={e => setUsuarioIdInput(e.target.value)}
                            required
                        />
                    </>
                )}

                <label>Herramienta ID:</label>
                <input
                    type="number"
                    value={herramientaId}
                    onChange={e => setHerramientaId(e.target.value)}
                    required
                />

                <label>Fecha Inicio:</label>
                <input
                    type="datetime-local"
                    value={fechaInicio}
                    onChange={e => setFechaInicio(e.target.value)}
                    required
                />

                <label>Fecha Fin:</label>
                <input
                    type="datetime-local"
                    value={fechaFin}
                    onChange={e => setFechaFin(e.target.value)}
                    required
                />

                <label>Cantidad:</label>
                <input
                    type="number"
                    value={cantidad}
                    onChange={e => setCantidad(e.target.value)}
                    required
                />

                <button type="submit">Crear Reserva</button>
                {error && <p className="error">{error}</p>}
            </form>
        </div>
    );
}

export default FormularioCrearReserva;
