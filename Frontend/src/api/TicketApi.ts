import Axios from "./Axios";

const accessJWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImczNjk1OTMwQGdtYWlsLmNvbSIsImlhdCI6MTY5ODkzNTg1NiwiZXhwIjoxNjk5MDIyMjU2fQ.Os4Dvq_cwItSm7KX3XgN9Ozmxwe3vTK8secpfMny_KM"

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