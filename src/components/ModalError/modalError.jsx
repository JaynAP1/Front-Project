import './style.css';

const ModalError = ({ isOpen, onClose, errorMessage }) => {
    if (!isOpen) return null;

    return (
        <dialog open className="modal">
            <div className="modal-content">
                <h1>Error</h1>
                <p>{errorMessage || 'Ha ocurrido un error'}</p>
                <button onClick={onClose}>Cerrar</button>
            </div>
        </dialog>
    )
}

export default ModalError;