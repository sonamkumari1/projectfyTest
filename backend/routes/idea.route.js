import express from "express";
import { addIdea, allIdea, updateIdea, deleteIdea } from "../controllers/idea.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.post("/add", isAuthenticated, addIdea);
router.get("/all", allIdea);
router.put("/update/:id", isAuthenticated, updateIdea);
router.delete("/delete/:id", isAuthenticated, deleteIdea);

export default router;