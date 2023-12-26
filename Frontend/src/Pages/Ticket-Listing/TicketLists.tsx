import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import SearchForm from "../../Components/Search/SearchForm";
import TicketTable from "../../Components/Tickets/TicketTable/TicketTable";
import { BreadCrumb } from "../../Components/BreadCrumbs/BreadCrumb";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllTickets, filterSearchTicket } from "./ticketsAction";
import Loading from "../../Components/Shared/Loading";
import Error from "../../Components/Shared/Error";

const TicketLists: React.FC = () => {
    const [str, setStr] = useState<string>("");
    const dispatch = useDispatch();

    const { searchTicketList, isLoading, error } = useSelector(
        (state: any) => state.tickets
    );


    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { value } = e.target;
        setStr(value)
        dispatch(filterSearchTicket(value) as any);
    };

    useEffect(() => {
        dispatch(fetchAllTickets() as any);
    }, [dispatch]);

    if (isLoading) return <Loading />;
    if (error) return <Error Error={error} />;

    return (
        <Container>
            <Helmet><title>Ticket List</title></Helmet>
            <Row>
                <Col>
                    <BreadCrumb page="Ticket Lists" />
                </Col>
            </Row>
            <Row className="mt-4">
                <Col></Col>
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
