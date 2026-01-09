// src/App.jsx
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Sketch from './pages/Sketch'
import SearchLeads from "./pages/SearchLeads";




export default function App(){
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sketch" element={<Sketch />} />
      <Route path="/search-leads" element={<SearchLeads />} />
    </Routes>
  )
}
