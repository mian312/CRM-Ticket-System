import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {
  Route,
  Routes
} from 'react-router-dom';
import { DefaultLayout } from './Layouts/DefaultLayout';
import Entry from './Pages/Entry/Entry.pg';
import { Dashboard } from './Pages/Dashboard/Dashboard';

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
