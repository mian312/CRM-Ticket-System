import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import SearchForm from "../../Components/Search/SearchForm";
import TicketTable from "../../Components/Tickets/TicketTable/TicketTable";
import { BreadCrumb } from "../../Components/BreadCrumbs/BreadCrumb";
// import tickets from "../../assets/data/dummy-tickets.json";
// import { Ticket } from '../../assets/interface/interface';
import { Helmet } from "react-helmet-async";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllTickets, filterSearchTicket } from "./ticketsAction";
import Loading from "../../Components/Shared/Loading";
import Error from "../../Components/Shared/Error";

const TicketLists: React.FC = () => {
    const navigate: NavigateFunction = useNavigate();
    const [str, setStr] = useState<string>("");
    const dispatch = useDispatch();
    // const [dispTicket, setDispTicket] = useState<Ticket[]>(tickets);

    const { searchTicketList, isLoading, error } = useSelector(
        (state: any) => state.tickets
    );


    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setStr(value)

        dispatch(filterSearchTicket(value));
    };

    // const searchTicket = (sttr: string) => {
    //     const displayTickets = tickets.filter((row) =>
    //         row.subject?.toLowerCase().includes(sttr.toLowerCase())
    //     );

    //     setDispTicket(displayTickets);
    // };

    useEffect(() => {
        dispatch(fetchAllTickets());
    }, [dispatch]);

    if (isLoading) return <Loading/>;
    if (error) return <Error Error={error}/>;

    return (
        <Container>
            <Helmet><title>Ticket List</title></Helmet>
            <Row>
                <Col>
                    <BreadCrumb page="Ticket Lists" />
                </Col>
            </Row>
            <Row className="mt-4">
                <Col>
                    <Button variant="info" onClick={() => navigate('/add-ticket')}>Add New Ticket</Button>
                </Col>
                <Col className="text-right">
                    <SearchForm handleOnChange={handleOnChange} str={str} />
                </Col>
            </Row>
            <hr />
            <Row>
                <Col>
                    <TicketTable tickets={searchTicketList} />
                </Col>
            </Row>
        </Container>
    );
};

export default TicketLists;
