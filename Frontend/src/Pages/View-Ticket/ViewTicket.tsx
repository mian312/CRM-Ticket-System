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
import { Helmet } from "react-helmet-async";

const ViewTicket: React.FC = () => {
    const { tId } = useParams<{ tId: string }>();
    const [message, setMessage] = useState<string>("");
    const dispatch = useDispatch();
    const { isLoading, error, selectedTicket, replyMsg, replyTicketError } = useSelector(
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

        try {
            dispatch(replyOnTicket(tId, msgObj));
            setMessage("");

            toast.success(replyMsg);
        } catch (error) {
            toast.error(replyTicketError);
        }
    };

    if (isLoading) return <Loading />;
    if (error) return <Error Error={error} />;

    return (
        <Container>
            <Helmet>
                {/* <title> {selectedTicket?.subject} - Ticket View Page - CRM Ticket System </title> */}
            </Helmet>
            <Row>
                <Col>
                    <BreadCrumb page="Tickets" />
                </Col>
            </Row>
            <Row>
                <Col className="text-weight-bolder text-secondary">
                    {selectedTicket && (
                        <>
                            <div className="subject">Train Number: {selectedTicket.trainNumber}</div>
                            <div className="subject">Train Name: {selectedTicket.subject}</div>
                            <div className="date">
                                Ticket Opened: {" "}
                                {selectedTicket.openAt &&
                                    new Date(selectedTicket.openAt).toLocaleString()}
                            </div>
                            <div className="date">
                                Target Date: {" "}
                                {selectedTicket.issueDate &&
                                    new Date(selectedTicket.issueDate).toLocaleString()}
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
                        status={selectedTicket?.status}
                    />
                </Col>
            </Row>
        </Container>
    );
};

export default ViewTicket;
