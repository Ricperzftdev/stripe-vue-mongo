import { Router } from "express";
import { saveSubscription } from "../controllers/db.controllers.js";

const dbRouter = Router();

dbRouter.get('/saveSubscriptions', saveSubscription);

export default dbRouter