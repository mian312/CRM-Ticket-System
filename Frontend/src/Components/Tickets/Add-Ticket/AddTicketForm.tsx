import React from "react";
import { Form, Row, Col, Button } from "react-bootstrap";

import "./add-ticket-form.style.css";

interface FormDataError {
  subject: boolean;
  // Add more fields if needed
}

interface FormData {
  subject: string;
  issueDate: string;
  message: string;
}

interface AddTicketFormProps {
  handleOnSubmit: (e: React.FormEvent) => void;
  handleOnChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  frmDataErro: FormDataError;
  frmDt: FormData;
}

const AddTicketForm: React.FC<AddTicketFormProps> = ({
  handleOnSubmit,
  handleOnChange,
  frmDataErro,
  frmDt,
}) => {
  console.log(frmDt);
  return (
    <div className="mt-3 add-new-ticket bg-light jumbotron mb-3">
      <h1 className="text-info text-center">Add New Ticket</h1>
      <hr />
      <Form autoComplete="off" onSubmit={handleOnSubmit}>
        <Form.Group as={Row} className='my-2'>
          <Form.Label column sm={3}>
            Subject
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              name="subject"
              value={frmDt.subject}
              minLength={3}
              maxLength={100}
              onChange={handleOnChange}
              placeholder="Subject"
              required
            />
            <Form.Text className="text-danger">
              {frmDataErro.subject && "Subject is required!"}
            </Form.Text>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className='my-2'>
          <Form.Label column sm={3}>
            Date
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              type="date"
              name="issueDate"
              value={frmDt.issueDate}
              onChange={handleOnChange}
              required
            />
          </Col>
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            as="textarea"
            name="message"
            rows={5}
            value={frmDt.message}
            onChange={handleOnChange}
            required
          />
        </Form.Group>

        <Button type="submit" variant="info" className="d-block">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default AddTicketForm;
