import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

interface LoginProps {
    handleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleOnSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    formSwitcher: (frmType: string) => void;
    email: string;
    pass: string;
}

const LoginForm: React.FC<LoginProps> = ({
    handleOnChange,
    handleOnSubmit,
    formSwitcher,
    email,
    pass,
}) => {
    return (
        <Container>
            <Row>
                <Col>
                    <h1 className="text-info text-center">Client Login</h1>
                    <hr />
                    <Form autoComplete="off" onSubmit={handleOnSubmit}>
                        <Form.Group>
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={email} required
                                onChange={handleOnChange}
                                placeholder="Enter Email"
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                onChange={handleOnChange}
                                value={pass} required
                                placeholder="password"
                            />
                        </Form.Group>

                        <Button type="submit" >Login</Button>
                    </Form>
                    <hr />
                </Col>
            </Row>

            <Row className="justify-content-center">
                <Col xs='auto'>
                    <Link to='#' onClick={() => formSwitcher("rest")}>
                        Forget Password?
                    </Link>
                </Col>
            </Row>
        </Container>
    );
};

export default LoginForm;
