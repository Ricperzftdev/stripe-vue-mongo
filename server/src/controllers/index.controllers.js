import Stripe from "stripe";
import { STRIPE_API_KEY } from "../config.js";
import Customer from "../models/customer.model.js";
import Subscription from "../models/subscription.model.js";
import bcrypt from "bcrypt";
import validate from "validate.js";
import registerConstraints from "../helpers/registerValidations.js";

const stripe = new Stripe(STRIPE_API_KEY);

const encryptPass = async (plainText) => {
    const hash = await bcrypt.hash(plainText, 10);
    return hash;
};

export const registerCustomer = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Validations
        const emailUsed = await Customer.findOne({ email });
        const registerVal = validate({ email, password }, registerConstraints);

        if (registerVal || emailUsed) {
            let validationErrors = {};

            if (emailUsed) {
                validationErrors.email = ["Email already exists"]
            };

            if (registerVal) {
                validationErrors = {
                    ...validationErrors,
                    ...registerVal
                };
            };

            return res.status(409).send({
                status: false,
                message: validationErrors
            });
        };

        // Getting customer id from stripe
        const { id } = await stripe.customers.create({
            email
        });

        if (!id) {
            return res.status(400).send({
                status: false,
                message: "Unexpected error"
            });
        };

        // Encrypting password
        const encryptedPass = await encryptPass(password);

        // Saving customer in DB
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
        });
    }
};

export const getSubscriptions = async (req, res) => {
    try {
        const subscriptions = await Subscription.find({});

        res.send({
            status: true,
            message: "Successful request",
            subscriptions
        });

    } catch (error) {
        res.status(400).send({
            status: false,
            error
        });
    }
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
            error
        });
    }
};

export const paymentStatus = (req, res) => {
    res.send("Hello from localhost")
}