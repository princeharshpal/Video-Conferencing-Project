import mongoose from "mongoose";

const connectDb = () => {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("Connected to Database");
    })
    .catch((err) => {
      console.log("DATABASE CONNECTION ERROR", err);
    });
};

export default connectDb;
