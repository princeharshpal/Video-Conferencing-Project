import mongoose, { Schema } from "mongoose";

const meetingSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  meetingCode: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

export const meetingModel = mongoose.model("meetingModel", meetingSchema);
