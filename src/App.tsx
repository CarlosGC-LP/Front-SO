

import './App.css'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { Home } from './components/Home'
import { Login } from './components/Login'
import { Register } from './components/Register'
import { MyProducts } from './components/MyProducts'

function App() {

 
  return (
    <>

      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/ordenes" element={<MyProducts />} />
        </Routes>
      </Router>

    </>
  )
}

export default App
