import Stripe from "stripe";
import { STRIPE_API_KEY } from "../config.js";

const stripe = new Stripe(STRIPE_API_KEY);

(async () => {
    const { data } = await stripe.prices.list();
    console.log(data)
})();