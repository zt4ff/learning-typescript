////////////////////////// board.jss
class Board {
    constructor(context) {
        this.ctx = context
    }

    fillCell(x, y, color) {
        if (color) {
            ctx.fillStyle = color
        }
        ctx.fillRect(x*20, y*20, 20, 20)
    }

    renderBoardState(board = []) {
        board.forEach((row, y) => {
            row.forEach((color, x) => {
                color && this.fillCell(x, y, color)
            }) 
        })
    }

    drawBoard(numCells) {
        this.clearBoad()


        this.ctx.beginPath()
        for (let i = 0; i < numCells + 1; i++) {
            this.ctx.moveTo(i * numCells, 0)
            this.ctx.lineTo(i * numCells, 400)
            
            this.ctx.moveTo(0, numCells * i)
            this.ctx.lineTo(400, i * numCells)
            
        }
        
        this.ctx.strokeStyle = "#333"
        this.ctx.stroke()

        this.renderBoardState()
    }

    clearBoad() {
        this.ctx.clearRect(0, 0, 400, 400)
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
    
    getCellCordinates(x, y) {
        return {
            x: Math.floor(x / 20),
            y: Math.floor(y / 20)
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
board.drawBoard(20)

const playingUserContainer = document.querySelector("#play-container")

socket.on("users", users => {
    displayUserInfo.clear(playingUserContainer)
    users.forEach(usr => {
        displayUserInfo(playingUserContainer, usr.username, usr.color)
    })
})

socket.on("board", board.renderBoardState)

socket.on("turn", ({x, y, color}) => {
    board.fillCell(x, y, color)
})

canvas.addEventListener("click", e => {
    const {x, y} = board.getClickCordinates(canvas, e)



    // change turn between players
    socket.emit("turn", board.getCellCordinates(x, y))
})