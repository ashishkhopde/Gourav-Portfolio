import { Schema, model } from 'mongoose';

const servicesSchema = new Schema({
    serviceName : {
        type : String,
        required : true
    }
});

export default model("Service", servicesSchema);