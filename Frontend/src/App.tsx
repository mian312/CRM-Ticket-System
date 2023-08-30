import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Entry from './Pages/Entry/Entry.pg'
import {
  Route,
  Routes
} from 'react-router-dom';

export default function App() {
  return (
    <div className='app'>
    <Routes>
      <Route path='/' Component={Entry} />
    </Routes>
    </div>
  )
}
