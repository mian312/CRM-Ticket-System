import mongoose from "mongoose";

const { Schema, model } = mongoose;

const ResetPinSchema = new Schema({
    pin: {
        type: String,
        maxlength: 6,
        minlength: 6,
    },
    input: {
        type: String,
        maxlength: 50,
        required: true,
    },
});

// Export the model using ES6 module syntax
export const ResetSchema = mongoose.model("Reset_pin", ResetPinSchema);
