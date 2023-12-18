import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import { shortText } from "../../utils/validation";
import { BreadCrumb } from "../../Components/BreadCrumbs/BreadCrumb";
import AddTicketForm from "../../Components/Tickets/Add-Ticket/AddTicketForm";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { getTrains, openNewTicket, searcStations } from "./addTicketAction";
import Error from "../../Components/Shared/Error";
import Loading from "../../Components/Shared/Loading";
import { useNavigate } from "react-router-dom";
import { fetchAllTickets } from "../Ticket-Listing/ticketsAction";
import TrainTable from "../../Components/Trains/Train-Table/TrainTable";

const initialFrmDt = {
    fromStation: "",
    toStation: "",
    issueDate: "",
    message: "",
};
const initialFrmError = {
    fromStation: false,
    toStation: false,
    issueDate: false,
    message: false,
};
export const AddTicket = () => {
    const [frmData, setFrmData] = useState(initialFrmDt);
    const [frmDataErro, setFrmDataErro] = useState(initialFrmError);
    const [showTable, setShowTeble] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        user: { name },
    } = useSelector((state: any) => state.user);

    const { isLoading, trainsLoading, error, successMsg, stations, trains } = useSelector(
        (state: any) => state.openTicket
    );

    useEffect(() => { }, [frmData, frmDataErro]);

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        setFrmData({
            ...frmData,
            [name]: value,
        });

        if (name === 'fromStation' || name === 'toStation') {
            dispatch(searcStations(value, 5));
        }
    };

    const handleOnSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setFrmDataErro(initialFrmError);
        try {
            dispatch(getTrains(frmData.fromStation, frmData.toStation, frmData.issueDate))
            setShowTeble(true);

        } catch (error: any) {
            toast.error(error)
            setShowTeble(false);
        }
    };

    const BookTrain = async (trainName: string, trainNumber: string) => {
        try {
            dispatch(openNewTicket({
                sender: name,
                subject: trainName,
                issueDate: frmData.issueDate,
                trainNumber: trainNumber,
                message: frmData.message
            }))

            toast.success("Train is Booked")
            navigate('/dashboard')
        } catch (error: any) {
            toast.error(error)
        }
    }

    if (isLoading) return <Loading />
    // if (error) return <Error Error={error} />

    return (
        <Container>
            <Helmet><title>New Ticket</title></Helmet>
            <Row>
                <Col>
                    <BreadCrumb page="New Ticket" />
                </Col>
            </Row>

            <Row>
                <Col>
                    <AddTicketForm
                        handleOnChange={handleOnChange}
                        handleOnSubmit={handleOnSubmit}
                        frmDt={frmData}
                        frmDataErro={frmDataErro}
                        options={stations}
                    />
                </Col>
            </Row>

            <Row>
                {
                    showTable && <Col>
                        {trainsLoading
                            ? <Loading />
                            : <TrainTable
                                Trains={trains}
                                onBookTrain={BookTrain}
                            />
                        }
                    </Col>
                }
            </Row>
        </Container>
    );
};