// frontend/src/app.jsx

import './App.css'
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import ExpenseModal from './components/ExpenseModal';
import Navbar from './components/Navbar';
import UsersExpensesCards from './components/UsersExpensesCards';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />}></Route>
          <Route path='/login' element={<Login />}>Login</Route>
          <Route path='/signup' element={<SignUp />}>Sign Up</Route>
          <Route path='/dashboard' element={<Dashboard />}>Dashboard</Route>
          <Route path='/navbar' element={<Navbar />}>Navbar</Route>
          <Route path='/expensemodal' element={<ExpenseModal />}>Expense Modal</Route>
          <Route path='/usersexpensescard' element={<UsersExpensesCards />}>User's Expenses Cards</Route>
        </Routes>
        <ToastContainer position='top-center' autoClose={1000} />
      </BrowserRouter>
    </>
  )
}

export default App
