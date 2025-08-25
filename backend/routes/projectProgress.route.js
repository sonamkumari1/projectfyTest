import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  getProjectProgress,
  markAsCompleted,
  markAsInCompleted,
  updateLectureProgress,
} from "../controllers/projectProgress.controller.js";

const router = express.Router();

router.route("/:projectId").get(isAuthenticated, getProjectProgress);
router
  .route("/:projectId/lecture/:lectureId/view")
  .post(isAuthenticated, updateLectureProgress);
router.route("/:projectId/complete").post(isAuthenticated, markAsCompleted);
router.route("/:projectId/incomplete").post(isAuthenticated, markAsInCompleted);

export default router;
