import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    projectTitle: {
      type: String,
      required: true,
    },
    subTitle: { type: String },
    description: { type: String },
    category: {
      type: String,
      required: true,
    },
    projectLevel: {
      type: String,
      enum: ["Beginner", "Medium", "Advance"],
    },
    projectPrice: {
      type: Number,
    },
    projectThumbnail: {
      type: String,
    },
    enrolledStudents: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    lectures: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lecture",
      },
    ],
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Project = mongoose.model("Project", projectSchema);
