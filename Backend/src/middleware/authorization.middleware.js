import { verifyAccessJWT } from "../helpers/jwt.helper.js";
import { getJWT } from "../helpers/redis.helper.js";

//* Middleware function for user authorization
const userAuthorization = async (req, res, next) => {
    //^ Extract the authorization token from the request headers
    const { authorization } = req.headers;

    //^ Verify the access JWT token
    const decoded = await verifyAccessJWT(authorization);
    
    //^ Check if the decoded JWT contains an email
    if (decoded.email) {
        //^ Retrieve the user ID from Redis using the JWT token
        const userId = await getJWT(authorization);

        //^ If the user ID is not found in Redis, return a 403 Forbidden response
        if (!userId) {
            return res.status(403).json({ message: "Forbidden" });
        }

        //^ Set the user ID in the request object for later use
        req.userId = userId;

        //^ Continue to the next middleware or route handler
        return next();
    }

    //^ If the decoded JWT does not contain an email, return a 403 Forbidden response
    return res.status(403).json({ message: "Forbidden" });
};

//* Export the userAuthorization function to make it accessible to other modules
export {
    userAuthorization
};
