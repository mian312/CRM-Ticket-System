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
import { ToastContainer } from 'react-toastify';

export default function App() {
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={2500}
        newestOnTop={true}
        closeOnClick
        draggable
        pauseOnHover
        theme="colored"
      />
      <Routes>
        <Route path='/' element={<Entry />} />
        <Route path='/registration' element={<Registration />} />
        <Route path='/password-reset' element={<UpdatePass />} />
        <Route path='/dashboard' element={
          <DefaultLayout>
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          </DefaultLayout>
        } />
        <Route path='/add-ticket' element={
          <DefaultLayout>
            <PrivateRoute>
              <AddTicket />
            </PrivateRoute>
          </DefaultLayout>
        } />
        <Route path='/tickets' element={
          <DefaultLayout>
            <PrivateRoute>
              <TicketLists />
            </PrivateRoute>
          </DefaultLayout>
        } />
        <Route path='/tickets/:tId' element={
          <DefaultLayout>
            <PrivateRoute>
              <ViewTicket />
            </PrivateRoute>
          </DefaultLayout>
        } />
      </Routes>
    </>
  );
}
