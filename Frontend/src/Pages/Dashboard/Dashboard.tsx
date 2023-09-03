import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { BreadCrumb } from "../../Components/BreadCrumbs/BreadCrumb";
import TicketTable from "../../Components/Tickets/TicketTable";
import tickets from "../../assets/data/dummy-tickets.json";

export const Dashboard: React.FC = () => {
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
                    >
                        Add New Ticket
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col className="text-center  mb-2">
                    <div>Total tickets: 50</div>
                    <div>Pending tickets: 5</div>
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