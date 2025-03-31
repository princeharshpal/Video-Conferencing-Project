import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { createServer } from "node:http";

import connectDb from "./config/db.js";
import connectToSocket from "./controllers/socketManager.js";
import userRoutes from "./routes/user.routes.js"

const app = express();

const PORT = process.env.PORT || 5005;

connectDb();

const server = createServer(app);
const io = connectToSocket(server);

app.set("port", PORT || 8000);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRoutes)

server.listen(app.get("port"), () => {
  console.log(`Server is listening on ${PORT}`);
});
