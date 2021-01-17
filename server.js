const express = require('express');
const app = express();
const http = require('http').createServer(app);

const port = process.env.PORT || 3000



http.listen(port, () => {
    console.log("listening");
})

//app.use(express.static("C:/Users/DELL/Desktop/practice/projects/chatApp/public"));
app.use(express.static(__dirname + '/public'));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
    //res.sendFile("C:/Users/DELL/Desktop/practice/projects/chatApp/index.html");
})



const io = require('socket.io')(http);

io.on('connection', (socket) => {
    console.log('connected...');
    socket.on('message', (msg) => {
       socket.broadcast.emit('message', msg)
    })
})