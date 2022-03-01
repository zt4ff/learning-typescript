import express from "express";
import socket from "socket.io";
import http from "http";
import path from "path";
import { GameBoard } from "./game-logic";
import { RandomUser, User } from "./user";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "../client")));

const server = http.createServer(app);
const io = new socket.Server(server);

const gameBoard = new GameBoard(20);

// managing the instances of connected users here may a sniper in disguise
// doing this for quickly for testing practise
let users: Array<User> = [];

io.on("connection", (socket) => {
  const user = new RandomUser();

  // enable client get information on board immediately the connect
  socket.emit("board", gameBoard.board);

  users.push(user);

  io.emit("users", users);

  socket.on("turn", ({ x, y }) => {
    gameBoard.makeTurn(x, y, user.color);
    io.emit("turn", { x, y, color: user.color });
  });

  socket.on("disconnect", () => {
    users = users.filter((usr) => usr.username != user.username);
    io.emit("users", users);
  });

  console.log(`Online Users: ${users.length}`);
});

server.on("error", () => {
  console.log("error creating server");
});

server.listen(PORT, () => {
  console.log("server connected successfully");
});
