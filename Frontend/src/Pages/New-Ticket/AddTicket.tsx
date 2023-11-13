import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import { shortText } from "../../utils/validation";
import { BreadCrumb } from "../../Components/BreadCrumbs/BreadCrumb";
import AddTicketForm from "../../Components/Tickets/Add-Ticket/AddTicketForm";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { openNewTicket } from "./addTicketAction";
import Error from "../../Components/Shared/Error";
import Loading from "../../Components/Shared/Loading";

const initialFrmDt = {
    subject: "",
    issueDate: "",
    message: "",
};
const initialFrmError = {
    subject: false,
    issueDate: false,
    message: false,
};
export const AddTicket = () => {
    const [frmData, setFrmData] = useState(initialFrmDt);
    const [frmDataErro, setFrmDataErro] = useState(initialFrmError);

    const dispatch = useDispatch();

    const {
        user: { name },
    } = useSelector((state: any) => state.user);

    const { isLoading, error, successMsg } = useSelector(
        (state: any) => state.openTicket
    );

    useEffect(() => { }, [frmData, frmDataErro]);

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        setFrmData({
            ...frmData,
            [name]: value,
        });
    };

    const handleOnSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setFrmDataErro(initialFrmError);

        const isSubjectValid = await shortText(frmData.subject);

        setFrmDataErro({
            ...initialFrmError,
            subject: !isSubjectValid,
        });
        try {
            dispatch(openNewTicket({ ...frmData, sender: name }));
            setFrmData(initialFrmDt);
            toast.success(successMsg)
        } catch (error: any) {
            toast.error(error)
        }
    };

    if (isLoading) return <Loading />
    if (error) return <Error Error={error} />

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
                    />
                </Col>
            </Row>
        </Container>
    );
};