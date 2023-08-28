import mongoose from "mongoose";
import { MONGODB_URI } from "../config.js";

const uri = MONGODB_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log("Connection to mongoDB is occurring")
    } catch (error) {
        console.log(error)
    }
}

export default connectDB

