import React from 'react';
import Final from './final';
import Navbar from './navbar';
import { BrowserRouter, Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import FinalCreate from './final-create';
const App = ()=>{
  return(
    <>
  <BrowserRouter>

    <Routes>

      <Route path='/home' element={<Final />}/>
      <Route path='/add' element={<FinalCreate />} />
      <Route path='/edit/:IdData' element={<FinalCreate />} />
      
    </Routes>
  
  
  </BrowserRouter>
    
    </>
  )
}

export default App;
