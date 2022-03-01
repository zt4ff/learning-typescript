import { Board } from "./board";

import { io } from "socket.io-client";

const socket = io();

// display user name and color
function displayUserInfo(container: Element, username: string, color: string) {
  const para = document.createElement("p");
  para.innerHTML = `<span class="usr-color" style="background-color: ${color}"></span> ${username}`;

  container.append(para);
}

displayUserInfo.clear = (container: Element) => {
  container.innerHTML = "";
};

// users in game
// using server process persistence which is not good,
// you can make use of database persistence to work on this on
// make use of instances on a server that create games in pairs of 5 (no of users)

// drawing our page
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const board = new Board(ctx);
board.drawBoard(20);

const playingUserContainer = document.querySelector("#play-container");

socket.on("users", (users: Array<{ username: string; color: string }>) => {
  displayUserInfo.clear(playingUserContainer);
  users.forEach((usr) => {
    displayUserInfo(playingUserContainer, usr.username, usr.color);
  });
});

socket.on("board", (bd) => {
  board.renderBoardState(bd);
});

socket.on("turn", ({ x, y, color }) => {
  board.fillCell(x, y, color);
});

canvas.addEventListener("click", (e) => {
  const { x, y } = board.getClickCordinates(canvas, e);

  // change turn between players
  socket.emit("turn", board.getCellCordinates(x, y));
});
