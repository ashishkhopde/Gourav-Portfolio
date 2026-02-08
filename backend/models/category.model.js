import { Schema, model } from "mongoose";

const categorySchema = new Schema({
    category : {
        type : String,
        required : true
    }
});

export default model("Category", categorySchema);