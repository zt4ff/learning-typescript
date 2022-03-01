import express from "express";
import socket from "socket.io";
import http from "http";
import path from "path";
import { GameBoard } from "./game-logic";
import { RandomUser, User } from "./user";
import { createCooldown } from "./cooldown";

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
  const cooldown = createCooldown(500);

  // enable client get information on board immediately the connect
  socket.emit("board", gameBoard.board);

  users.push(user);

  io.emit("users", users);

  socket.on("turn", ({ x, y }) => {
    if (cooldown()) {
      const playerWon = gameBoard.makeTurn(x, y, user.color);
      io.emit("turn", { x, y, color: user.color });
      console.log(`user: ${user.username} won: ${playerWon}`);
      if (playerWon) {
        console.log("somebody won");
      }
    }
  });

  socket.on("disconnect", () => {
    // remove user from display users in list and emit new list of user
    users = users.filter((usr) => usr.username != user.username);
    io.emit("users", users);

    // remove user moves on board emit board
    gameBoard.removeDisconnectedUserFromBoard(user.color);
    io.emit("board", gameBoard.board);
  });

  console.log(`Online Users: ${users.length}`);
});

server.on("error", () => {
  console.log("error creating server");
});

server.listen(PORT, () => {
  console.log("server connected successfully");
});
