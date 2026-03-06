import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});


// ye hmara socket communication hai.
io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);

  socket.on("chat_message", (data, callback) => {
    const { message } = data;

    console.log("Message received:", message);

    let response;

    if (message.toLowerCase() === "hello") {
      response = "Hi! How can I help you?";
    } else if (message.toLowerCase() === "how are you") {
      response = "I am running perfectly!";
    } else {
      response = "Sorry, I didn't understand.";
    }
    callback({
      reply: response,
    });
  });

  socket.on("disconnect", () => {
    console.log("Socket disconnected:", socket.id);
  });
});


// internal socket client baana rhe hai hmlog.
import { io as Client } from "socket.io-client";

const internalSocket = Client(`http://localhost:${PORT}`);


// API THAT USES SOCKET
app.post("/api/chat", (req, res) => {
  const { message } = req.body;

  internalSocket.emit("chat_message", { message }, (response) => {
    res.json(response);
  });
});


server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});