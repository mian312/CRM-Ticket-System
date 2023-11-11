import Axios from "./Axios";


//* Calling user login API
export const userLogin = (frmData: any) => {
    // Creating promise to call the request
    return new Promise(async (resolve, reject) => {
        try {
            // Calling the API
            const res = await Axios.post('/api/user/login', frmData);

            // Returning the response
            resolve(res.data);

            // Setting the JWT token in session storage
            if (res.data.status === "success") {
                sessionStorage.setItem("accessJWT", res.data.accessJWT);
                localStorage.setItem(
                    "crmSite",
                    JSON.stringify({ refreshJWT: res.data.refreshJWT })
                );
            }
        } catch (error) {
            // Handling the error
            reject(error);
        }
    });
};

//* Calling user details API
export const fetchUser = () => {
    // Creating promise to call the request
    return new Promise(async (resolve, reject) => {
        try {
            // Getting the accessJWT token from session storage
            const accessJWT = sessionStorage.getItem("accessJWT");

            // Checking if the token is present
            if (!accessJWT) {
                reject("Token not found!");
            }

            // Calling the API
            const res = await Axios.post('/api/user', {
                // Sending empty JSON body
            }, {
                headers: {
                    authorization: accessJWT,
                },
            });

            // Returning the response
            resolve(res.data);
        } catch (error: any) {
            // Handling the error
            reject(error.message);
        }
    });
};

//* Calling user logout API
export const userLogout = async () => {
    try {
        // Calling the API
        await Axios.delete('/api/user/logout', {
            headers: {
                Authorization: sessionStorage.getItem("accessJWT"),
            },
        });
    } catch (error) {
        // Handling the error
        console.log(error);
    }
};

//* Calling new access JWT API
export const fetchNewAccessJWT = () => {
    // Creating promise to call the request
    return new Promise(async (resolve, reject) => {
        try {
            // Getting the refreshJWT token from local storage
            const { refreshJWT } = JSON.parse(
                localStorage.getItem("crmSite") || ''
            );

            // Checking if the token is present
            if (!refreshJWT) {
                reject("Token not found!");
            }

            // Calling the API
            const res = await Axios.get('/api/tokens', {
                headers: {
                    Authorization: refreshJWT,
                },
            });

            // Setting the JWT token in session storage
            if (res.data.status === "success") {
                sessionStorage.setItem("accessJWT", res.data.accessJWT);
            }

            // Returning the response
            resolve(true);
        } catch (error: any) {
            // Handling specific error message
            if (error.message === "Request failed with status code 403") {
                localStorage.removeItem("crmSite");
            }

            // Handling the error
            reject(false);
        }
    });
};