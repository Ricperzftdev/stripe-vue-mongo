import { Router } from "express";
import { buySubscription, getSubscriptions, paymentStatus, registerCustomer } from "../controllers/index.controllers.js";

const router = Router();

router.post('/register', registerCustomer);
router.get('/subscriptions', getSubscriptions);
router.post('/buySubscription', buySubscription);
router.post('/webhook', paymentStatus);

export default router