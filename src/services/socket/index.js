import {
  findPresentationGroupByCode,
  updatePresentationInfo,
  updatePresentationIsPresent,
} from "../../modules/presentation/presentationModel";
import { generateCode } from "../code";

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
          data.push({
            socket: socket.id,
            room,
            presentation,
            questions: [],
            current: 0,
          });
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

  socket.on("req-join-room", (room, user) => {
    const index = data.findIndex((item) => item.room === room);
    if (index !== -1) {
      var success = true;
      if (!data[index].presentation.isPublic) {
        if (!user) {
          success = false;
        } else {
          const check = data[index].presentation.groups[0].members.find(
            (member) => member.detail.toString() === user._id
          );
          console.log("check", check);
          if (!check) {
            success = false;
          }
        }
      }
      if (!success) {
        io.to(socket.id).emit("res-join-room", {
          success: false,
          message: "join failed",
        });
      } else {
        socket.join(room);
        console.log(socket.id + " joined " + room);
        io.to(socket.id).emit("res-join-room", {
          success: true,
          data: data[index].presentation,
          current: data[index].current,
        });
      }
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

  // listen  to chat request
  socket.on("req-send-text", (room, name, text) => {
    console.log("nội dung: ", text);
    // var current = new Date();
    // const time = current.getHours() + ":" + current.getMinutes();
    const time = new Date().toLocaleTimeString('en-US', {
      hour12: false,
      hour: "numeric",
      minute: "numeric"
    });

    const textObj = {
      id: generateCode(6),
      name,
      content: text,
      time: time
    }

    io.to(room).emit("broadcast-new-msg", textObj);
  })

  socket.on("req-get-question", (room) => {
    const index = data.findIndex((item) => item.room === room);
    if (index > -1) {
      io.to(socket.id).emit("update-question", data[index].questions);
    }
  });

  socket.on("req-send-question", (room, user, question) => {
    console.log("question", room, user, question);
    const index = data.findIndex((item) => item.room === room);
    if (index > -1) {
      const time = new Date().toLocaleTimeString("en-US", {
        hour12: false,
        hour: "numeric",
        minute: "numeric",
      });

      data[index].questions.push({
        id: generateCode(32),
        username: user.name,
        question,
        like: 0,
        likeUsers: [],
        isAnswer: false,
        time: time,
      });

      io.to(room).emit("update-question", data[index].questions);
    }
  });

  socket.on("req-like-question", (room, user, questionId) => {
    console.log("like", room, user, questionId);
    const index = data.findIndex((item) => item.room === room);
    if (index > -1) {
      const questionIndex = data[index].questions.findIndex(
        (item) => item.id === questionId
      );
      if (questionIndex > -1) {
        const userIndex = data[index].questions[
          questionIndex
        ].likeUsers.findIndex((item) => item === user.id);
        if (userIndex > -1) {
          data[index].questions[questionIndex].like--;
          data[index].questions[questionIndex].likeUsers.splice(userIndex, 1);
        } else {
          data[index].questions[questionIndex].like++;
          data[index].questions[questionIndex].likeUsers.push(user.id);
        }

        io.to(room).emit("update-question", data[index].questions);
      }
    }
  });

  socket.on("req-answer-question", (room, user, questionId) => {
    console.log("answer", room, user, questionId);
    const index = data.findIndex((item) => item.room === room);
    if (index > -1) {
      const questionIndex = data[index].questions.findIndex(
        (item) => item.id === questionId
      );
      if (questionIndex > -1) {
        data[index].questions[questionIndex].isAnswer = true;

        io.to(room).emit("update-question", data[index].questions);
      }
    }
  });
}

module.exports = ioSocketServer;
