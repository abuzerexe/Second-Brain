

import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import './App.css'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'


function App() {


  return (
    <>
    <BrowserRouter>
      <Routes>
          <Route path='/signin' element={<Signin/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
