import express from 'express';
import router from './routes/index.routes.js';

// Initializing express
const app = express();
// Necessary to get adn read json data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Using routes
app.use(router)

export default app