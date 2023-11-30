import React from "react";
import { Form, Button } from "react-bootstrap";

interface UpdateTicketProps {
  msg: string;
  handleOnChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleOnSubmit: (e: React.FormEvent) => void;
  status: string;
}

const UpdateTicket: React.FC<UpdateTicketProps> = ({ msg, handleOnChange, handleOnSubmit, status }) => {
  return (
    <Form onSubmit={handleOnSubmit}>
      <Form.Label>Reply</Form.Label>
      <Form.Text>Please reply your message here or update the ticket</Form.Text>
      <Form.Control
        value={msg}
        onChange={handleOnChange}
        as="textarea"
        rows={5}
        name="detail"
      />
      <div className="text-right mt-3 mb-3">
        <Button variant="info" type="submit" disabled={status === "Closed"}>
          Reply
        </Button>
      </div>
    </Form>
  );
};

export default UpdateTicket;
