import messageModel from "../models/message.model.js";

export const getAllMessage = async (req, res) => {
    try {

        const messages = await messageModel.find();

        return res.json({
            status: "Messages fetch successfull",
            messages
        });

    } catch (error) {
        console.log("getting message error : ", error);
    }
}

export const postMessage = async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;

        const newMessage = await messageModel.create({ name, email, phone, message });

        return res.json({
            status: "Message sent successfull",
            newMessage
        });

    } catch (error) {
        console.log("Posting message err : ", error);
    }
}

export const deleteMessage = async (req, res) => {
    try {

        const { id } = req.params;

        const message = await messageModel.findByIdAndDelete({ _id: id });

        return res.json({
            status: "Message delete successfully",
            message
        });

    } catch (error) {
        console.log("Deleting message err : ", error);
    }
}