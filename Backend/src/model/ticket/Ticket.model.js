import { TicketSchema } from "./Ticket.schema.js";

// Define function to insert a new ticket
const insertTicket = (ticketObj) => {
  // Return a Promise that handles the ticket insertion
  return new Promise((resolve, reject) => {
    try {
      // Create a new instance of the TicketSchema and save it
      new TicketSchema(ticketObj)
        .save()
        .then((data) => resolve(data)) // If the save is successful, resolve with the saved data
        .catch((error) => reject(error)); // If there's an error during save, reject with the error
    } catch (error) {
      reject(error); // Catch and reject any other errors
    }
  });
};

export default insertTicket;
