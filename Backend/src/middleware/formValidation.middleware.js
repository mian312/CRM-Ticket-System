import Joi from "joi";

// Define a Joi schema for email or phone validation
const emailOrPhone = Joi.alternatives().try(
    Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
    }),
    Joi.string().pattern(new RegExp('^[0-9]{10}$'))
);

// Define a Joi schema for PIN validation
const pin = Joi.number().min(100000).max(999999).required();

// Define a Joi schema for new password validation
const newPassword = Joi.string().min(3).max(30).required();

// Define Joi schemas for string validation
const shortStr = Joi.string().min(2).max(500);
const longStr = Joi.string().min(2).max(1000);

// Define Joi schemas for date validation
const dt = Joi.date();

//* Validation middleware for reset password request
const resetPassReqValidation = (req, res, next) => {
    // Create a Joi schema for email or phone validation
    const schema = Joi.object({ input: emailOrPhone });

    // Validate the request body using the schema
    const value = schema.validate(req.body);

    if (value.error) {
        // If validation fails, send an error response
        return res.json({ status: "error", message: value.error.message });
    }

    // If validation passes, continue to the next middleware
    next();
};

//* Validation middleware for updating the password
const updatePassValidation = (req, res, next) => {
    // Create a Joi schema for email or phone, PIN, and new password validation
    const schema = Joi.object({ input: emailOrPhone, pin, newPassword });

    // Validate the request body using the schema
    const value = schema.validate(req.body);

    if (value.error) {
        // If validation fails, send an error response
        return res.json({ status: "error", message: value.error.message });
    }

    // If validation passes, continue to the next middleware
    next();
};

//* Validation middleware for creating a new ticket
const createNewTicketValidation = (req, res, next) => {
    // Create a Joi schema for subject, sender, and message validation
    const schema = Joi.object({
        subject: shortStr.required(),
        sender: shortStr.required(),
        message: longStr.required(),
        issueDate: dt.required(),
        trainNumber: shortStr.required(),
    });

    // Validate the request body using the schema
    const value = schema.validate(req.body);

    // If validation fails, send an error response
    if (value.error) {
        return res.json({ status: "error", message: value.error.message });
    }

    // If validation passes, continue to the next middleware
    next();
};

//* Validation middleware for replying ticket message
const replyTicketMessageValidation = (req, res, next) => {
    // Create a Joi schema for sender and message validation
    const schema = Joi.object({
        sender: shortStr.required(),
        message: longStr.required(),
    });

    // Validate the request body using the schema
    const value = schema.validate(req.body);

    // If validation fails, send an error response
    if (value.error) {
        return res.json({ status: "error", message: value.error.message });
    }

    // If validation passes, continue to the next middleware
    next();
};


export {
    resetPassReqValidation,
    updatePassValidation,
    createNewTicketValidation,
    replyTicketMessageValidation
};
