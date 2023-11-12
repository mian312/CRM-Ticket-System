import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Alert } from "react-bootstrap";
import MessageHistory from "../../Components/Messages/message-history/MessageHistory";
import { BreadCrumb } from "../../Components/BreadCrumbs/BreadCrumb";
import UpdateTicket from "../../Components/Tickets/Update-Ticket/UpdateTicket";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../Components/Shared/Loading";
import Error from "../../Components/Shared/Error";
import { closeTicket, fetchSingleTicket, replyOnTicket } from "./singleTicketAction";

const ViewTicket: React.FC = () => {
    const { tId } = useParams<{ tId: string }>();
    const [message, setMessage] = useState<string>("");
    const dispatch = useDispatch();
    const { isLoading, error, selectedTicket, replyMsg } = useSelector(
        (state: any) => state.singleTicket
    );
    const {
        user: { name },
    } = useSelector((state: any) => state.user);


    useEffect(() => {
        dispatch(fetchSingleTicket(tId));
        console.log('ticket', selectedTicket)
    }, [tId, dispatch]);


    const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.target.value);
    };


    const handleOnSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const msgObj = {
            message,
            sender: name,
        };

        dispatch(replyOnTicket(tId, msgObj));
        setMessage("");

        toast.success(replyMsg); // Corrected the typo in "submitted"
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
                            <div className="date">
                                Ticket Opened: {" "}
                                {selectedTicket.openAt &&
                                    new Date(selectedTicket.openAt).toLocaleString()}
                            </div>
                            <div className="status">Status: {selectedTicket.status}</div>
                        </>
                    )}
                </Col>
                <Col className="text-right">
                    {selectedTicket?.status === "Closed"
                        ? <Alert variant="danger" className="text-center">This ticket is closed</Alert>
                        : <Button
                            variant="outline-info"
                            onClick={() => dispatch(closeTicket(tId))}
                        >
                            Close Ticket
                        </Button>

                    }
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
