import { useState } from 'react'

import './App.css'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Cart } from './components/Cart'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { Home } from './components/Home'
import { Login } from './components/Login'
import { Register } from './components/Register'


function App() {


  return (
    <>

      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>

    </>
  )
}

export default App
