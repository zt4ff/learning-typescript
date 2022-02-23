import express from "express";
import socket from "socket.io";
import http from "http";
import path from "path";
import { createGameBoard } from "./game-logic";
import { RandomUser, User } from "./user";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "../client")));

const server = http.createServer(app);
const io = new socket.Server(server);

const { clear, getBoard, makeTurn } = createGameBoard(20);

// managing the instances of connected users here may a sniper in disguise
// doing this for quickly for testing practise
let users: Array<User> = [];

io.on("connection", (socket) => {
  const user = new RandomUser();

  // enable client get information on board immediately the connect
  socket.emit("board", getBoard());

  users.push(user);

  io.emit("users", users);

  socket.on("turn", ({ x, y }) => {
    makeTurn(x, y, user.color);
    io.emit("turn", { x, y, color: user.color });
  });

  socket.on("disconnect", () => {
    user.deselectUser();
    users = users.filter((usr) => usr.username != user.username);
    io.emit("users", users);
  });

  console.log(users.length);
});

server.on("error", (err) => {
  console.log("error creating server");
});

server.listen(PORT, () => {
  console.log("server connected successfully");
});
