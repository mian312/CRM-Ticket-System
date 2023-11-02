import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

interface ErrProps {
    Error: string
}

const Error: React.FC<ErrProps> = ({ Error }) => {
    return (
        <Container>
            <Row>
                <Col>
                    <h1 className="text-danger">404 Error</h1>
                    <p className="text-danger">{Error}</p>
                    <Link to="/" className='btn btn-danger'>Go Home</Link>
                </Col>
            </Row>
        </Container>
    )
}

export default Error
