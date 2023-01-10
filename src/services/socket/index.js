import {
  findPresentationGroupByCode,
  updatePresentationInfo,
  updatePresentationIsPresent,
} from "../../modules/presentation/presentationModel";

let io = null;
let data = [];

function ioSocketServer(ioSocket) {
  io = ioSocket;
  io.on("connection", onConnection);
}

export function findByCode(code) {
  const index = data.findIndex((item) => item.room === code);
  if (index !== -1) {
    return data[index].presentation;
  }
  return null;
}

function updatePresentation(index) {
  updatePresentationInfo(
    data[index].presentation._id,
    { slides: data[index].presentation.slides },
    {
      success: (presentation) => {
        // do nothing
      },
      error: (error) => {
        console.log(error);
      },
    }
  );
}

function removeDataBySocket(id) {
  const index = data.findIndex((item) => item.socket === id);
  if (index !== -1) {
    updatePresentation(index);
    data.splice(index, 1);
    console.log(data);
  }
}

function removeDataByRoom(room) {
  const index = data.findIndex((item) => item.room === room);
  if (index !== -1) {
    updatePresentation(index);
    data.splice(index, 1);
    console.log(data);
  }
}

function onConnection(socket) {
  console.log("New connection: " + socket.id);

  socket.on("req-host-room", (room) => {
    socket.join(room);
    console.log(socket.id + " hosted " + room);
    const index = data.findIndex((item) => item.room === room);
    findPresentationGroupByCode(room, {
      success: async (presentation) => {
        if (index === -1) {
          data.push({ socket: socket.id, room, presentation, current: 0 });
          io.emit("start-present", presentation);
        } else {
          data[index].socket = socket.id;
        }
        console.log(data);
        io.to(socket.id).emit("res-host-room", {
          success: true,
          message: "join room successful",
          current: index > -1 ? data[index].current : 0,
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

  socket.on("req-close-room", (message) => {
    const index = data.findIndex((item) => item.socket === socket.id);
    if (index !== -1) {
      updatePresentation(index);
      const presentation = data[index].presentation;
      data.splice(index, 1);
      io.emit("end-present", presentation);
      console.log(data);
    }
  });

  socket.on("disconnect", (reason) => {
    console.log(socket.id + " disconnected");
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
      updatePresentation(index);
      data[index].current++;
      io.to(room).emit("res-next-slide", data[index].current);
    }
  });
}

module.exports = ioSocketServer;
