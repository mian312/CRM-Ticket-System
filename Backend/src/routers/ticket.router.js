import { Router } from "express";
import { deleteTicket, getTicketById, getTickets, insertTicket, updateClientReply, updateStatusClose } from "../model/ticket/Ticket.model.js";
import { userAuthorization } from "../middleware/authorization.middleware.js";
import { createNewTicketValidation, replyTicketMessageValidation } from "../middleware/formValidation.middleware.js";
const router = Router();

router.all("/", (req, res, next) => {
  // res.json({ message: "return form ticket router" });
  next();
});


//* Define router for creating a new ticket
router.post("/", createNewTicketValidation, userAuthorization, async (req, res) => {
  try {
    // Destructure subject, sender, and message from the request body
    const { subject, sender, message, issueDate, trainNumber } = req.body;

    const userId = req.userId;

    // Create a ticket object with the provided data
    const ticketObj = {
      clientId: userId,
      subject,
      openAt: new Date(),
      issueDate,
      trainNumber,
      conversations: [
        {
          sender,
          message,
        },
      ],
    };

    // Call the "insertTicket" function to save the new ticket
    const result = await insertTicket(ticketObj);

    // Check if the result has a valid _id
    if (result._id) {
      // If successful, return a JSON response with success message
      return res.json({
        status: "success",
        message: "New ticket has been created!",
      });
    }

    // If the result doesn't have a valid _id, return an error response
    res.json({
      status: "error",
      message: "Unable to create the ticket, please try again later",
    });
  } catch (error) {
    // If an error occurs, return an error response with the error message
    res.json({ status: "error", message: error.message });
  }
});

//* Define router for getting all tickets
router.get("/", userAuthorization, async (req, res) => {
  try {
    // Retrieve the user's ID from the request object
    const userId = req.userId;

    // Call the "getTickets" function to retrieve tickets associated with the user
    const result = await getTickets(userId);

    // If the operation is successful, return a JSON response with the tickets
    return res.json({
      status: "success",
      result,
    });
  } catch (error) {
    // If an error occurs, return an error response with the error message
    res.json({ status: "error", message: error.message });
  }
});

//* Get specefic ticket of a user
router.get("/:_id", userAuthorization, async (req, res) => {
  try {
    // Retrive the ticket ID from the request parameters
    const { _id } = req.params;

    // Retrieve the user's ID from the request object
    const clientId = req.userId;
    // Call the "getTicketById" function to retrieve the ticket associated with the user
    const result = await getTicketById(_id, clientId);

    // If the operation is successful, return a JSON response with the ticket
    return res.json({
      status: "success",
      result,
    });
  } catch (error) {
    // If an error occurs, return an error response with the error message
    return res.json({ status: "error", message: error.message });
  }
});

//* update reply message form client
router.put("/:_id", replyTicketMessageValidation, userAuthorization, async (req, res) => {
  try {
    // Destructure message and sender from the request body
    const { message, sender } = req.body;
    // Retrive the ticket ID from the request parameters
    const { _id } = req.params;
    // Retrieve the user's ID from the request object
    const clientId = req.userId;

    // Call the "updateClientReply" function to update the reply message
    const result = await updateClientReply({ _id, message, sender });

    // If the operation is successful, return a JSON response with the updated ticket
    if (result._id) {
      return res.json({
        status: "success",
        message: "your message updated",
      });
    }

    // If the operation is unsuccessful, return an error response
    return res.json({
      status: "error",
      message: "Unable to update your message please try again later",
    });
  } catch (error) {
    // If an error occurs, return an error response with the error message
    return res.json({ status: "error", message: error.message });
  }
});

//* update ticket status to close
router.patch("/close-ticket/:_id", userAuthorization, async (req, res) => {
  try {
    // Retrive the ticket ID from the request parameters
    const { _id } = req.params;
    // Retrieve the user's ID from the request object
    const clientId = req.userId;

    // Call the "updateStatusClose" function to update the ticket status to close
    const result = await updateStatusClose({ _id, clientId });

    // If the operation is successful, return a JSON response with the updated ticket
    if (result._id) {
      return res.json({
        status: "success",
        message: "The ticket has been closed",
      });
    }

    // If the operation is unsuccessful, return an error response
    return res.json({
      status: "error",
      message: "Unable to update the ticket",
    });
  } catch (error) {
    // If an error occurs, return an error response with the error message
    return res.json({ status: "error", message: error.message });
  }
});

//* Delete a ticket
router.delete("/:_id", userAuthorization, async (req, res) => {
  try {
    // Retrive the ticket ID from the request parameters
    const { _id } = req.params;
    // Retrieve the user's ID from the request object
    const clientId = req.userId;

    // Call the "deleteTicket" function to delete the ticket
    const result = await deleteTicket({ _id, clientId });

    // If the operation is successful, return a JSON response with the updated ticket
    if (result) {
      return res.json({
        status: "success",
        message: "The ticket has been deleted",
      });
    }

    // If the operation is unsuccessful, return an error response
    return res.json({
      status: "error",
      message: "Ticket not found",
    });
  } catch (error) {
    // If an error occurs, return an error response with the error message
    return res.json({ status: "error", message: error.message });
  }
});

export default router;
