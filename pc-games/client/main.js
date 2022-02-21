const socket = io()

const form = document.querySelector("form")
const input = document.querySelector("input")
const div = document.querySelector("#messages")


function log(str) {
    const para = document.createElement("p")
    para.appendChild(document.createTextNode(str))
    div.appendChild(para)
}

socket.on("connect", io => {
    console.log("connected too")
})

socket.on("message", message => {
    log(message)
})

form.addEventListener("submit", (e) => {
    e.preventDefault()

    if (input.value) {
        socket.emit("message", input.value)
    } else console.log("baba do straight joh");

    input.value = ""
})