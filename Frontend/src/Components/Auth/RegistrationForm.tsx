import React from "react";
import { Container, Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

interface PasswordError {
    isLengthValid: boolean;
    hasUpper: boolean;
    hasLower: boolean;
    hasNumber: boolean;
    hasSpecialChar: boolean;
    confirmPassword: boolean;
}

interface RegistrationFormProps {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    newUser: {
        name: string;
        phone: string;
        email: string;
        address: string;
        password: string;
        confirmPass: string;
    };
    passwordError: PasswordError;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({
    onChange,
    onSubmit,
    newUser,
    passwordError,
}) => {
    return (
        <Container>
            <Row>
                <Col>
                    <h1 className="text-info">User Registration</h1>
                </Col>
            </Row>
            <hr />

            <Row>
                <Col>
                    <Form onSubmit={onSubmit}>
                        <Form.Group>
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={newUser.name}
                                onChange={onChange}
                                placeholder="Your name"
                                required
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Phone</Form.Label>
                            <InputGroup>
                                <InputGroup.Text id="basic-addon1">+91</InputGroup.Text>
                                <Form.Control
                                    type="phone"
                                    name="phone"
                                    value={newUser.phone}
                                    onChange={onChange}
                                    placeholder="Phone"
                                    required
                                />
                            </InputGroup>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={newUser.email}
                                onChange={onChange}
                                placeholder="Enter email"
                                required
                            />
                        </Form.Group>


                        <Form.Group>
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                type="text"
                                name="address"
                                value={newUser.address}
                                onChange={onChange}
                                placeholder="Full address"
                                required
                            />
                        </Form.Group>


                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                value={newUser.password}
                                onChange={onChange}
                                placeholder="Password"
                                required
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="confirmPass"
                                value={newUser.confirmPass}
                                onChange={onChange}
                                placeholder="Confirm Password"
                                required
                            />
                        </Form.Group>

                        <ul className="mb-4">
                            <li className={passwordError.isLengthValid ? "text-success" : "text-danger"}>
                                Min 8 characters
                            </li>
                            <li className={passwordError.hasUpper ? "text-success" : "text-danger"}>
                                At least one upper case
                            </li>
                            <li className={passwordError.hasLower ? "text-success" : "text-danger"}>
                                At least one lower case
                            </li>
                            <li className={passwordError.hasNumber ? "text-success" : "text-danger"}>
                                At least one number
                            </li>
                            <li className={passwordError.hasSpecialChar ? "text-success" : "text-danger"}>
                                At least one special character (@ # $ % &)
                            </li>
                            <li className={passwordError.confirmPassword ? "text-success" : "text-danger"}>
                                Passwords match
                            </li>
                        </ul>


                        <Button
                            variant="primary"
                            type="submit"
                            disabled={Object.values(passwordError).includes(false)}
                        >
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>
            <Row className="py-4">
                <Col>
                    Already have an account <Link to="/">Login Now</Link>
                </Col>
            </Row>
        </Container>
    );
};

export default RegistrationForm;
