import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CharacterList from './components/CharacterList';
import Character from './components/Character';

function App() {

  return (
    <>
    <Router>
        <Routes>
          <Route exact path="/" element={<CharacterList />} />
          <Route path="/characters/:id" element={<Character />} />
        </Routes>
    </Router>
    </>
  )
}

export default App
