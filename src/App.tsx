

import './App.css'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { Login } from './components/Login'
import { Register } from './components/Register'
import { Posts } from './components/Posts'
import { PostDetails } from './components/PostDetails'
import { MyPosts } from './components/MyPosts'

function App() {


  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Posts />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/myposts" element={<MyPosts />} />
          <Route path="/post-details" element={<PostDetails />} />
        </Routes>
      </Router>

    </>
  )
}

export default App
