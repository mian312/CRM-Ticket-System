import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Entry from './Pages/Entry/Entry.pg'
import {
  Route,
  Routes
} from 'react-router-dom';
import { DefaultLayout } from './Layouts/DefaultLayout';

export default function App() {
  return (
    <div className='app'>
      <Routes>
          <Route path='/' element={<DefaultLayout><Entry/></DefaultLayout>} />
          {/* <Route path='/' Component={Entry} /> */}
      </Routes>
    </div>
  )
}
