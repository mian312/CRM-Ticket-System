import { TicketSchema } from "./Ticket.schema.js";

//* Define function to insert a new ticket
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


//* Define function to get all tickets
const getTickets = (clientId) => {
    // Return a Promise that handles the ticket retrieval
    return new Promise((resolve, reject) => {
        try {
            // Create a new instance of the TicketSchema and save it
            TicketSchema.find({ clientId })
                .then((data) => resolve(data))  // If search is successful, resolve with the found data
                .catch((error) => reject(error));   // If there's an error during search, reject with the error

        } catch (error) {
            reject(error);  // Catch and reject any other errors
        }
    });
};


//* Define function to get ticket by ID
const getTicketById = (_id, clientId) => {
    // Return a Promise that handles the ticket retrieval
    return new Promise((resolve, reject) => {
        try {
            // Create a new instance of the TicketSchema and save it
            TicketSchema.find({ _id, clientId })
                .then((data) => resolve(data))  // If search is successful, resolve with the found data
                .catch((error) => reject(error));   // If there's an error during search, reject with the error
        } catch (error) {
            reject(error);
        }
    });
};


//* Define function to update client reply
const updateClientReply = ({ _id, message, sender }) => {
    // Return a Promise that handles the ticket retrieval
    return new Promise((resolve, reject) => {
        try {
            // Create a new instance of the TicketSchema and save it
            TicketSchema.findOneAndUpdate(
                { _id },
                {
                    status: "Pending operator response",
                    $push: {
                        conversations: { message, sender },
                    },
                },
                { new: true }
            )
                .then((data) => resolve(data)) // If search is successful, resolve with the found data
                .catch((error) => reject(error));   // If there's an error during search, reject with the error
        } catch (error) {
            // Catch and reject any other errors
            reject(error);
        }
    });
};


//* Define function to update status to close
const updateStatusClose = ({ _id, clientId }) => {
    // Return a Promise that handles the ticket retrieval
    return new Promise((resolve, reject) => {
        try {
            // Create a new instance of the TicketSchema and save it
            TicketSchema.findOneAndUpdate(
                { _id, clientId },
                {
                    status: "Closed",
                },
                { new: true }
            )
                .then((data) => resolve(data)) // If search is successful, resolve with the found data
                .catch((error) => reject(error));   // If there's an error during search, reject with the error
        } catch (error) {
            // Catch and reject any other errors
            reject(error);
        }
    });
};


//* Define function to delete ticket
const deleteTicket = ({ _id, clientId }) => {
    // Return a Promise that handles the ticket deletion
    return new Promise((resolve, reject) => {
        try {
            // Create a new instance of the TicketSchema and save it
            TicketSchema.findOneAndDelete({ _id, clientId })
                .then((data) => resolve(data))  // If search is successful, resolve with the found data
                .catch((error) => reject(error));  // If there's an error during search, reject with the error
        } catch (error) {
            // Catch and reject any other errors
            reject(error);
        }
    });
};


export {
    insertTicket,
    getTickets,
    getTicketById,
    updateClientReply,
    updateStatusClose,
    deleteTicket
};
