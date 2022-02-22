import express from "express"
import socket from "socket.io"
import http from "http"
import path from "path"
import { RandomUser, User } from "./user"

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, "../client")))

const server = http.createServer(app)
const io = new socket.Server(server)

// managing the instances of connected users here may a sniper in disguise
// doing this for quickly for testing practise
const users:Array<User> = []

io.on("connection", socket => {
    const user = new RandomUser()

    users.push(user)

    io.emit("users", users )
    
    socket.on("turn", ({x, y}) => {
        io.emit("turn", {x, y, color: user.color})
    })
    
    socket.on("disconnect", () => {
        user.deselectUser()
        io.emit("users", users.filter(usr => usr.username != user.username))
    })
})

server.on("error", (err) => {
    console.log("error creating server")
})

server.listen(PORT, () => {
    console.log("server connected successfully")
})