import React, { useState } from "react";
import { Form, Row, Col, Button, ListGroup } from "react-bootstrap";

import "./add-ticket-form.style.css";

interface FormDataError {
  fromStation: boolean;
  toStation: boolean;
  // Add more fields if needed
}

interface FormData {
  fromStation: string;
  toStation: string;
  issueDate: string;
  message: string;
}

interface AddTicketFormProps {
  handleOnSubmit: (e: React.FormEvent) => void;
  handleOnChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  frmDataErro: FormDataError;
  frmDt: FormData;
  options: [{
    id: number;
    stationCode: string;
    stationName: string;
  }];
}

const AddTicketForm: React.FC<AddTicketFormProps> = ({
  handleOnSubmit,
  handleOnChange,
  frmDataErro,
  frmDt,
  options,
}) => {
  const [fromStationFocused, setFromStationFocused] = useState(false);
  const [toStationFocused, setToStationFocused] = useState(false);

  const handleFromStationItemClick = (index: number) => {
    const selectedOption = options[index];
    handleOnChange({
      target: {
        name: "fromStation",
        value: selectedOption.stationCode,
      },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  const handleToStationItemClick = (index: number) => {
    const selectedOption = options[index];
    handleOnChange({
      target: {
        name: "toStation",
        value: selectedOption.stationCode,
      },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  // console.log(frmDt);
  return (
    <div className="mt-3 add-new-ticket bg-light jumbotron mb-3">
      <h1 className="text-info text-center">Add New Ticket</h1>
      <hr />
      <Form autoComplete="off" onSubmit={handleOnSubmit}>
        <Form.Group as={Row} className='my-2'>
          <Form.Label column sm={3}>
            Starting Station
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              name="fromStation"
              value={frmDt.fromStation}
              minLength={3}
              maxLength={100}
              onChange={handleOnChange}
              onFocus={() => setFromStationFocused(true)}
              onBlur={() => setFromStationFocused(false)}
              placeholder="fromStation"
              required
            />
            {fromStationFocused && Array.isArray(options) &&
              <ListGroup className="z-3 position-absolute">
                {options?.map((element, index) => (
                  <ListGroup.Item
                    key={index}
                    onMouseDown={() => handleFromStationItemClick(index)}
                  >
                    {element.stationName} - {element.stationCode}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            }
            <Form.Text className="text-danger">
              {frmDataErro.fromStation && "Starting station is required!"}
            </Form.Text>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className='my-2'>
          <Form.Label column sm={3}>
            Destination Station
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              name="toStation"
              value={frmDt.toStation}
              minLength={3}
              maxLength={100}
              onChange={handleOnChange}
              onFocus={() => setToStationFocused(true)}
              onBlur={() => setToStationFocused(false)}
              placeholder="toStation"
              required
            />
            {toStationFocused && Array.isArray(options) && (
              <ListGroup className="z-2 position-absolute">
                {options?.map((element, index) => (
                  <ListGroup.Item
                    key={index}
                    onMouseDown={() => handleToStationItemClick(index)}
                  >
                    {element.stationName} - {element.stationCode}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}

            <Form.Text className="text-danger">
              {frmDataErro.toStation && "Destination station is required!"}
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
          <Form.Label>Write a subject</Form.Label>
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
