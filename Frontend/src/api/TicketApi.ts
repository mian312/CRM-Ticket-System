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