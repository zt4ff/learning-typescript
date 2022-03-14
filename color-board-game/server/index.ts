import express from "express";
import http from "http";
import path from "path";
import { socketListener } from "./socket";
import { Room } from "./room";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "../client")));

const server = http.createServer(app);
const room = new Room();

// the socket listerner for the gamecd
socketListener(server, room);

server.on("error", () => {
  console.log("error creating server");
});

server.listen(PORT, () => {
  console.log("server connected successfully");
});
