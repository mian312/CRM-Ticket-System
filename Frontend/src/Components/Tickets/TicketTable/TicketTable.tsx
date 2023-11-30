import React from 'react';
import { Table } from 'react-bootstrap';
import { Ticket } from '../../../assets/interface/interface';
import { Link } from 'react-router-dom';

interface TicketTableProps {
  tickets: Ticket[];
}

const TicketTable: React.FC<TicketTableProps> = ({ tickets }) => {
  // console.log("tickets:", tickets)

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Subjects</th>
          <th>Status</th>
          <th>Opened Date</th>
          <th>Target Date</th>
        </tr>
      </thead>
      <tbody>
        {tickets.length ? (
          tickets.map((row) => (
            <tr key={row._id}>
              <td>{row.trainNumber}</td>
              <td>
                <Link to={`/tickets/${row._id}`}>{row.subject}</Link>
              </td>
              <td>{row.status}</td>
              <td>{row.openAt && new Date(row.openAt).toLocaleString()}</td>
              <td>{row.issueDate && new Date(row.issueDate).toLocaleString()}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={4} className="text-center">
              No tickets to show
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export default TicketTable;
