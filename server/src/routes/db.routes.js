import { Router } from "express";
import {saveSubscription} from "../functions/get&SaveSubscriptions.js";

const dbRouter = Router();

dbRouter.get('/saveSubscriptions', saveSubscription);

export default dbRouter