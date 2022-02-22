////////////////////////// board.jss

class Board {
    constructor(context) {
        this.ctx = context
    }

    fillRect(x, y, color) {
        if (color) {
            ctx.fillStyle = color
        }
        ctx.fillRect(x - 10 , y - 10, 20, 20)
    }

    // get the cordinates when click upon 
    getClickCordinates(element, eventObject) {
        const {top, left} = element.getBoundingClientRect()
        const {clientX, clientY} = eventObject

        return {
            x: clientX - left,
            y: clientY - top
        }
    }
}

///////////////////////// main.js

const socket = io()

// display user name and color
function displayUserInfo(container, username, color) {
    const para = document.createElement("p")
    const color = document.createElement("span")
}

// drawing our page
const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")
const board = new Board(ctx)

let user
socket.on("user", usr => {
    user = usr
})

socket.on("turn", ({x, y}) => {
    board.fillRect(x, y, user.color)
})

canvas.addEventListener("click", e => {
    const {x, y} = board.getClickCordinates(canvas, e)

    // change turn between players
    socket.emit("turn", {x, y})
})