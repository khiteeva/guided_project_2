import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import CharacterList from './components/CharacterList';
import Character from './components/Character';
import Planet from './components/Planet'
import Film from './components/Film';

function App() {

  return (
    <>
    <Router>
        <Routes>
          <Route exact path="/" element={<CharacterList />} />
          <Route path="/characters/:id" element={<Character />} />
          <Route path="/planets/:id" element={<Planet />} />
          <Route path="/films/:id" element={<Film />} />
        </Routes>
    </Router>
    </>
  )
}

export default App
