import React, { useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { BreadCrumb } from "../../Components/BreadCrumbs/BreadCrumb";
import TicketTable from "../../Components/Tickets/TicketTable/TicketTable";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllTickets } from "../Ticket-Listing/ticketsAction";
import { Ticket } from "../../assets/interface/interface";

export const Dashboard: React.FC = () => {
    const navigate = useNavigate();

    const handleOnClick = (e: React.MouseEvent) => {
        e.preventDefault();
        navigate('/add-ticket')
    }
    const dispatch = useDispatch();
    const { tickets } = useSelector((state: any) => state.tickets);

    useEffect(() => {
        dispatch(fetchAllTickets());
    }, []);

    const pendingTickets = tickets?.filter((row: Ticket) => row.status !== "Closed");
    const totlatTickets = tickets?.length;

    return (
        <Container>
            <Helmet><title>Ticket Dashboard</title></Helmet>
            <Row>
                <Col>
                    <BreadCrumb page="Dashboard" />
                </Col>
            </Row>
            <Row>
                <Col className="text-center mt-5 mb-2">
                    <Button
                        variant="info"
                        style={{ fontSize: "2rem", padding: "10px 30px" }}
                        onClick={handleOnClick}
                    >
                        Add New Ticket
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col className="text-center  mb-2">
                    <div>Total tickets: {totlatTickets}</div>
                    <div>Pending tickets: {pendingTickets?.length}</div>
                </Col>
            </Row>
            <Row>
                <Col className="mt-2">Recently Added tickets</Col>
            </Row>
            <hr />

            <Row>
                <Col className="recent-ticket">
                    <TicketTable tickets={tickets} />
                </Col>
            </Row>
        </Container>
    );
};