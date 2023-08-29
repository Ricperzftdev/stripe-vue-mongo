import Stripe from "stripe";
import { STRIPE_API_KEY } from "../config.js";

const stripe = new Stripe(STRIPE_API_KEY);

(async () => {
    const { data } = await stripe.prices.list();
    const products = [];

    for (const element of data) {
        const product = {
            id: element.id,
            name: element.nickname,
            currency: element.currency,
            price: element.unit_amount / 100
        };
        products.push(product);
    };
    const productsSorted = products.sort((a, b) => a.price - b.price);
    console.log(productsSorted)
})();