import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { DefaultLayout } from './Layouts/DefaultLayout';
import Entry from './Pages/Entry/Entry.pg';
import { Dashboard } from './Pages/Dashboard/Dashboard';
import { AddTicket } from './Pages/New-Ticket/AddTicket';
import TicketLists from './Pages/Ticket-Listing/TicketLists';
import ViewTicket from './Pages/View-Ticket/ViewTicket';
import PrivateRoute from './Layouts/PrivateRoute';
import { Registration } from './Pages/Regestration/Registration.pg';
import UpdatePass from './Pages/Update-Password/UpdatePass';

export default function App() {
  return (
    <DefaultLayout>
      <Routes>
        <Route path='/' element={<Entry />} />
        <Route path='/registration' element={<Registration />} />
        <Route path='/password-reset' element={<UpdatePass />} />
        <Route path='/dashboard' element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } />
        <Route path='/add-ticket' element={
          <PrivateRoute>
            <AddTicket />
          </PrivateRoute>
        } />
        <Route path='/tickets' element={
          <PrivateRoute>
            <TicketLists />
          </PrivateRoute>
        } />
        <Route path='/tickets/:tId' element={
          <PrivateRoute>
            <ViewTicket />
          </PrivateRoute>
        } />
      </Routes>
    </DefaultLayout>
  );
}
