import { Schema, model } from "mongoose";

const messageSchema = new Schema({
    name: {
        type : String,
        required : true
    },
    email: {
        type : String,
        required : true
    },
    phone : {
        type : Number,
        required : true,
        maxlength : 10
    },
    message : {
        type : String,
        required : true
    }
});

export default model("message", messageSchema);