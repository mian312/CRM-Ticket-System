import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
// import tickets from "../../assets/data/dummy-tickets.json";
import MessageHistory from "../../Components/Messages/message-history/MessageHistory";
import { BreadCrumb } from "../../Components/BreadCrumbs/BreadCrumb";
import UpdateTicket from "../../Components/Tickets/Update-Ticket/UpdateTicket";
import { useParams } from "react-router-dom";
// import { Ticket } from "../../assets/interface/interface";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../Components/Shared/Loading";
import Error from "../../Components/Shared/Error";
import { fetchSingleTicket } from "./singleTicketAction";

const ViewTicket: React.FC = () => {
    const { tId } = useParams<{ tId: string }>();
    const [message, setMessage] = useState<string>(""); const dispatch = useDispatch();
    const { isLoading, error, selectedTicket } = useSelector(
        (state: any) => state.singleTicket
    )


    useEffect(() => {
        dispatch(fetchSingleTicket(tId));
    }, [message, tId, dispatch]);


    const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.target.value);
    };

    const handleOnSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        toast.success("Form submitted!"); // Corrected the typo in "submitted"
    };

    if (isLoading) return <Loading />;
    if (error) return <Error Error={error} />;

    return (
        <Container>
            <Row>
                <Col>
                    <BreadCrumb page="Tickets" />
                </Col>
            </Row>
            <Row>
                <Col className="text-weight-bolder text-secondary">
                    {selectedTicket && (
                        <>
                            <div className="subject">Subject: {selectedTicket.subject}</div>
                            <div className="date">Ticket Opened: {selectedTicket.openAt}</div>
                            <div className="status">Status: {selectedTicket.status}</div>
                        </>
                    )}
                </Col>
                <Col className="text-right">
                    <Button variant="outline-info">Close Ticket</Button>
                </Col>
            </Row>
            <Row className="mt-4">
                <Col>
                    <MessageHistory msg={selectedTicket?.conversations || []} />
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
