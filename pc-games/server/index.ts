import express from "express"
import socket from "socket.io"
import http from "http"
import path from "path"

const app = express()
const PORT = process.env.PORT || 8080

app.use(express.static(path.join(__dirname, "../client")))

const server = http.createServer(app)
const io = new socket.Server(server)

io.on("connection", socket => {
    console.log("A devices connected")

    socket.on("message", message => {
        io.emit("message", message)
    })
})

server.on("error", (err) => {
    console.log("error creating server")
})

server.listen(PORT, () => {
    console.log("server connected successfully")
})