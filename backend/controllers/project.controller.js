import { Lecture } from "../models/lecture.model.js";
import { Project } from "../models/project.model.js";
import {
  deleteMediaFromCloudinary,
  deleteVideoFromCloudinary,
  uploadMedia,
} from "../utils/cloudinary.js";

export const AddProject = async (req, res) => {
  try {
    const {
      projectTitle,
      subTitle,
      description,
      category,
      projectLevel,
      projectPrice,
    } = req.body;

    const thumbnail = req.file;

    if (
      !projectTitle ||
      !description ||
      !category ||
      !projectLevel ||
      !projectPrice
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    let projectThumbnail;
    if (thumbnail) {
      const uploadedThumbnail = await uploadMedia(thumbnail.path);
      projectThumbnail = uploadedThumbnail?.secure_url;
    }

    const project = await Project.create({
      projectTitle,
      subTitle,
      description,
      category,
      projectLevel,
      projectPrice,
      projectThumbnail,
       creator: req.id,
    });

    return res.status(201).json({
      success: true,
      message: "Project created successfully",
      project,
    });
  } catch (error) {
    console.error("AddProject Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create project",
      error: error.message,
    });
  }
};

export const searchProjects = async (req, res) => {
  try {
    const { query = "", categories = [], sortByPrice = "" } = req.query;
    const searchCriteria = {
      isPublished: true,
      $or: [
        { projectTitle: { $regex: query, $options: "i" } },
        { subTitle: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } },
      ],
    };
    if (categories.length > 0) {
      searchCriteria.category = { $in: categories };
    }

    // define sorting order
    const sortOptions = {};
    if (sortByPrice === "low") {
      sortOptions.projectPrice = 1; //sort by price in ascending
    } else if (sortByPrice === "high") {
      sortOptions.projectPrice = -1; // descending
    }

    let projects = await Project.find(searchCriteria)
      .populate({ path: "creator", select: "name photoUrl" })
      .sort(sortOptions);

    return res.status(200).json({
      success: true,
      projects: projects || [],
    });
  } catch (error) {
    console.log(error);
  }
};

export const getProjectById = async (req, res) => {
  try {
    const { projectId } = req.params;

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({
        message: "Project not found!",
      });
    }
    return res.status(200).json({
      project,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to get project by id",
    });
  }
};
export const getCreatorProject = async (req, res) => {
  try {
    const userId = req.id;
    const project = await Project.find({ creator: userId });
    if (!project) {
      return res.status(404).json({
        projects: [],
        message: "Project not found",
      });
    }
    return res.status(200).json({
      project,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to create project",
    });
  }
};

export const editProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const {
      projectTitle,
      subTitle,
      description,
      category,
      projectLevel,
      projectPrice,
    } = req.body;
    const thumbnail = req.file;

    // 1. Find the existing project
    let project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found!",
      });
    }

    // 2. Handle thumbnail replacement if provided
    let projectThumbnail;
    if (thumbnail) {
      if (project.projectThumbnail) {
        const publicId = project.projectThumbnail
          .split("/")
          .pop()
          .split(".")[0];
        await deleteMediaFromCloudinary(publicId); // delete old image
      }
      const uploaded = await uploadMedia(thumbnail.path);
      projectThumbnail = uploaded.secure_url;
    }

    // 3. Build update payload only with provided fields
    const updateData = {};
    if (projectTitle) updateData.projectTitle = projectTitle;
    if (subTitle) updateData.subTitle = subTitle;
    if (description) updateData.description = description;
    if (category) updateData.category = category;
    if (projectLevel) updateData.projectLevel = projectLevel;
    if (projectPrice) updateData.projectPrice = projectPrice;
    if (projectThumbnail) updateData.projectThumbnail = projectThumbnail;

    // 4. Update project
    project = await Project.findByIdAndUpdate(projectId, updateData, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json({
      success: true,
      message: "Project updated successfully.",
      project,
    });
  } catch (error) {
    console.error("editProject Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update project",
      error: error.message,
    });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const { projectId } = req.params;

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found!",
      });
    }

    // If project has thumbnail, delete it from Cloudinary
    if (project.projectThumbnail) {
      const publicId = project.projectThumbnail.split("/").pop().split(".")[0];
      await deleteMediaFromCloudinary(publicId);
    }

    await Project.findByIdAndDelete(projectId);

    return res.status(200).json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    console.error("deleteProject Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete project",
      error: error.message,
    });
  }
};

