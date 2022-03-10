import express from "express";
import socket from "socket.io";
import http from "http";
import path from "path";
import { Board } from "./board";
import { RandomUser, User } from "./user";
import { createCooldown } from "./cooldown";
import { joinRoom, leaveRoom } from "./room";

let onlineUsers = 0;

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "../client")));

const server = http.createServer(app);
const io = new socket.Server(server);

// managing the instances of connected users here may a sniper in disguise
// doing this for quickly for testing practise
const rooms: { [key: string]: Array<User> } = {};

io.on("connection", (socket) => {
  onlineUsers++;
  const user = new RandomUser();
  const board = user.board;
  const cooldown = createCooldown(500);

  // join room
  socket.join(user.roomID);

  // socket.emit("board", board.board);
  socket.to(user.roomID).emit("board", board.board);

  if (rooms[user.roomID]) {
    rooms[user.roomID].push(user);
  } else {
    rooms[user.roomID] = [user];
  }

  // io.emit("users", users);
  io.to(user.roomID).emit("users", rooms[user.roomID]);

  // socket.on("turn", ({ x, y }) => {
  socket.on("turn", ({ x, y }) => {
    if (cooldown()) {
      const playerWon = board.makeTurn(x, y, user.color);
      // io.emit("turn", { x, y, color: user.color });
      io.to(user.roomID).emit("turn", { x, y, color: user.color });
      console.log(`user: ${user.username} won: ${playerWon}`);
      if (playerWon) {
        console.log("somebody won");
      }
    }
  });

  socket.on("disconnect", () => {
    onlineUsers--;

    // remove user from display users in list and emit new list of user
    socket.leave(user.roomID);
    rooms[user.roomID] = rooms[user.roomID].filter(
      (usr) => usr.username != user.username
    );
    // io.emit("users", users);
    io.to(user.roomID).emit("users", rooms[user.roomID]);

    // remove user moves on board emit board
    board.removeDisconnectedUserFromBoard(user.color);
    // io.emit("board", board.board);
    io.to(user.roomID).emit("board", board.board);

    // leave room
    leaveRoom(user.roomID);
  });

  console.log(`Online Users: ${onlineUsers}`);
});

server.on("error", () => {
  console.log("error creating server");
});

server.listen(PORT, () => {
  console.log("server connected successfully");
});
