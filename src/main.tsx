import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { store } from './redux/Store.ts'
import { ErrorBoundary } from 'react-error-boundary'
import FallbackUI from './components/custom/fallbackUI.tsx'
import { CircuitProvider } from './context/circuitContext.tsx'


createRoot(document.getElementById('root')!).render(
  <ErrorBoundary FallbackComponent={FallbackUI}>
    
  <Provider store={store}>
  <StrictMode>
    <CircuitProvider>
   
    <App />
    </CircuitProvider>
    {/* <Toaster duration = {5000}/> */}
  </StrictMode>
  </ Provider>
  </ErrorBoundary>
)
