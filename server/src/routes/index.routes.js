import { Router } from "express";
import { buySubscription, paymentStatus, registerCustomer } from "../controllers/index.controllers.js";

const router = Router();

router.post('/register', registerCustomer);
router.post('/buySubscription', buySubscription);
router.post('/webhook', paymentStatus);

export default router