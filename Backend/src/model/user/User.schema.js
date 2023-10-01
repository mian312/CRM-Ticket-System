import mongoose from "mongoose";

const { Schema, model } = mongoose;

const UsersSchema = new Schema({
  name: {
    type: String,
    maxlength: 50,
    required: true,
  },
  //   company: {
  //     type: String,
  //     maxlength: 50,
  //     required: true,
  //   },
  address: {
    type: String,
    maxlength: 100,
  },
  phone: {
    type: Number,
    maxlength: 11,
    require: true,
  },
  email: {
    type: String,
    maxlength: 50,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    minlength: 8,
    maxlength: 100,
    required: true,
  },
  refreshJWT: {
    token: {
      type: String,
      maxlength: 500,
      default: "",
    },
    addedAt: {
      type: Date,
      required: true,
      default: Date.now(),
    },
  },
});


export const UserSchema = mongoose.model("User", UsersSchema);

