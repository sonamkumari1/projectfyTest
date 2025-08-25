import express from "express";
import {
  AddProject,
  createLecture,
  deleteProject,
  editLecture,
  editProject,
  getCreatorProject,
  getLectureById,
  getProjectById,
  getProjectLecture,
  getProjectsByCategory,
  getProjectsByLevel,
  getPublishedProject,
  removeLecture,
  searchProjects,
  togglePublishProject,
} from "../controllers/project.controller.js";
import upload from "../middlewares/multer.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.route("/add").post(isAuthenticated,upload.single("projectThumbnail"), AddProject);
router.route("/search").get(isAuthenticated, searchProjects);
router.route("/").get(isAuthenticated, getCreatorProject);
router.route("/:projectId").put(isAuthenticated,upload.single("projectThumbnail"), editProject);


router.route("/:projectId/lecture").post( isAuthenticated,createLecture);
router.route("/:projectId/lecture").get(isAuthenticated,getProjectLecture);
router
  .route("/:projectId/lecture/:lectureId")
  .post( isAuthenticated, editLecture);
router.route("/lecture/:lectureId").delete(isAuthenticated,removeLecture);
router.route("/lecture/:lectureId").get( isAuthenticated, getLectureById);

router.route("/published-project").get(getPublishedProject);
router.route("/category/:category").get( getProjectsByCategory);
router.route("/projectLevel/:projectLevel").get( getProjectsByLevel);
router.route("/:projectId").get(isAuthenticated,getProjectById);
router.route("/:projectId").patch( isAuthenticated, togglePublishProject);
router.route("/:projectId").delete(isAuthenticated, deleteProject);
export default router;
