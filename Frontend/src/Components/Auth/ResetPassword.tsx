import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

interface ResetProps {
    handleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleOnResetSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    formSwitcher: (frmType: string) => void;
    email: string;
}

const ResetPassword: React.FC<ResetProps> = ({
    handleOnChange,
    handleOnResetSubmit,
    formSwitcher,
    email,
}) => {
    return (
        <Container>
            <Row>
                <Col>
                    <h1 className="text-info text-center">Reset Password</h1>
                    <hr />
                    <Form autoComplete="off" onSubmit={handleOnResetSubmit}>
                        <Form.Group>
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={email}
                                onChange={handleOnChange}
                                placeholder="Enter Email"
                                required
                            />
                        </Form.Group>

                        <Button type="submit">Reset Password</Button>
                    </Form>
                    <hr />
                </Col>
            </Row>

            <Row className="justify-content-center">
                <Col xs='auto'>
                    <Link to='#' onClick={() => formSwitcher("login")}>
                        Login Now
                    </Link>
                </Col>
            </Row>
        </Container>
    );
};

export default ResetPassword;
