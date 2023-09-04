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
import { AddTicket } from './Pages/New-Ticket/AddTicket';
import TicketLists from './Pages/Ticket-Listing/TicketLists';
import ViewTicket from './Pages/View-Ticket/ViewTicket';

export default function App() {
  return (
    <DefaultLayout>
      <Routes>
        <Route path='/' Component={Entry} />
        <Route path='/dashboard' Component={Dashboard} />
        <Route path='/add-ticket' Component={AddTicket} />
        <Route path='/tickets' Component={TicketLists} />
        <Route path='/tickets/:id' Component={ViewTicket} />
      </Routes>
    </DefaultLayout>
  )
}
