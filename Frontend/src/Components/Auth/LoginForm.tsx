import React, { useState } from "react";
import { Container, Row, Col, Form, Button, InputGroup, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

interface LoginProps {
    handleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleOnSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    formSwitcher: (frmType: string) => void;
    input: string;
    pass: string;
}

const LoginForm: React.FC<LoginProps> = ({
    handleOnChange,
    handleOnSubmit,
    formSwitcher,
    input,
    pass,
}) => {
    const [isEmailInput, setIsEmailInput] = useState(true);
    const { isLoading, isAuth, error } = useSelector((state: any) => state.login);

    const toggleInputType = () => {
        setIsEmailInput(!isEmailInput);
    };

    return (
        <Container>
            <Row>
                <Col>
                    <h1 className="text-info text-center">Client Login</h1>
                    <hr />
                    <Form autoComplete="off" onSubmit={handleOnSubmit}>
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
                                    required
                                    onChange={handleOnChange}
                                    placeholder="Enter Email"
                                />
                            ) : (
                                <InputGroup className="mb-3">
                                    <InputGroup.Text id="basic-addon1">+91</InputGroup.Text>
                                    <Form.Control
                                        type="phone"
                                        name="input"
                                        value={input}
                                        required
                                        onChange={handleOnChange}
                                        placeholder="Enter your phone number"
                                    />
                                </InputGroup>
                            )}
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                onChange={handleOnChange}
                                value={pass}
                                required
                                placeholder="password"
                            />
                        </Form.Group>

                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? (
                                <Spinner variant="primary" animation="border" />
                            ) : (
                                "Login"
                            )}
                        </Button>

                    </Form>
                    <hr />
                </Col>
            </Row>

            <Row className="justify-content-center">
                <Col xs="auto">
                    <Link to="#" onClick={() => formSwitcher("rest")}>
                        Forget Password?
                    </Link>
                </Col>
            </Row>
        </Container>
    );
};

export default LoginForm;
