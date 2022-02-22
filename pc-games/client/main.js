////////////////////////// board.jss

class Board {
    constructor(context) {
        this.ctx = context
    }

    fillRect(x, y, color) {
        ctx.fillStyle = color
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

const form = document.querySelector("form")
const input = document.querySelector("input")
const div = document.querySelector("#messages")

// drawing our page
const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")
const board = new Board(ctx)

socket.on("turn", ({x, y}) => {
    board.fillRect(x, y)
})

canvas.addEventListener("click", e => {
    const {x, y} = board.getClickCordinates(canvas, e)

    // change turn between players
    socket.emit("turn", {x, y})
})