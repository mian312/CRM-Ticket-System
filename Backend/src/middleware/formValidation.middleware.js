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
const newPassword = Joi.string().alphanum().min(3).max(30).required();

// Validation middleware for reset password request
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

// Validation middleware for updating the password
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

export { resetPassReqValidation, updatePassValidation };
