import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

document.addEventListener('submit', (e) => e.preventDefault())

ReactDOM.createRoot(
    document.getElementById('root')
)
.render(
    <App />
)
