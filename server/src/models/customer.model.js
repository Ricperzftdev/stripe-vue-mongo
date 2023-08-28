import { Schema, model } from "mongoose";

const customerSchema = new Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    customerId: {
        type: String,
        required: true
    }
},
    {
        toJSON: {
            transform: function (doc, ret) {
                delete ret.password;
                return ret;
            }
        }
    }
);

const Customer = model('Customer', customerSchema);

export default Customer;