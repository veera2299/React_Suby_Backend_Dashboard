import React from 'react'
import LangingPage from './vendorDashboard/pages/LangingPage'
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Not_found from './vendorDashboard/components/Not_found';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<LangingPage />} />
        <Route path='/*' element={<Not_found />} />
      </Routes>
    </div>
  )
}

export default App
