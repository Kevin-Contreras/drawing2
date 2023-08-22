import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Lineas from './components/canvas'
import Nav from './components/nav'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Registro from './components/registro'
import Login from './components/login'
import Lienzos from './components/lienzo'
import MisDibujos from './components/misdibujos'
import Buscar from './components/buscar'
import Solicitud from './components/solicitudes'
import Amigos from './components/amigos'
import Footer from './components/footer'

function App() {

  return (
      <BrowserRouter>
      <Nav/>
      <Routes>
        <Route path="/" element={<Lineas />}/>
        <Route path="/register" element={<Registro />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/lienzos" element={<Lienzos />}/>
        <Route path="/misDibujos" element={<MisDibujos />}/>
        <Route path="/misSolicitudes" element={<Solicitud />}/>
        <Route path="/amigos" element={<Amigos />}/>


        <Route path="/buscar" element={<Buscar />}>


          <Route path="*" element={<Lineas />} />
        </Route>
      </Routes>
    </BrowserRouter>
       
  )
}

export default App
