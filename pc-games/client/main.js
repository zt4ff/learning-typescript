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
    para.innerHTML = `<span class="usr-color" style="background-color: ${color}"></span> ${username}`

    container.append(para)
}

displayUserInfo.clear = (container) => {
    container.innerHTML = ""
}

// users in game
// using server process persistence which is not good, 
// you can make use of database persistence to work on this on
// make use of instances on a server that create games in pairs of 5 (no of users)
const users = []

// drawing our page
const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")
const board = new Board(ctx)
const playingUserContainer = document.querySelector("#play-container")

socket.on("users", users => {
    displayUserInfo.clear(playingUserContainer)
    users.forEach(usr => {
        displayUserInfo(playingUserContainer, usr.username, usr.color)
    })
})

socket.on("turn", ({x, y, color}) => {
    board.fillRect(x, y, color)
})

canvas.addEventListener("click", e => {
    const {x, y} = board.getClickCordinates(canvas, e)

    // change turn between players
    socket.emit("turn", {x, y})
})