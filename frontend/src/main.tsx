import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'

console.log("main.tsx: attempting to create root...");
const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
  console.log("main.tsx: render called with App");
} else {
  console.error("main.tsx: #root not found!");
}

