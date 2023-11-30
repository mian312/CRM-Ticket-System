import mongoose from "mongoose";

const { Schema } = mongoose;

const TicketsSchema = new Schema({
  clientId: {
    type: Schema.Types.ObjectId,
  },
  subject: {
    type: String,
    maxlength: 100,
    required: true,
    default: "",
  },
  openAt: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  issueDate: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  trainNumber: {
    type: String,
    required: true,
    default: "000000"
  },
  status: {
    type: String,
    maxlength: 30,
    required: true,
    default: "Open",
  },

  conversations: [
    {
      sender: {
        type: String,
        maxlength: 50,
        required: true,
        default: "",
      },
      message: {
        type: String,
        maxlength: 1000,
        required: true,
        default: "",
      },
      msgAt: {
        type: Date,
        required: true,
        default: Date.now(),
      },
    },
  ],
});

export const TicketSchema = mongoose.model("Ticket", TicketsSchema);
