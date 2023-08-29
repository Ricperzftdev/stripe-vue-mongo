import {Schema, model} from "mongoose"

const subscriptionSchema = new Schema({
    id: {
        type: String
    },
    name: {
        type: String
    },
    currency: {
        type: String
    },
    price: {
        type: Number
    }
});

const Subscription = model('Subscription', subscriptionSchema);

export default Subscription