export const createLecture = async (req, res) => {
  try {
    const { lectureTitle } = req.body;
    const { projectId } = req.params;

    if (!lectureTitle || !projectId) {
      return res.status(400).json({
        message: "Lecture title is required",
      });
    }

    // create lecture
    const lecture = await Lecture.create({ lectureTitle });

    const project = await Project.findById(projectId);
    if (project) {
      project.lectures.push(lecture._id);
      await project.save();
    }

    return res.status(201).json({
      lecture,
      message: "Lecture created successfully.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to create lecture",
    });
  }
};

export const getProjectLecture = async (req, res) => {
  try {
    const { projectId } = req.params;
    const project = await Project.findById(projectId).populate("lectures");
    if (!project) {
      return res.status(404).json({
        message: "project not found",
      });
    }
    return res.status(200).json({
      lectures: project.lectures,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to get lectures",
    });
  }
};
export const editLecture = async (req, res) => {
  try {
    const { lectureTitle, videoInfo, isPreviewFree } = req.body;

    const { projectId, lectureId } = req.params;
    const lecture = await Lecture.findById(lectureId);
    if (!lecture) {
      return res.status(404).json({
        message: "Lecture not found!",
      });
    }

    // update lecture
    if (lectureTitle) lecture.lectureTitle = lectureTitle;
    if (videoInfo?.videoUrl) lecture.videoUrl = videoInfo.videoUrl;
    if (videoInfo?.publicId) lecture.publicId = videoInfo.publicId;
    lecture.isPreviewFree = isPreviewFree;

    await lecture.save();

    // Ensure the project still has the lecture id if it was not aleardy added;
    const project = await Project.findById(projectId);
    if (project && !project.lectures.includes(lecture._id)) {
      project.lectures.push(lecture._id);
      await project.save();
    }
    return res.status(200).json({
      lecture,
      message: "Lecture updated successfully.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to edit lectures",
    });
  }
};
export const removeLecture = async (req, res) => {
  try {
    const { lectureId } = req.params;
    const lecture = await Lecture.findByIdAndDelete(lectureId);
    if (!lecture) {
      return res.status(404).json({
        message: "Lecture not found!",
      });
    }
    // delete the lecture from couldinary as well
    if (lecture.publicId) {
      await deleteVideoFromCloudinary(lecture.publicId);
    }

    // Remove the lecture reference from the associated project
    await Project.updateOne(
      { lectures: lectureId }, // find the Project that contains the lecture
      { $pull: { lectures: lectureId } } // Remove the lectures id from the lectures array
    );

    return res.status(200).json({
      message: "Lecture removed successfully.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to remove lecture",
    });
  }
};

export const getLectureById = async (req, res) => {
  try {
    const { lectureId } = req.params;
    const lecture = await Lecture.findById(lectureId);
    if (!lecture) {
      return res.status(404).json({
        message: "Lecture not found!",
      });
    }
    return res.status(200).json({
      lecture,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to get lecture by id",
    });
  }
};

export const getPublishedProject = async (_, res) => {
  try {
    const project = await Project.find({ isPublished: true }).populate({
      path: "creator",
      select: "name photoUrl",
    });
    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }
    return res.status(200).json({
      project,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to get published courses",
    });
  }
};

export const togglePublishProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { publish } = req.query;

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({
        message: "Project not found!",
      });
    }

    project.isPublished = publish === "true";
    await project.save();

    const statusMessage = project.isPublished ? "Published" : "Unpublished";
    return res.status(200).json({
      message: `Course is ${statusMessage}`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to update status",
    });
  }
};

export const getProjectsByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    if (!category) {
      return res.status(400).json({
        success: false,
        message: "Category is required",
      });
    }

    const projects = await Project.find({
      category,
      isPublished: true,
    }).populate({
      path: "creator",
      select: "name photoUrl",
    });

    return res.status(200).json({
      success: true,
      projects,
    });
  } catch (error) {
    console.error("getProjectsByCategory Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to filter projects by category",
    });
  }
};

export const getProjectsByLevel = async (req, res) => {
  try {
    const { projectLevel } = req.params;

    if (!projectLevel) {
      return res.status(400).json({
        success: false,
        message: "projectLevel is required",
      });
    }

    const projects = await Project.find({
      projectLevel,
      isPublished: true,
    }).populate({
      path: "creator",
      select: "name photoUrl",
    });

    return res.status(200).json({
      success: true,
      projects,
    });
  } catch (error) {
    console.error("getProjectsByCategory Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to filter projects by category",
    });
  }
};
