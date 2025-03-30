import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { createServer } from "node:http";
import { Server } from "socket.io";

import connectDb from "./config/db.js";
import connectToSocket from "./controllers/socketManager.js";

const app = express();

const PORT = process.env.PORT || 5005;

connectDb();

const server = createServer(app);
const io = connectToSocket(server);

app.set("port", PORT || 8000);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

server.listen(app.get("port"), () => {
  console.log(`Server is listening on ${PORT}`);
});
