import { config } from "dotenv";
config();

export const PORT = process.env.PORT;
export const STRIPE_API_KEY = process.env.STRIPE_API_KEY;
export const MONGODB_URI = process.env.MONGODB_URI