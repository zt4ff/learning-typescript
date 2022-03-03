import { Board } from "./board";
import { io } from "socket.io-client";

const socket = io();

/**
 * @description
 * @param container the DOM element for containing the document type
 * @param username the username of the user to be displayed
 * @param color color of the user to be displayed
 */
function displayUserInfo(container: Element, username: string, color: string) {
  const para = document.createElement("p");
  para.innerHTML = `<span class="usr-color" style="background-color: ${color}"></span> ${username}`;

  container.append(para);
}

displayUserInfo.clear = (container: Element) => {
  container.innerHTML = "";
};

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const numOfRowAndColumn = 20;
const board = new Board(ctx, numOfRowAndColumn);
board.drawBoard();

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
  socket.emit("turn", board.getCellCordinates(canvas, e));
});
