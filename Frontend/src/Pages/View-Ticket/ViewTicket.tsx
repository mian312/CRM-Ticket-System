import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import tickets from "../../assets/data/dummy-tickets.json";
import MessageHistory from "../../Components/Messages/message-history/MessageHistory";
import { BreadCrumb } from "../../Components/BreadCrumbs/BreadCrumb";
import UpdateTicket from "../../Components/Tickets/Update-Ticket/UpdateTicket";

const ticket = tickets[0];

const ViewTicket: React.FC = () => {
    const [message, setMessage] = useState("");
    useEffect(() => { }, [message]);

    const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.target.value);
    };

    const handleOnSubmit = () => {
        alert("Form submited!");
    };
    return (
        <Container>
            <Row>
                <Col>
                    <BreadCrumb page="Tickets" />
                </Col>
            </Row>
            <Row>
                <Col className="text-weight-bolder text-secondary">
                    <div className="subject">Subject: {ticket.subject}</div>
                    <div className="date">Ticket Opened: {ticket.addedAt}</div>
                    <div className="status">Status: {ticket.status}</div>
                </Col>
                <Col className="text-right">
                    <Button variant="outline-info">Close Ticket</Button>
                </Col>
            </Row>
            <Row className="mt-4">
                <Col>
                    <MessageHistory msg={ticket.history || []} />
                </Col>
            </Row>
            <hr />

            <Row className="mt-4">
                <Col>
                    <UpdateTicket
                        msg={message}
                        handleOnChange={handleOnChange}
                        handleOnSubmit={handleOnSubmit}
                    />
                </Col>
            </Row>
        </Container>
    );
};

export default ViewTicket;
