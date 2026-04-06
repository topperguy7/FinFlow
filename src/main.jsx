import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { DataProvider } from './context/DataProvider.jsx'
import { UIProvider } from './context/UIProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UIProvider>
      <DataProvider>
        <App />
      </DataProvider>
    </UIProvider>
  </StrictMode>,
)
