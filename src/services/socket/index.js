import {
  findPresentationByCode,
  updatePresentationIsPresent,
} from "../../modules/presentation/presentationModel";

let io = null;
let data = [];

function ioSocketServer(ioSocket) {
  io = ioSocket;
  io.on("connection", onConnection);
}
function removeDataBySocket(id) {
  const index = data.findIndex((item) => item.socket === id);
  if (index !== -1) {
    data.splice(index, 1);
    console.log(data);
  }
}

function removeDataByRoom(room) {
  const index = data.findIndex((item) => item.room === room);
  if (index !== -1) {
    data.splice(index, 1);
    console.log(data);
  }
}

function onConnection(socket) {
  console.log("New connection: " + socket.id);

  socket.on("req-host-room", (room) => {
    removeDataByRoom(room);
    socket.join(room);
    console.log(socket.id + " hosted " + room);
    findPresentationByCode(room, {
      success: (presentation) => {
        console.log(presentation._id);
        data.push({ socket: socket.id, room, presentation, current: 0 });
        console.log(data);
        io.to(socket.id).emit("res-host-room", {
          success: true,
          message: "join room successful",
        });
      },
      error: (error) => {
        console.log(error);
        io.to(socket.id).emit("res-host-room", {
          success: false,
          message: "join room failed",
        });
      },
    });
  });

  socket.on("req-close-room", (msg) => {
    const index = data.findIndex((item) => item.socket === socket.id);
    if (index !== -1) {
      // updatePresentationIsPresent(
      //   data[index].presentation._id,
      //   data[index].presentation.owner,
      //   false,
      //   {
      //     success: (presentation) => {
      //       console.log(presentation);
      //     },
      //     error: (error) => {
      //       console.log(error);
      //     },
      //   }
      // );
      data.splice(index, 1);
      console.log(data);
    }
  });

  socket.on("disconnect", (reason) => {
    console.log(socket.id + " disconnected");
    const index = data.findIndex((item) => item.socket === socket.id);
    if (index !== -1) {
      data.splice(index, 1);
      console.log(data);
    }
  });

  socket.on("req-join-room", (room) => {
    const index = data.findIndex((item) => item.room === room);
    if (index !== -1) {
      socket.join(room);
      console.log(socket.id + " joined " + room);
      io.to(socket.id).emit("res-join-room", {
        success: true,
        data: data[index].presentation,
        current: data[index].current,
      });
    } else {
      io.to(socket.id).emit("res-join-room", {
        success: false,
        message: "join failed",
      });
    }
  });

  socket.on("req-vote-room", (room, vote) => {
    console.log(socket.id + " vote " + room, vote);
    const index = data.findIndex((item) => item.room === room);
    if (index !== -1) {
      data[index].presentation.slides[vote.slide].detail.values[vote.vote]++;
      io.to(room).emit("res-vote-room", data[index].presentation);
    }
  });
  
  socket.on("req-next-slide", (room) => {
    console.log(room + "next");
    const index = data.findIndex((item) => item.room === room);
    if (index !== -1) {
      data[index].current++;
      io.to(room).emit("res-next-slide", data[index].current);
    }
  });
}

module.exports = ioSocketServer;
