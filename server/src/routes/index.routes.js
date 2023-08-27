import { Router } from "express";
import { buySubscription, getAllCustomers, paymentStatus, registerCustomer } from "../controllers/index.controllers.js";

const router = Router();

router.post('/register', registerCustomer);
router.get('/allCustomers', getAllCustomers);
router.post('/buySubscription', buySubscription);
router.post('/webhook', paymentStatus);

export default router