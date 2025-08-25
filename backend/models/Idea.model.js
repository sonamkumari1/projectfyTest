import mongoose from "mongoose";

const ShareIdea = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: { type: String },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});
const Idea = mongoose.model("Idea", ShareIdea);
export default Idea;
