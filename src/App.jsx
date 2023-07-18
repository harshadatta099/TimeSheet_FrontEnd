import React from 'react';
import { BrowserRouter , Route,Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/home' element={<HomePage/>}/>
      <Route path='/' element={<LoginPage/>}/>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
