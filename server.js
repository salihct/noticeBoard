var express = require("express");
var app = express()
var http = require("http").createServer(app)
var io = require("socket.io")(http)

app.get("/", (req,res)=>{
    res.sendFile(__dirname+"/public/whiteboard.html");
})

app.get("/admin", (req,res)=>{
    res.sendFile(__dirname+"/public/admin.html");
})

http.listen(3000, ()=>{
    console.log("connected to server");
})

io.on("connection", (socket)=>{
    console.log("new socket connection started");
    socket.on("disconnect", ()=>{
        console.log("connection closed");
    })

    socket.on("message", (msg)=>{
        console.log(msg);
        io.emit('boardContent',msg)
    })
})