import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import tickets from "../../assets/data/dummy-tickets.json";
import MessageHistory from "../../Components/Messages/message-history/MessageHistory";
import { BreadCrumb } from "../../Components/BreadCrumbs/BreadCrumb";
import UpdateTicket from "../../Components/Tickets/Update-Ticket/UpdateTicket";
import { useParams } from "react-router-dom";
import { Ticket } from "../../assets/interface/interface";
import { toast } from "react-toastify";

const ViewTicket: React.FC = () => {
    const { tId } = useParams<{ tId: string }>(); // Specify the type for tId

    const [message, setMessage] = useState<string>("");
    const [ticket, setTicket] = useState<Ticket | undefined>(); // Initialize ticket as undefined

    useEffect(() => {
        const foundTickets = tickets.filter((ticket) =>
            ticket.id === Number(tId)
        );
        console.log("Found Tickets:", foundTickets);

        if (foundTickets.length > 0) {
            setTicket(foundTickets[0]);  // Set ticket to the first found ticket
        } else {
            setTicket(undefined); // Set ticket to undefined if no matching tickets found
            toast.error('Ticket not found');
        }
    }, [tId]);


    const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.target.value);
    };

    const handleOnSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        toast.success("Form submitted!"); // Corrected the typo in "submitted"
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
                    {ticket && (
                        <>
                            <div className="subject">Subject: {ticket.subject}</div>
                            <div className="date">Ticket Opened: {ticket.addedAt}</div>
                            <div className="status">Status: {ticket.status}</div>
                        </>
                    )}
                </Col>
                <Col className="text-right">
                    <Button variant="outline-info">Close Ticket</Button>
                </Col>
            </Row>
            <Row className="mt-4">
                <Col>
                    <MessageHistory msg={ticket?.history || []} />
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
