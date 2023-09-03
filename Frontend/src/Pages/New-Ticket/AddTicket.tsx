import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";

import { shortText } from "../../utils/validation";
import { BreadCrumb } from "../../Components/BreadCrumbs/BreadCrumb";
import AddTicketForm from "../../Components/Tickets/Add-Ticket/AddTicketForm";
import { Helmet } from "react-helmet-async";

const initialFrmDt = {
    subject: "",
    issueDate: "",
    detail: "",
};
const initialFrmError = {
    subject: false,
    issueDate: false,
    detail: false,
};
export const AddTicket = () => {
    const [frmData, setFrmData] = useState(initialFrmDt);
    const [frmDataErro, setFrmDataErro] = useState(initialFrmError);
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

        console.log("Form submit request received", frmData);
    };

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