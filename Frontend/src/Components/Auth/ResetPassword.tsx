import React, { useState } from "react";
import { Container, Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

interface ResetProps {
    handleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleOnResetSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    formSwitcher: (frmType: string) => void;
    input: string;
}

const ResetPassword: React.FC<ResetProps> = ({
    handleOnChange,
    handleOnResetSubmit,
    formSwitcher,
    input
}) => {
    const [isEmailInput, setIsEmailInput] = useState(true);

    const toggleInputType = () => {
        setIsEmailInput(!isEmailInput);
    };

    return (
        <Container>
            <Row>
                <Col>
                    <h1 className="text-info text-center">Reset Password</h1>
                    <hr />
                    <Form autoComplete="off" onSubmit={handleOnResetSubmit}>
                        <Form.Group>
                            <Form.Check
                                type="switch"
                                // label={isEmailInput ? "Email" : "Phone Number"}
                                id="inputTypeSwitch"
                                onChange={toggleInputType}
                                className="float-end"
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>{isEmailInput ? "Email Address" : "Phone Number"}</Form.Label>
                            {isEmailInput ? (
                                <Form.Control
                                    type="email"
                                    name="input"
                                    value={input}
                                    onChange={handleOnChange}
                                    placeholder="Enter Email"
                                    required
                                />
                            ) : (
                                <InputGroup className="mb-3">
                                    <InputGroup.Text id="basic-addon1">+91</InputGroup.Text>
                                    <Form.Control
                                        type="phone"
                                        name="input"
                                        value={input}
                                        onChange={handleOnChange}
                                        placeholder="Enter your phone number"
                                        required
                                    />
                                </InputGroup>
                            )}
                        </Form.Group>

                        <Button type="submit">Reset Password</Button>
                    </Form>
                    <hr />
                </Col>
            </Row>

            <Row className="justify-content-center">
                <Col xs="auto">
                    <Link to="#" onClick={() => formSwitcher("login")}>
                        Login Now
                    </Link>
                </Col>
            </Row>
        </Container>
    );
};

export default ResetPassword;
