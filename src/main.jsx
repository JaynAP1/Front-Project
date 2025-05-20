import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Reservas from './Modules/Reservas/Reservas.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Reservas />
  </StrictMode>,
)
