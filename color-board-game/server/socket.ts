import socket from "socket.io";
import http from "http";
import { RandomUser } from "./user";
import { CoolDown } from "./cooldown";
import { Room } from "./room";

export const socketListener = async (server: http.Server, room: Room) => {
  const io = new socket.Server(server);
  let onlineUsers = 0;

  io.on("connection", async (socket) => {
    ++onlineUsers;
    console.log(`Online Users: ${onlineUsers}`);

    // the rooms of the user is created asynchronous
    const user = await new RandomUser().join(room);
    // const user = { name: "boy" };
    const board = user.board;

    // moves cooldown
    const cooldown = new CoolDown(500);

    if (!user || !board) throw new Error("Board not created");

    // joins room
    socket.join(user.roomID);

    // emit the state of boards to user just connecting
    socket.to(user.roomID).emit("board", board.getBoard);

    room.addUserToRoom(user);

    // emit the lists of users in the room to just connected users
    io.to(user.roomID).emit("users", room.getUsersInRoom(user));

    socket.on("turn", ({ x, y }) => {
      if (cooldown.check()) {
        const playerWon = board.makeTurn(x, y, user.color);
        io.to(user.roomID).emit("turn", { x, y, color: user.color });
        console.log(`user: ${user.username} won: ${playerWon}`);
        if (playerWon) {
          console.log("somebody won");
        }
      }
    });

    socket.on("disconnect", () => {
      onlineUsers--;
      console.log(`Online Users: ${onlineUsers}`);

      // remove user from display users in list and emit new list of user
      socket.leave(user.roomID);

      room.removeUserFromRoom(user);

      // io.emit("users", users);
      io.to(user.roomID).emit("users", room.getUsersInRoom(user));

      // remove user moves on board emit board
      board.removeDisconnectedUserFromBoard(user.color);

      // io.emit("board", board.board);
      io.to(user.roomID).emit("board", board.getBoard);

      // leave room
      room.leaveRoom(user);
    });
  });
};
