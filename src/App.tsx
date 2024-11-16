

import './App.css'
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { Login } from './components/Login'
import { Register } from './components/Register'
import { Posts } from './components/Posts'
import { MyPosts } from './components/MyPosts'

function App() {


  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/posts" />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/myposts" element={<MyPosts />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
