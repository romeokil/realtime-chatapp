import express from "express";
import http from "http";
import dotenv from 'dotenv'
import { Server } from "socket.io";
import cors from "cors";
dotenv.config();
const app = express();
const PORT =5000;
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

io.on("connection", (socket) => {

  console.log("User connected:", socket.id);

  // message recieve kr lete hai.
  socket.on("send_message", (data) => {

    console.log("Message received from", data.user);
    console.log("Message:", data.message);

    // ab message emit kr dete hai toh jitna bhi user hai sbtk pahuch jaata hai.
    io.emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });

});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});