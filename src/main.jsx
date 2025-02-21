import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ErrorBoundary } from 'react-error-boundary'
import RootError from './components/RootError'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary FallbackComponent={RootError}>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)