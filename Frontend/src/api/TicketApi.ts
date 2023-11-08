import Axios from "./Axios";

const accessJWT = sessionStorage.getItem("accessJWT");

export const getAllTickets = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await Axios.get("/api/ticket", {
                headers: {
                    Authorization: accessJWT,
                },
            });

            resolve(result);
        } catch (error) {
            reject(error);
        }
    });
};

export const getTicketById = (ticketId: string) => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await Axios.get(`/api/ticket/${ticketId}`, {
                headers: {
                    Authorization: accessJWT,
                },
            });

            resolve(result);
        } catch (error) {
            reject(error);
        }
    });
};