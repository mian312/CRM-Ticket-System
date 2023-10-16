import { Router } from "express";
import { getTickets, insertTicket } from "../model/ticket/Ticket.model.js";
import { userAuthorization } from "../middleware/authorization.middleware.js";
const router = Router();

router.all("/", (req, res, next) => {
  // res.json({ message: "return form ticket router" });
  next();
});


//* Define router for creating a new ticket
router.post("/", async (req, res) => {
  try {
    // Destructure subject, sender, and message from the request body
    const { subject, sender, message } = req.body;

    // Create a ticket object with the provided data
    const ticketObj = {
      clientId: "6526b7ae4d41fb90b946e4f8", // Hardcoded clientId for now
      subject,
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


export default router;
