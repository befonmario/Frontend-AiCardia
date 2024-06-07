import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Dashboard from '../pages/Dashboard'
import Register from '../pages/Register'
import InputPredict from '../pages/InputPredict'
import OutputPredict from '../pages/OutputPredict'


function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/register' element={<Register />} />
      <Route path='/input-predict' element={<InputPredict/>} />
      <Route path='/output-predict' element={<OutputPredict />} />


    </Routes>
  )
}

export default App
