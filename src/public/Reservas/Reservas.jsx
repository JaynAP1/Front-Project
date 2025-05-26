import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './Reservas.css';
import Header from '../../components/Header/Header';
import FormularioCrearReserva from '../../components/crearReserva/FormularioCrearReserva';


function Reservas() {
    const [reservas, setReservas] = useState([]);
    const [error, setError] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [fechaInicio, setFechaInicio] = useState(null);
    const [fechaFin, setFechaFin] = useState(null);
    const [estado, setEstado] = useState('');
    const [usuarioId, setUsuarioId] = useState('');
    const [herramientaId, setHerramientaId] = useState('');
    const [reservaIdActualizar, setReservaIdActualizar] = useState('');
    const [fechaFinActualizar, setFechaFinActualizar] = useState('');
    const [estadoActualizar, setEstadoActualizar] = useState('');
    const [cantidadActualizar, setCantidadActualizar] = useState('');
    const [rol, setRol] = useState('');
    const [url, setUrl] = useState('');

    const formatearFecha = (fecha) =>
        new Date(fecha).toLocaleString("es-CO", { dateStyle: "medium", timeStyle: "short" });

    const id_user=localStorage.getItem('id');
    
    useEffect(() => {
        const storedRol = localStorage.getItem('rol')?.toLowerCase();
        
        const id = localStorage.getItem('id');
        setRol(storedRol);
        setUsuarioId(id);
        
        if (storedRol=='admin') {
            setUrl(`http://localhost:8080/reservas/`)
        }
        else if(storedRol=='proveedor'){
            setUrl(`http://localhost:8080/reservas/por_proveedor?id=${id_user}`)
        }
        else if(storedRol=='user'){
            setUrl(`http://localhost:8080/reservas/usuarioId?id=${id_user}`)
        }
    }, []);


    const navigate = useNavigate();
    
    const token = localStorage.getItem('token');
    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
    }, [navigate]);
    const obtenerReservas = () => {
        
        fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            },
        })
        .then(res => {
            if (!res.ok) throw new Error('Error al obtener las reservas');
            return res.json();
        })
        .then(data => {
            setReservas(data);            
        })
        .catch(err => setError(err.message));
    };

    const filtrarReservas = () => {
        setError('');

        if ((fechaInicio && !fechaFin) || (!fechaInicio && fechaFin)) {
            setError("Debes completar ambas fechas para filtrar.");
            return;
        }

        const queryParams = new URLSearchParams();

        if (fechaInicio && fechaFin) {
            queryParams.append("fechaInicio", fechaInicio + " 00:00:00");
            queryParams.append("fechaFin", fechaFin + " 23:59:59");
        }

        if (estado) {
            queryParams.append("estado", estado);
        }
        
        fetch(`http://localhost:8080/reservas/?${queryParams.toString()}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(res => {
            if (!res.ok) throw new Error('Error al filtrar reservas');
            return res.json();
        })
        .then(data => setReservas(data))
        .catch(err => setError(err.message));
    };

    useEffect(() => {
        if (url) {
            obtenerReservas();
        }
    }, [url]);

    return (
        <>
        <Header/>
            <div className="reservas-container">
                <h1 className='tittle'>Lista de Reservas</h1>

                <div className="filtros">
                    <div>
                        <label>Fecha Inicio:</label>
                        <input
                            type="date"
                            value={fechaInicio}
                            onChange={e => setFechaInicio(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Fecha Fin:</label>
                        <input
                            type="date"
                            value={fechaFin}
                            onChange={e => setFechaFin(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Estado:</label>
                        <select
                            value={estado}
                            onChange={e => setEstado(e.target.value)}
                        >
                            <option value="">Todos</option>
                            <option value="pendiente">Pendiente</option>
                            <option value="en progreso">En Progreso</option>
                            <option value="finalizado">Finalizada</option>
                            <option value="cancelado">Cancelado</option>
                        </select>
                    </div>
                    <button onClick={filtrarReservas}>Filtrar</button>
                </div>

                {error && <p className="error">{error}</p>}

                <div className="table-wrapper">
                    <table className="reservas-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Estado</th>
                                <th>Fecha Inicio</th>
                                <th>Fecha Fin</th>
                                <th>Cliente</th>
                                <th>Herramienta</th>
                                <th>Cantidad</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reservas.map((reserva) => (
                                <tr key={reserva.id}>
                                    <td>{reserva.id}</td>
                                    <td>{reserva.estado}</td>
                                    <td>{formatearFecha(reserva.fechaInicio)}</td>
                                    <td>{formatearFecha(reserva.fechaFin)}</td>
                                    <td>{reserva.cliente?.nombre1+' '+reserva.cliente.apellido1 || 'Sin cliente'}</td>
                                    <td>{reserva.herramienta?.nombre || 'Sin herramienta'}</td>
                                    <td>{reserva.cantidad || 0}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="formularios">

                    <FormularioCrearReserva
                        rol={rol}
                        usuarioId={usuarioId}
                        token={token}
                        obtenerReservas={obtenerReservas}
                    />


                    <div className="formulario-reservas">
                        <h2>Actualizar Reserva</h2>
                        <form onSubmit={async e => {
                            e.preventDefault();
                            try {
                                const respuesta = await fetch(`http://localhost:8080/reservas/id/?id_reserva=${reservaIdActualizar}`, {
                                    method: 'GET'
                                });
                                if (!respuesta.ok) throw new Error('No se pudo obtener la reserva');
                                const reservaActual = await respuesta.json();

                                const fechaFinal = fechaFinActualizar
                                    ? fechaFinActualizar.replace(' ','T') +':00'
                                    : reservaActual.fechaFin; 

                                const estadoFinal = estadoActualizar || reservaActual.estado;
                                console.log(estadoFinal+fechaFinal);
                                
                               const cantidadFinal = cantidadActualizar || reservaActual.cantidad;

                                await fetch(`http://localhost:8080/reservas/actualizar?reservaId=${reservaIdActualizar}&fechaFin=${fechaFinal}&estado=${estadoFinal}&cantidad=${cantidadFinal}`, {
                                    method: 'PUT',
                                    headers: {
                                        'Authorization': `Bearer ${token}`
                                    }
                                });

                                obtenerReservas();
                                setReservaIdActualizar('');
                                setFechaFinActualizar('');
                                setEstadoActualizar('');
                                setCantidadActualizar('');

                                setError('');
                            } catch (err) {
                                setError(err.message);
                            }
                        }}>

                            <label>ID de la Reserva:</label>
                            <input type="number" value={reservaIdActualizar} onChange={e => setReservaIdActualizar(e.target.value)} required />
                            
                            <label>Fecha Fin:</label>
                            <input type="datetime-local" value={fechaFinActualizar} onChange={e => setFechaFinActualizar(e.target.value)}/>
                            
                            <label>Cantidad:</label>
                            <input type="number" value={cantidadActualizar} onChange={e => setCantidadActualizar(e.target.value)} />
                            
                            <label>Estado:</label>
                            <select value={estadoActualizar} onChange={e => setEstadoActualizar(e.target.value)}>
                                <option value="">Seleccione</option>
                                <option value="pendiente">Pendiente</option>
                                <option value="en progreso">En Progreso</option>
                                <option value="finalizado">Finalizada</option>
                                <option value="cancelado">Cancelado</option>
                            </select>
                            
                            <button type="submit">Actualizar Reserva</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Reservas;
