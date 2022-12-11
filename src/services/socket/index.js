let io = null;

function ioSocketServer(ioSocket) {
  io = ioSocket;
  io.on("connection", onConnection);
}

function onConnection(socket) {
  console.log("New connection: " + socket.id);

  socket.on("req-join-room", (room) => {
    socket.join(room);
    console.log(socket.id + " joined " + room);
    io.to(socket.id).emit("res-join-room", "join room successful");
  });

  socket.on("req-send-to-room", (room, data) => {
    console.log(socket.id + " send to " + room, data);
    // code here
    // update presentation DB

    // send new data to all client in room
    io.to(room).emit("res-send-to-room", { data: "data" });
  });
}

module.exports = ioSocketServer;
