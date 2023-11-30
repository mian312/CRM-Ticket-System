import React from 'react';
import { Button, Table } from 'react-bootstrap';


interface TrainTableProps {
    Trains: any[];
    onBookTrain: (trainName: string, trainNumber: string) => void;
}

const TrainTable: React.FC<TrainTableProps> = ({ Trains, onBookTrain }) => (
    <Table striped bordered hover>
        <thead>
            <tr>
                <th>#</th>
                <th>Train Number</th>
                <th>Train Full Name</th>
                <th>Departure Time</th>
                <th>Arrival Time</th>
                <th>Available Classes</th>
            </tr>
        </thead>
        <tbody>
            {Trains.length ? (
                Trains.map((row, index) => (
                    <tr key={row.trainNumber}>
                        <td>{index + 1}</td>
                        <td>{row.trainNumber}</td>
                        <td>{row.trainFullName}</td>
                        <td>{row.stationFrom.departureTime}</td>
                        <td>{row.stationTo.arrivalTime}</td>
                        <td>{row.availableClasses.join(', ')}</td>
                        <td>
                            <div className="text-center">
                                <Button variant="primary"
                                    onClick={() => onBookTrain(row.trainFullName, row.trainNumber)}
                                >
                                    Book Train
                                </Button>
                            </div>
                        </td>
                    </tr>
                ))
            ) : (
                <tr>
                    <td colSpan={6} className="text-center">
                        No Trains to show
                    </td>
                </tr>
            )}
        </tbody>
    </Table>
);

export default TrainTable;
