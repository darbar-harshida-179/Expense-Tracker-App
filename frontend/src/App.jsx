// frontend/src/app.jsx

import './App.css'
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import { ToastContainer } from 'react-toastify';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>}></Route>
          <Route path='/login' element={<Login/>}>Login</Route>
          <Route path='/signup' element={<SignUp/>}>Sign Up</Route>
        </Routes>
        <ToastContainer position='top-center' autoClose={1000}/>
      </BrowserRouter>
    </>
  )
}

export default App
