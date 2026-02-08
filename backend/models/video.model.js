import { Schema, model } from "mongoose";

const videoSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    coverImage: {
        type: String,
        required: true
    },
    videoLink: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    }
}, { timestamps: true });

export default model("Video", videoSchema);