import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Buffer } from 'buffer'

// 为浏览器环境提供全局 Buffer（prismarine-nbt 需要）
window.Buffer = Buffer

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
