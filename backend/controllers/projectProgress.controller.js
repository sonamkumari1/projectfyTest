import { Project } from "../models/project.model.js";
import { ProjectProgress } from "../models/projectProgress.js";


export const getProjectProgress = async (req, res) => {
  try {
    const { projectId } = req.params;
    const userId = req.id;

    // step-1 fetch the user project progress
    let projectProgress = await ProjectProgress.findOne({
      projectId,
      userId,
    }).populate("projectId");

    const projectDetails = await Project.findById(projectId).populate("lectures");

    if (!projectDetails) {
      return res.status(404).json({
        message: "project not found",
      });
    }

    // Step-2 If no progress found, return project details with an empty progress
    if (!projectProgress) {
      return res.status(200).json({
        data: {
          projectDetails,
          progress: [],
          completed: false,
        },
      });
    }

    // Step-3 Return the user's project progress alog with project details
    return res.status(200).json({
      data: {
        projectDetails,
        progress: projectProgress.lectureProgress,
        completed: projectProgress.completed,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateLectureProgress = async (req, res) => {
  try {
    const { projectId, lectureId } = req.params;
    const userId = req.id;

    // fetch or create project progress
    let projectProgress = await ProjectProgress.findOne({ projectId, userId });

    if (!projectProgress) {
      // If no progress exist, create a new record
      projectProgress = new ProjectProgress({
        userId,
        projectId,
        completed: false,
        lectureProgress: [],
      });
    }

    // find the lecture progress in the project progress
    const lectureIndex = projectProgress.lectureProgress.findIndex(
      (lecture) => lecture.lectureId === lectureId
    );

    if (lectureIndex !== -1) {
      // if lecture already exist, update its status
      projectProgress.lectureProgress[lectureIndex].viewed = true;
    } else {
      // Add new lecture progress
      projectProgress.lectureProgress.push({
        lectureId,
        viewed: true,
      });
    }

    // if all lecture is complete
    const lectureProgressLength = projectProgress.lectureProgress.filter(
      (lectureProg) => lectureProg.viewed
    ).length;

    const project = await Project.findById(projectId);

    if (project.lectures.length === lectureProgressLength)
      projectProgress.completed = true;

    await projectProgress.save();

    return res.status(200).json({
      message: "Lecture progress updated successfully.",
    });
  } catch (error) {
    console.log(error);
  }
};

export const markAsCompleted = async (req, res) => {
  try {
    const { projectId } = req.params;
    const userId = req.id;

    const projectProgress = await ProjectProgress.findOne({ projectId, userId });
    if (!projectProgress)
      return res.status(404).json({ message: "project progress not found" });

    projectProgress.lectureProgress.map(
      (lectureProgress) => (lectureProgress.viewed = true)
    );
    projectProgress.completed = true;
    await projectProgress.save();
    return res.status(200).json({ message: "project marked as completed." });
  } catch (error) {
    console.log(error);
  }
};

export const markAsInCompleted = async (req, res) => {
    try {
      const { projectId } = req.params;
      const userId = req.id;
  
      const projectProgress = await ProjectProgress.findOne({ projectId, userId });
      if (!projectProgress)
        return res.status(404).json({ message: "project progress not found" });
  
      projectProgress.lectureProgress.map(
        (lectureProgress) => (lectureProgress.viewed = false)
      );
      projectProgress.completed = false;
      await projectProgress.save();
      return res.status(200).json({ message: "project marked as incompleted." });
    } catch (error) {
      console.log(error);
    }
  };