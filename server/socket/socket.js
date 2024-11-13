const express = require("express");
const { Server } = require("socket.io");
const http = require("http");
const Document = require("../Model/DocumentModel");
const findorcreateDocumnet = require("../utilis/helper");

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("get-document", async(documentId) => {
    console.log(documentId);
    const document = await findorcreateDocumnet(documentId);
    console.log(document);
    
    socket.join(documentId);

    socket.emit("load-documents", document?.data);
    socket.on("send-changes", (delta) => {
      socket.broadcast.to(documentId).emit("receive-changes", delta);
    });
    socket.on("save-changes",async(data)=>{
        await Document.findByIdAndUpdate(documentId,{data});
    })
  });

  console.log("Socket Connected");
});

module.exports = { app, server };
