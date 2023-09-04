import React from "react";
import { Form, Row, Col } from "react-bootstrap";

interface SearchFormProps {
    handleOnChange: React.ChangeEventHandler,
    str: string | number | string[]
}

const SearchForm: React.FC<SearchFormProps> = ({ handleOnChange, str }) => {
    return (
        <div>
            <Form>
                <Form.Group as={Row}>
                    <Form.Label column sm="3">
                        Search:
                    </Form.Label>
                    <Col sm="9">
                        <Form.Control
                            name="searchStr"
                            onChange={handleOnChange}
                            value={str}
                            placeholder="Search ..."
                        />
                    </Col>
                </Form.Group>
            </Form>
        </div>
    );
};

export default SearchForm;
