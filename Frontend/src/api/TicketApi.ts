import Axios from "./Axios";

const accessJWT = sessionStorage.getItem("accessJWT");

//* Calling API to get all tickets
export const getAllTickets = () => {
    // Creating promise to get all tickets
    return new Promise(async (resolve, reject) => {
        try {
            // Saving API response to get all tickets
            const result = await Axios.get("/api/ticket", {
                headers: {
                    Authorization: accessJWT,
                },
            });

            // Returning result 
            resolve(result);
        } catch (error) {
            // Handling error
            reject(error);
        }
    });
};

//* Calling API to get ticket by _id
export const getSingleTicket = (_id: string) => {
    // Creating promise to get ticket by _id
    return new Promise(async (resolve, reject) => {
        try {
            // Saving API response to get ticket by _id
            const result = await Axios.get(`/api/ticket/${_id}`, {
                headers: {
                    Authorization: accessJWT,
                },
            });

            // Returning result
            resolve(result);
        } catch (error) {
            // Handling error
            reject(error);
        }
    });
};

//* Calling API to reply ticket
export const updateReplyTicket = (_id: string, msgObj: object) => {
    // Creating promise to reply ticket
    return new Promise(async (resolve, reject) => {
        try {
            // Saving API response to reply ticket
            const result = await Axios.put(`/api/ticket/${_id}`, msgObj, {
                headers: {
                    Authorization: accessJWT,
                },
            });

            // Returning result
            resolve(result.data);
        } catch (error: any) {
            // Handling error
            reject(error);
        }
    });
};

//* Calling API to close ticket
export const updateTicketStatusClosed = (_id: string) => {
    // Creating promise to close ticket
    return new Promise(async (resolve, reject) => {
        try {
            // Saving API response to close ticket
            const result = await Axios.patch(
                `/api/ticket/close-ticket/${_id}`,
                {
                    // Giving empty body
                },
                {
                    headers: {
                        Authorization: accessJWT,
                    },
                }
            );

            // Returning result
            resolve(result.data);
        } catch (error: any) {
            // Handling error
            reject(error);
        }
    });
};