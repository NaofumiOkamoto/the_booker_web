// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  // <StrictMode> useEffectが2回呼ばれるのを防ぐ方法
    <App />
  // </StrictMode>,
)
