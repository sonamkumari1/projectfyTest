import express from "express";
import { createCheckoutSession, getAllPurchasedProject, getProjectDetailWithPurchaseStatus, stripeWebhook } from "../controllers/projectPurchase.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
const router = express.Router();

router.route("/checkout/create-checkout-session").post(isAuthenticated, createCheckoutSession);
router.route("/webhook").post(express.raw({type:"application/json"}), stripeWebhook);
router.route("/project/:projectId/detail-with-status").get(isAuthenticated, getProjectDetailWithPurchaseStatus);

router.route("/").get(isAuthenticated, getAllPurchasedProject);

export default router;