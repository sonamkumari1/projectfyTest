
import mongoose from "mongoose"

const lectureProgressSchema = new mongoose.Schema({
    lectureId:{type:String},
    viewed:{type:Boolean}
});

const projectProgressSchema = new mongoose.Schema({
    userId:{type:String},
    projectId:{type:String},
    completed:{type:Boolean},
    lectureProgress:[lectureProgressSchema]
});

export const ProjectProgress = mongoose.model("ProjectProgress", projectProgressSchema);
