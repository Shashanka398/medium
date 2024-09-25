import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Blog from "./pages/Blog";
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Editor from './pages/Editor';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
           <Route path='/' element={<Signin />}/>
          <Route path='/signup' element={<Signup />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/blog/:id' element={<Blog />} />
            <Route path='/blogs' element={<Blog />} />
             <Route path='/editor' element={<Editor />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
