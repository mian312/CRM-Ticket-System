import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Entry from './Pages/Entry/Entry.pg'
import {
  Route,
  Routes
} from 'react-router-dom';
import { Dashboard } from './Layouts/Pages/Dashboard/Dashboard';
import { DefaultLayout } from './Layouts/DefaultLayout';

export default function App() {
  return (
    <DefaultLayout>
      <Routes>
        <Route path='/' Component={Entry} />
        <Route path='/dashboard' Component={Dashboard} />
      </Routes>
    </DefaultLayout>
  )
}
