import Stripe from "stripe";
import { STRIPE_API_KEY } from "../config.js";
import Customer from "../models/customer.model.js";
import bcrypt from "bcrypt"

const stripe = new Stripe(STRIPE_API_KEY);

const encryptPass = async (plainText) => {
    const hash = await bcrypt.hash(plainText, 10);
    return hash;
}

export const registerCustomer = async (req, res) => {
    const { email, password } = req.body;

    try {
        const { id } = await stripe.customers.create({
            email
        });

        if (!id) {
            return res.status(400).send({
                status: false,
                message: "Unexpected error"
            });
        };

        const encryptedPass = await encryptPass(password);

        const newCustomer = new Customer({ email, password: encryptedPass, customerId: id });
        await newCustomer.save();

        res.send({
            status: true,
            message: "New customer added",
            newCustomer
        });

    } catch (error) {
        res.status(400).send({
            status: false,
            message: error
        })
    }
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
        });
    };

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
        };

    } catch (error) {
        res.status(400).send({
            status: false,
            message: error
        });
    }
};

export const paymentStatus = (req, res) => {
    res.send("Hello from localhost")
}