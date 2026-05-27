// frontend/src/app.jsx

import './App.css'
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import UsersExpensesCards from './components/UsersExpensesCards';
import ExpenseCharts from './components/ExpenseCharts';
import AddExpenseModal from './components/AddExpenseModal';
import GoogleSuccess from './pages/GoogleSuccess';
import ProtectedRoute from './routes/ProtectedRoute';
import PublicRoute from './routes/PublicRoute';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }>
          </Route>

          <Route path='/login' element={
            <PublicRoute>
              <Login />
            </PublicRoute>}>
            Login
          </Route>

          <Route path='/signup' element={
            <PublicRoute>
              <SignUp />
            </PublicRoute>}>
            Sign Up
          </Route>

          <Route path='/google-success' element={<GoogleSuccess />}></Route>

          <Route path='/dashboard' element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>}>
            Dashboard
          </Route>

          <Route path='/navbar' element={<Navbar />}>Navbar</Route>
          <Route path='/addexpensemodal' element={< AddExpenseModal />}>Add Expense Modal</Route>
          <Route path='/usersexpensescards' element={<ProtectedRoute><UsersExpensesCards /></ProtectedRoute>}>User's Expenses Cards</Route>
          <Route path='/expensecharts' element={<ExpenseCharts />}>Expense's Charts</Route>
        </Routes>
        <ToastContainer position='top-center' autoClose={1000} />
      </BrowserRouter>
    </>
  )
}
export default App
