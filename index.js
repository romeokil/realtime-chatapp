import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import http from 'http';
import { Server } from 'socket.io';

import connectDB from './config/db.js'
import Message from './models/Message.js'
dotenv.config();
connectDB();

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
    },
})

// store online users
const users = {};

io.on("connection", (socket) => {
    console.log(`User Connected: `, socket.id);

    // register user

    socket.on("join", (username) => {
        users[username] = socket.id;
        console.log(`${username} joined`);
    })

    // handle sending message

    socket.on("send_message", async (data) => {
        const { sender, receiver, message } = data;

        // Saving message in db
        const newMessage = new Message({ sender, reciever, message });
        await newMessage.save();

        // Send message to reciever if online
        const recieverSocket = users[receiver];
        if (recieverSocket) {
            io.to(recieverSocket).emit("receive_message", data);
        }
    })

    socket.on("disconnect", () => {
        console.log('User disconnected', socket.id);
    })

})



server.listen(PORT, () => {
    try {
        console.log(`Server is running at ${PORT}`);
    }
    catch {
        console.log(`Error while connecting to Server`);
    }
})