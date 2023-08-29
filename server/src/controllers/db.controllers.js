import Stripe from "stripe";
import { STRIPE_API_KEY } from "../config.js";
import Subscription from "../models/subscription.model.js";

const stripe = new Stripe(STRIPE_API_KEY);

export const saveSubscription = async (req, res) => {
    try {
        const { data } = await stripe.prices.list();
        const subscriptions = [];

        for (const element of data) {
            const subscription = {
                id: element.id,
                name: element.nickname,
                currency: element.currency,
                price: element.unit_amount / 100
            };
            subscriptions.push(subscription);
        };
        const subscriptionsSorted = subscriptions.sort((a, b) => a.price - b.price);

        const response = [];

        for (const subscription of subscriptionsSorted) {
            const newsubscription = new Subscription(subscription);
            await newsubscription.save();
            response.push(newsubscription);
        };

        res.send({
            status: true,
            message: "Subscriptions items added",
            response
        });

    } catch (error) {
        console.log(error)
    }
};