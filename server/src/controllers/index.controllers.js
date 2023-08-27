import Stripe from "stripe";
import { STRIPE_API_KEY } from "../config.js";

const stripe = new Stripe(STRIPE_API_KEY);

export const registerCustomer = async (req, res) => {
    const { email } = req.body;
    const customerData = await stripe.customers.create({
        email
    });
    
    res.send({ customerData })
};

export const getAllCustomers = async (req, res) => {
    const customers = await stripe.customers.list();

    res.send({ customers })
};

export const buySubscription = async (req, res) => {
    const { customerId } = req.body;
    const subscriptionId = "price_1NjoDeBQtqlM2yznsh5K5nM4";

    if (!customerId) {
        return res.status(401).send({
            status: false,
            message: "Required credentials"
        })
    }

    try {
        const subscription = await stripe.subscriptions.create({
            customer: customerId,
            items: [
                {
                    price: subscriptionId
                }
            ],
            payment_behavior: "default_incomplete",
            expand: ["latest_invoice.payment_intent"]
        });

        if (subscription && subscription.latest_invoice) {
            res.send({
                status: true,
                message: subscription.latest_invoice.payment_intent.client_secret
            })
        }

        
    } catch (error) {
        res.status(400).send({
            status: false,
            message: error
        })
    }
};

export const paymentStatus = (req, res) => {
    res.send("Hello from localhost")
}