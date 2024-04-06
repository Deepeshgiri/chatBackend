const Conversation = require("../models/conversation.model");
const Message = require("../models/message.model");
const { getReceiverSocketId, io } = require("../socket/socket");
const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: recieverId } = req.params;
    const senderId = req.user._id;
    console.log(recieverId, senderId, message);
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, recieverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, recieverId],
      });
    }

    const newMessage = new Message({ senderId, recieverId, message });
    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    // to save individually
    // await conversation.save()
    // await newMessage.save()

    // to save all at once in parallel

    await Promise.all([conversation.save(), newMessage.save()]);

    const recieverSocketId = getReceiverSocketId(recieverId);
    if (recieverSocketId) {
      io.to(recieverSocketId).emit("newMessage", newMessage);
    }
    console.log("server recieve", recieverSocketId, "front senderid" , senderId)
    console.log("reciverid ", recieverSocketId);

    res.json( newMessage );
  } catch (error) {
    console.log("error in send message controller ", error);
    res.status(500).json({ error: "internal server error" });
  }
};

const getMessage = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages");

    if (!conversation) return res.status(200).json([]);
    const messages = conversation.messages;

    res.status(200).json(messages);
  } catch (error) {
    console.log("error in get messages", error);
    res.status(500).json({ message: "internal server error in getmessage" });
  }
};
module.exports = { sendMessage, getMessage };
